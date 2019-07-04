<template>
  <div class='message' v-if="messages.length">
    <div v-for='m in messages' :key="m.id">
      {{m.message}}  
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return { messages: [], i: 0 };
  },
  mounted() {
    this.id = 0; //表示当前弹层的唯一标识
  },
  methods: {
    add(options) {
      let id = this.id++;
      let ms1 = { ...options, id };
      this.messages.push(ms1);
      ms1.timer = setTimeout(()=>{
        this.remove(ms1)
      },2000)
    },
    remove(layer) {
      this.messages = this.messages.filter(l=> l.id !== layer.id)
    }
  }
};
</script>
<style>
</style>
