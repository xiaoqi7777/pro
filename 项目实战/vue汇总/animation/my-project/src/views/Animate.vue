<template>
  <div>
    <div @click="btn">{{data}}</div>
    <input type="text" v-model="inp">
    <!-- <transition>  
        <div class="show animated" v-show="isShow">
        </div>
    </transition> -->
    <!-- <transition
        @before-enter='beforeEnter'
        @enter='enter'
        @after-enter='afterEnter'
    >  
        <div class="show animated" v-show="isShow">
            content
        </div>
    </transition> -->
  </div>
</template>

<script>

export default {
  data(){
      return {
        inp:123,
        isShow : true
      }
    },
    created() {
      // this.$destory()
    },
    destroyed(){
      console.log('destory',this.inp)
    },
  methods:{
    btn(){
      this.$destroy()
      console.log('123111',this)
      // this.isShow = !this.isShow
    },
    beforeEnter: (el) => {
      console.log('123')
      el.style.color = 'purple'
    },
    enter(el,done){
      
      // setTimeout(()=>{
      //   el.style.color = 'yellow'
      // },1000)
      // setTimeout(()=>{
      //   done()
      // },2000)
      
    },
    afterEnter(el){
      el.style.color = 'blue'
    },
  },
  computed: {
    data(){
      return 123
    }
  },
}
</script>
<style>
.show{
  border: 1px solid red;
  background: red;
  width: 100px;
  height: 100px;
}
/* .v-enter {
  opacity: 0;
} */
/* .v-enter-active{
  animation: bounceIn 1s ease-in
}
.v-leave-active{
  animation: bounceOut 1s ease-in
} */
/* .v-leave-to {
  opacity: 0;
} */
/* .v-enter {
  opacity: 0;
}
.v-enter-active,.v-leave-active{
  transition: opacity 2s linear
}
.v-leave-to {
  opacity: 0;
} */
</style>
