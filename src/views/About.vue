<template>
  <div class="about pt-10">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },  
  mounted() {
    // navigator.notification.alert('You are the winner!')
    this.text = '123123121'
  }
}
</script>
