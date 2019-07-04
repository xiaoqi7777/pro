export default  {
    functional: true, // 函数式组件 只有render方法不能写template , 设置了他 context才能获取到上下文
    render(h,context){
      // 获取组件内的值  context.slots().default
      // console.log(context.slots().default)
      // 获取传递过来的属性 context.props
      return <div>{context.slots().default}</div>
    }
}