<template>
  <div id="app">
    <!-- <DatePicker v-model="now"></DatePicker> -->
    <!-- <button @click='btn'>点击弹框</button> -->
    <!-- <DatePicker :value="now" @input="val => now=val"></DatePicker> -->
    <!-- <div id="nav"> -->
      <!-- 1231111111 -->
      <router-link to="/123">Home</router-link> |
      <router-link to="/about">About</router-link>
    <!-- </div> -->
      <!-- <Title :s='123'>222</Title> -->
    <router-view></router-view>
    <!-- <Bt></Bt> -->
  </div>
</template>
<script>
import { Message } from "./components/Message";
import DatePicker from "./components/DatePicker";
// import Title from './components/title';
export default {
  data() {
    return {
      now: new Date()
    };
  },
  mounted() {
    // console.log(this._info);
  },
  methods: {
    btn() {
      Message.info({
        message:'我很帅',
        duration:3000
      })
      // this.$message.info({
      //   message: "我很帅",
      //   duration: 3000
      // });
    }
  },
  components: {
    // Title,
    DatePicker
  }
};
</script>
<style lang='scss'>
#app {
  #nav {
    color: red;
  }
}
</style>
