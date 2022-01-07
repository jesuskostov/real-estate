<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HereMap />
  </div>
</template>

<script>
import HereMap from '../components/HereMap.vue'
export default {
  name: 'Home',
  components: {
    HereMap
  },
}
</script>
