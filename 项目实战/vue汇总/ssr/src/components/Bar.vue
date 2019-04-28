<template>
  <div>
    <div @click="show" class="red">
        bar components
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    show(){
      alert(1);
    }
  }
}
</script>

<style scped>
  .red{
    background: red;
  }
</style>
