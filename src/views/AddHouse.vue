<template>
  <div class="h-full flex flex-col justify-center">
    <!-- FORM -->
    <div class="w-full add-form h-100">
      <div class="mb-5">
        <div class="position-relative">
          <input type="text" class="px-3 z-2" v-model="info.address" placeholder="Address">
          <div v-if="suggestion.length !== 0" class="suggestion-box">
            <div v-for="(suggest, i) in suggestion" :key="i" class="suggestion text-left px-3 py-2" :class="{'border-top': i !== 0}" @click="choose(suggest.Location.Address.Label)">
              <small>{{ suggest.Location.Address.Label }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <input type="text" class="px-3" v-model="info.rooms" placeholder="Rooms">
      </div>
      <div class="mb-5">
        <input type="text" class="px-3" v-model="info.price" placeholder="Price">
      </div>
      <div class="mb-5">
        <input type="text" class="px-3" v-model="info.area" placeholder="Area">
      </div>
      <div class="mb-5">
        <input type="text" class="px-3" v-model="info.floor" placeholder="Floor">
      </div>
      <div class="mb-4">
        <textarea class="px-3" v-model="info.description" placeholder="Description"></textarea>
      </div>
    </div>
    <div class="text-center mt-10">
      <button class="text-white bg-black w-11/12 h-16 rounded-full" @click="findAddress('clicked')">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      info: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: ''
      },
      suggestion: [],
      error: '',
      apikey: "t-RgxidFoqTL25DCcA9zSIXCIiUca4O7XnGdJ0XeJho",
      platform: null,
      geocodingService: {}
    }
  },
  watch: {
    info: {
      handler(val) {
        if (val.address !== '') {
          this.geocodingService.geocode({ autocomplete: true, searchText: val.address }, res => {
            if (res.Response.View[0]) {
              this.suggestion = res.Response.View[0].Result
            }
          })
        } else {
          this.suggestion = []
        }
      }, deep: true
    },
  },
  methods: {
    async findAddress(state) { 
      if (this.info.address !== '') {
        if (state === 'clicked') {
          axios.post(`https://pizza-5f900.firebaseio.com/map/.json`, this.info)
          this.$router.push({name: 'Home', params: {title: 'clicked'}})
        }
      }
    },
    choose(address) {
      this.info.address = address
      setTimeout(() => {
        this.suggestion = []
      }, 100)
    }
  },
  mounted() {
      const platform = new window.H.service.Platform({
        apikey: this.apikey
      });
      this.platform = platform;
      this.geocodingService = this.platform.getGeocodingService()
  }
}
</script>

<style lang="scss" scoped>
.add-form {
  padding-left: 17px;
  padding-right: 17px;
  input, textarea {
    position: relative;
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 3px 10px 0 rgba(0,0,0,0.10);
    &.z-2 {
      z-index: 2;
    }
  }
}

.add-btn {
  margin: 0 32px 40px 32px;
  height: 80px;
  border: 0;
  border-radius: 16px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  opacity:1;
  // pointer-events: none;
  &.active {
    opacity: 1;
  }
}

.suggestion-box {
  position: absolute;
  padding-top: 20px;
  top: 35px;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  background-color: #fff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,0.10);
}

</style>