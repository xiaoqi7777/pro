<template>
  <div class="hello">
    <h1>{{ msg }}123</h1>
    <input type="text" v-model="username" >
    <Button @click='login'>登录</Button>
    <span>
      当前登录用户:{{$store.state.username}}
    </span>
  </div>
</template>

<script>
import {getUser} from '../api/user.js';
import {mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      username:''
    }
  },
  async mounted() {
    let rs = await getUser()
    console.log(rs)
  },
  methods:{
    ...mapActions(['toLogin']),
    login(){
      this['toLogin'](this.username);
    }
  }
}
</script>

<style scoped lang='scss'>
.hello{

  @include flex()
}
</style>
