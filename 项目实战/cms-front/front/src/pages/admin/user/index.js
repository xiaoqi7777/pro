import React,{Component,Fragment} from 'react';
import {connect} from 'dva';
import {Card,Table,Button,Form,Modal,Input,message,Popconfirm} from 'antd';
import {PAGE_SIZE} from './constants'
import {routerRedux} from 'dva/router'

const FormItem = Form.Item

class User extends Component{
  // 弹出模态框
  save = (payload) =>{
    this.props.dispatch({
      type:'user/save',
      payload
    })
  }
  onAdd = () =>{
    //开始添加
    this.save({editVisible:true,isCreate:true})
  }
  onEdit = (record)=>{
    //开始编辑
    this.save({editVisible:true,isCreate:false,record})
  }
  onEditOk = () =>{
    //确认保存
    this.editForm.props.form.validateFields((err,values)=>{
      console.log(values)
      if(err){
        return message.error('表单校验失败')
      }else{
        this.props.dispatch({
          type:this.props.isCreate?'user/create':'user/update',
          payload:values
        })
      }
    })
  }
  onEditCancel =() =>{
    //取消保存
    this.props.dispatch({
      type:'user/save',
      payload:{editVisible:false}
    })
  }
  onDel =(id)=>{
    this.props.dispatch({
      type:'user/del',
      payload:id
    })
  }
  delAll = ()=>{
    this.props.dispatch({
      type:'user/delAll',
      payload:this.props.selectedRowKeys
    })
  }
  render(){
    //定义表格有哪些列
    const columns = [
      {title:'用户名',dataIndex:'username',key:'username'},
      {title:'邮箱',dataIndex:'email',key:'email'},
      {
        title:'电话',
        key:'pho',
        render(val,record) {
            return(
              <span>
                {record.code}
              </span>
            )
        },
      },
      {
        title:'操作',
        key:'operate',
        render:(val,record) => {
            return(
              <Fragment>
                <Button type="warning" onClick={()=>this.onEdit(record)}>编辑</Button>
                <Popconfirm
                  okText="确认"
                  cancelText="取消"
                  title="请问你确定要删除嘛?"
                  onConfirm={()=>this.onDel(record.id)}
                >
                  <Button type="warning" >删除</Button>
                </Popconfirm>
              </Fragment>
            )
        },
      }
    ];
    //定义数据源
    let {editVisible,list,total,pageNum,dispatch,record,selectedRowKeys} = this.props;
    let pagination = {
      current:pageNum,//当前的页面
      pageSize:PAGE_SIZE,//每页的条数
      showTotal:(total)=>{
        return `总计${total}条`
      },
      total,//总条数一共多少条
      onChange:(pageNum)=>{
        dispatch(routerRedux.push({
          pathname:'/admin/user',
          query:{pageNum}
        }))
      }
    }
    let rowSelection = {
      type : 'checkbox',
      selectedRowKeys,
      onChange:(selectedRowKeys)=>{//[1,2]
        this.save({selectedRowKeys})
      }
    }
    return(
      <Card>
        <Button type="warning" onClick={this.onAdd}>添加</Button>
        <Button type="warning" onClick={this.delAll}>全部删除</Button>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={record=>record.id}
            pagination={pagination}
            rowSelection={rowSelection}
          />
          <EditModal 
            onOk = {this.onEditOk}
            onCancel = {this.onEditCancel} 
            visible = {editVisible}
            record = {record}
            wrappedComponentRef = {inst => this.editForm = inst}
          />
      </Card>
    )
  }
}
export default connect(state=>state.user)(User)
// EditModal = Form.create()(EditModal)
// 两个一样的
// 经 Form.create() 包装过的组件会自带 this.props.form 属性
@Form.create()
class EditModal extends Component{
  render(){
    let {getFieldDecorator} = this.props.form
    let {onOk,onCancel,visible,record} = this.props
    let {id,username,email,password} = record
    return(
      <Modal
        title="新增用户"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        destoryOnClose
      >
        <Form>
            <FormItem >
              {
                getFieldDecorator('id',{
                  initialValue:id
                })(<Input type="hidden"/>)
              }
            </FormItem>
            <FormItem label='用户名'>
              {
                getFieldDecorator('username',{
                  rules:[{required:true,message:'用户名必须输入'}],
                  initialValue:username
                })(<Input/>)
              }
            </FormItem>
            <FormItem  label='密码'>
              {
                getFieldDecorator('password',{
                  rules:[{required:true,message:'邮箱必须输入'}],
                  initialValue:password
                })(<Input/>)
              }
            </FormItem>
            <FormItem  label='邮箱'>
              {
                getFieldDecorator('email',{
                  rules:[{required:true,message:'邮箱必须输入'}],
                  initialValue:email
                })(<Input/>)
              }
            </FormItem>
        </Form>
      </Modal>
    )
  }
}