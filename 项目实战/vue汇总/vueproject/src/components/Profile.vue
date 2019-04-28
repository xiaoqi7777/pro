<template>
  <div class="hello">
    Profile
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
  }
}
</script>

<style scoped lang='scss'>

</style>
