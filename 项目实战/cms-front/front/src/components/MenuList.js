import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import {connect} from 'dva'
import Link from 'umi/link'
const SubMenu = Menu.SubMenu;
class MenuList extends Component{
    renderMenus = (resources=[])=>{
      return resources.map(resource=>{
        if(resource.children.length>0){
          console.log('resource',resource)
          
          return(
            <SubMenu key={resource.key} title={<Link to={resource.key}><Icon type={resource.icon}/> {resource.name}</Link>}>
                {this.renderMenus(resource.children)}
            </SubMenu>
          )
        }
        else{
          return (
          <Menu.Item key={resource.key}>
            <Link to={resource.key}>
              <Icon type={resource.icon}/>
              {resource.name}
            </Link>
          </Menu.Item>
          )
        }
      })
    }
    render(){
      let {user} = this.props;
      if(!user){
        return null;
      }
      return(
        <Menu
          theme="dark"
          defaultSelectedKeys={['/admin/user']}
          defaultOpenKeys={['/admin']}
          mode="inline"
        >
        {
          this.renderMenus(user.resources)
        }
        </Menu>
          
      )
    }

}
export default connect(state => state.login)(MenuList)