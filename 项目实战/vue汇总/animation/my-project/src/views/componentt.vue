<template>
  <div class="">
    123
    <!-- compoj:{{msg}} -->
    <!-- <A></A> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg:123
    }
  },
    beforeCreate() {
    console.log('beforeCreate-child')
  },
  created() {
    console.log('created-child')
  },
  beforeMount() {
    console.log('beforeMount-child')
  },
  mounted() {
    console.log('mounted-child')
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
    console.log('updated-child')
  },
  beforeUpdate() {
    console.log('beforeUpdate-child')
  },
  destroyed() {
    console.log('destroyed-child')
  },
  beforeDestroy() {
    console.log('beforeDestroy-child')
  },
  // mounted() {
  //   // this.$destroy()
  //   // this.msg = 'hello'
  //   // console.log(this)
  // },
  // components:{
  //   myButton
  // }
  
}
</script>
