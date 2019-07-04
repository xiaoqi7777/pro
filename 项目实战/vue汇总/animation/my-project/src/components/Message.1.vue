<template>
  <div class='message' v-if="messages.length">
    <div v-for='m in messages' :key="m.id">
      {{m.message}}  
    </div>
  </div>  
</template>

<script>
export default {
  data(){
    return{messages:[]}
  },
  mounted(){
    this.id = 0;//表示当前弹层的唯一标识
  },
  methods:{
    add(options){
        let id = this.id ++
        let layer = {...options,id}
        this.messages.push(layer)
        layer.timer = setTimeout(()=>{
           this.remove(layer)
        },options.duration)
    },
    remove(layer){
      this.messages = this.messages.filter(message=>message.id !== layer.id
      )
    }
  }
}
</script>
<style>

</style>
