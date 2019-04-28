import React from 'react';
import {Layout, Form, Icon, Input, Button, Checkbox, Select, Row, Col, AutoComplete, message, Cascader } from 'antd';
import styled from 'styled-components';
import {connect} from 'dva';
import {addresses} from './constants'
const {Footer,Content} = Layout;
const FormItem = Form.Item
const AutoCompleteOption = AutoComplete.Option;
const CAPTCHA_URL = 'http://localhost:7001/captcha'
//装饰器
@connect(state=>state.login)
export default class Login extends React.Component{
  switchLoginStatus = ()=>{
    this.props.dispatch({type:'login/switchLoginStatus'})
  }
  handleSubmit  = (e)=>  {
    e.preventDefault()
    this.userform.props.form.validateFields((err,value)=>{
      if(!err){
        this.props.dispatch({
          type:this.props.isLogin?'login/login':'login/signup',
          payload:value})
        
      }else{
        message.error('表单输入不合法')
      }
    })
  }
  render(){
    console.log('this.props.state',this.props.state)
    return(
      <div>
        <Content>
          <FormWrapper>
            <LoginForm
              isLogin = {this.props.isLogin}
              switchLoginStatus={this.switchLoginStatus}
              handleSubmit={this.handleSubmit}
              // wrappedComponentRef固定写法 获取当前dom
              wrappedComponentRef={target => this.userform = target}
            />
          </FormWrapper>
        </Content>
        <Footer style={{textAlign:'center'}}>
          12333333333333333333
         </Footer>
      </div>
    )
  }
}
// export default connect(state=>state.login)(Login)

class LoginForm extends  React.Component{

  state = {
    autoCompleteResult:[],
    confirmDirty:false
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult = []
    if(value){//baidu
      autoCompleteResult = ['.com','.cn','.org'].map(domain=>`${value}${domain}`);
    }
    this.setState({autoCompleteResult})
  }

  compareToFirstPassword = (rule, value, callback) =>{
    const form = this.props.form
    let firstPassword = form.getFieldsValue(['password']).password
    if(value && value == firstPassword){
      callback()
    }else{
      callback('两次输入的密码不一样')
    }
  }
  validatorNextPassword = (rule, value, callback) =>{
    //1、判断确认密码是否输入 confirmDirty是否是脏的
    /*2、
      validateFields (
        [fieldNames: string[]],
        [options: object],
        callback(errors, values)
      ) => void
      fieldNames 参数为空，则校验全部组件
      options.force 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验
      callback() 不传值就校验正常 传值就会报错显示出来
    */
    const form = this.props.form
    if( value && this.state.confirmDirty){
      // 强行校验
      form.validateFields(['confirm'],{force:true})
    }
    callback()
  
  }
  handleConfirmBlur = (event)=>{
    let value = event.target.value
    this.setState({confirmDirty:this.state.confirmDirty||value})
  }
  render(){
    const formItemlayout = {
      labelCol:{
        span:4
      },
      wrapperCol:{
        span:20
      }
    }

    let websiteOptions = this.state.autoCompleteResult.map(item=>(
      <AutoCompleteOption key={item}>{item}</AutoCompleteOption>
    ))
    // 取值通过 this.props.form.getFieldDecorator
    let {getFieldDecorator} = this.props.form
    let {switchLoginStatus,isLogin,handleSubmit} = this.props
    return(         
    <Form onSubmit={handleSubmit} style={{width:'500px'}}>
      <h3>欢迎注册</h3>
      <FormItem label="用户名" {...formItemlayout}>
          {
            getFieldDecorator('username',{
              rules:[{required:true,message:'请输入用户名'},{max:12,message:'最大长度12个字'},{min:6,message:'最小长度6个字'}]
            })(<Input prefix={<Icon type='user' style={{color:'rbga(0,0,0,0.25)'}} />} placeholder='请输入用户名' />)
          }
      </FormItem>
      <FormItem label="密码" {...formItemlayout}>
          {
            getFieldDecorator('password',{
              rules:[{required:true,message:'请输入密码'},{validator:this.validatorNextPassword}]
            })(<Input prefix={<Icon type='lock' style={{color:'rbga(0,0,0,0.25)'}} />} placeholder='请输入密码' />)
          }
      </FormItem>
      {
        !isLogin&& <FormItem label="确认密码" {...formItemlayout}>
            {
              getFieldDecorator('confirm',{
                rules:[{required:true,message:'确认密码'},{validator:this.compareToFirstPassword}]
              })(<Input onBlur={this.handleConfirmBlur} prefix={<Icon type='lock' style={{color:'rbga(0,0,0,0.25)'}} />} placeholder='确认密码' />)
            }
        </FormItem>
      }
      {
        !isLogin&& <FormItem label="邮箱" {...formItemlayout}>
            {
              getFieldDecorator('email',{
                rules:[{required:true,message:'请输入邮箱'},{type:'email',message:'请输入合法邮箱'}]
              })(<Input prefix={<Icon type='mail' style={{color:'rbga(0,0,0,0.25)'}} />} placeholder='邮箱' />)
            }
        </FormItem>
      }
       {
        !isLogin&& <FormItem label="地址" {...formItemlayout}>
            {
              getFieldDecorator('address',{
                rules:[{required:true,message:'请输入地址'}]
              })(<Cascader   placeholder='请输入地址'  options= {addresses} />)
            }
        </FormItem>
      }
      {
        !isLogin&& <FormItem label="手机号" {...formItemlayout}>
            {
              getFieldDecorator('phone',{
                rules:[{required:true,message:'请输入手机号'}]
              })(<Input prefix={<Icon type='phone' style={{color:'rbga(0,0,0,0.25)'}} />} placeholder='请输入手机号' />)

            }
        </FormItem>
      }
      {
          !isLogin&& <FormItem label="个人网站" {...formItemlayout}>
              {
                getFieldDecorator('website',{
                  rules:[{required:true,message:'请输入网站'}]
                })(<AutoComplete 
                    dataSource = {websiteOptions}
                    onChange = {this.handleWebsiteChange}
                  ><Input prefix={<Icon type='global' style={{color:'rbga(0,0,0,0.25)'}} />}  placeholder = '请输入网址12' />
                  </AutoComplete>
                  )
              }
            </FormItem>
      }
      {
        !isLogin && 
        <FormItem label="验证码" {...formItemlayout} extra="证明不是机器人">
            <Row>
              <Col span={12}>
              {
                  getFieldDecorator('captcha',{
                    rules:[{required:true,message:'请输入验证码'}]
                  })(<Input placeholder="请输入验证码" />)
                }
              </Col>
              <Col span={12}>
                  <img src={CAPTCHA_URL}/>
              </Col>
            </Row> 
        </FormItem>
      }
      {
        !isLogin ?          
          <FormItem >
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
              注册
            </Button>
            已有账号?<a href="#" onClick={()=>{switchLoginStatus()}}>立即登录</a>
          </FormItem>
          :
          <FormItem >
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
              登录
            </Button>
            没有账号?<a href="#" onClick={()=>{switchLoginStatus()}}>立即注册</a>
         </FormItem>
      }
    </Form>
      )
  }
}
// 经 Form.create() 包装过的组件会自带 this.props.form 属性
LoginForm = Form.create()(LoginForm)
const FormWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:calc(100vh - 70px);
  h3{
     text-align:center;
  }
  form{
    border:1px solid #999;
    border-radius:5px;
    padding:20px
  }
  
`



93800 - 13800 -30000

