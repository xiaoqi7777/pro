<template>
  <div id="app">
    {{this.$store.state.count}}
    {{this.$store.getters.newCount}}
    <button @click='change'>btn</button>
    <!-- <HelloWorld/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name:'app11',
    data(){
      return{
        sss:'sssssssssssss'
      }
    },
    methods:{
      change(){
        // this.$store.commit('change')
        this.$store.dispatch('change')
      }
    },
    mounted() {
      console.log('App =>',this.$store)
    },
}
</script>

<style>

</style>
