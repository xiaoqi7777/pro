<template>
  <div id="app">
    {{userName}}

    <HelloWorld/>
    <button @click="btn">修改事件</button>
    <span v-if="$store.state.isShowLoading"> 加载中 </span>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// 只要页面中注入了store 每个实例上都会存在一个属性 $store
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

// 如果使用的是自模块 可以在模块内添加 namespace 属性 把他变成一个模块
export default {
  name: 'app',
  // computed:mapState(['lesson','className']),
  // 这两个都可以
  computed:{
    ...mapState(['lesson','className']),
    // user 是子模块的名字
    ...mapState('user',['userName']),
    //第二个参数是对象 当前直接 获取 u 
    // ...mapState('user',{u:(state)=>state.userName})
    ...mapGetters(['getNewName'])
    
  },

  components: {
    HelloWorld
  },
  methods: {
    ...mapMutations('user',['change_userName']),
    ...mapActions('user',['change_userNameAction']),
    btn(){
      this['change_userName']('jw')
      this['change_userNameAction']('jwt')
      // this.$store.commit('user/change_userName','jwt')
      // this.$store.dispatch('user/change_userName','jwt')
    }
  },
}
/*
  import {createNamespacedHelpers} from 'vuex'
  let {mapState} = createNamespacedHelpers('user')

  computed:{
    ...mapState(['userName']),
  },
*/
</script>

<style>

</style>
