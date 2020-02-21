<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import Home from '@/pages/home.vue';

export default createComponent({
  components: {
    Home
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
