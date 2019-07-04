<template>
  <div class="home">
    <router-link to='/about/123'>home</router-link>
    <div @click='btn'>跳转</div>
    <!-- <input type="checkbox" v-model="checkAll" id='123' value="12312312" >
    <label for="123">123232323</label> 
    <input type="checkbox" v-for="(item,index) in checks" :key="index" v-model="item.value" >
  <select v-model='selectValue' > 
     <option value="0" disabled>请选择</option>
     <option v-for='(list,index) in lists' :key='index+_d'  :value="list.id">{{list.value}}</option>
  </select>  -->
  <!-- {{selectValue}} -->

  <!-- <div v-color="'red'">red=>directive</div>
  <div @click="btn" ref='btn1'>
    asdadsa
    <div ref="btn2">1
      <div ref='btn4'>123</div>
    </div>
    <div>2</div>
    <div>3</div> -->
  <!-- </div> -->
  <Componentt/>
  <!-- <Anima/> -->
  </div>
</template>

<script>
import Componentt from './componentt';
// import Anima from './Animate.vue';
export default {
  name: 'home',
  // beforeRouteEnter (to, from, next) {
  //    console.log('home组件内beforeRouteEnter',to, from)
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   next(vm=>{
  //     console.log('vm',vm)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //    console.log('home组件内beforeRouteUpdate',to, from, this)
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   next()
  // },
  beforeRouteLeave (to, from, next) {
    //  console.log('home组件内beforeRouteLeave',to, from)
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('this.$route',this.$route)
    next()
  },
  data(){
    return{
      selectValue:[],
      checks:[
        {value:false},
        {value:false},
        {value:true}
      ],
      lists:[
        {id:1,value:'aaaa'},
        {id:2,value:'bbbb'},
        {id:3,value:'cccc'}
      ],
      checkboxValues:'123'
    }
  },
  // directives:{
  //     'color':function(el,bindings,vnode){
  //       el.style.border=`1px solid ${bindings.expression}`
  //     }
  // },
  methods:{
    btn(){
      // router.push({ name: 'user', params: { userId: '123' }})

      // this.$router.push({name:'about',params:{ id: '11123' },query:{plan: 'private' }})
      this.$router.push({path:'about/12',query:{plan: 'private' }})
    }
  },
  beforeCreate() {
    console.log('beforeCreate-parent')
  },
  created() {
    console.log('created-parent')
  },
  beforeMount() {
    console.log('beforeMount-parent')
  },
  mounted() {
    console.log('mounted-parent')
    // let dom1 = this.$refs.btn1
    // let dom2 = this.$refs.btn2
    // let dom3 = this.$refs.btn3
    // let dom4 = this.$refs.btn4
    // console.log(dom1.contains(dom4))
    // this.$refs.btn.addEventListener('click',(e)=>{
    //   // this.$refs.btn.contains(e.target)
    //   console.log(e.target,this.$refs.btn,e.target.contains(this.$refs.btn))
    // })
    // console.log('this.$refs.btn.addEventListener',this.$refs.btn.addEventListener)
  },
  updated() {
    console.log('updated-parent')
  },
  beforeUpdate() {
    console.log('beforeUpdate-parent')
  },
  destroyed() {
    console.log('destroyed-parent')
  },
  beforeDestroy() {
    console.log('beforeDestroy-parent')
  },
  computed:{
    checkAll:{
      set(val){
        this.checks.forEach(item => item.value = val)
      },
      get(){
        // console.log('2222')
        return  this.checks.every(item => item.value)
      }
    }
  },
  components:{
    // Anima,
    Componentt,
    // A
  },
}
</script>
