<template>
  <div>
    <div @click="show">
        foo components 11
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