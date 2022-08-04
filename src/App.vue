<template>
  <div id="app">
    <Menu />
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  data() {
    return {
      page: ''
    }
  },
  components: {
    Menu
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #F6F5F5;
  color: #2c3e50;
  height: 100%;
}

html, body {
  height: 100%;
  background-color: #F6F5F5;
}
</style>
