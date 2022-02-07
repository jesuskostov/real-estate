<template>
  <div class="custom-container position-relative">
    <div v-show="show" class="overlay"></div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-10 mx-auto">
            <div class="row mt-5">
              <div class="col-md-12 mx-auto mb-3">
                <input type="text" class="form-control w-100" v-model="info.address" placeholder="Address">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.rooms" placeholder="Rooms">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.price" placeholder="Price">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.area" placeholder="Area">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.floor" placeholder="Floor">
              </div>
              <div class="col-md-12 mb-4">
                <textarea class="form-control w-100" v-model="info.description" placeholder="Description"></textarea>
              </div>
            </div>
            <div class="py-5">
              <h1 class="mb-4">Suggestions</h1>
              <div v-for="(item, i) in suggestion" :key="i" @click="suggestionChoose(item.Location.Address.Label)" class="alert alert-success mb-3">
                {{ item.Location.Address.Label }}
              </div>
              <div v-show="error !== ''" class="alert alert-danger">
                {{ error }}
              </div>
            </div>
          </div>          
        </div>
        <div class="row mt-5">
          <div class="col-md-7 mx-auto">
            <div class="homes-container">
              <div v-for="(home, i) in homeDataBase" :key="i" class="home-box d-flex align-items-center px-3" @click="lookAt(home.address)">
                <span class="mr-3">🏡</span>
                <div class="flex-grow-1 text-left">
                  <h5 class="mb-0">Адрес: {{home.address}}</h5>
                  <div class="text-right">
                    <p class="price mb-0 mt-1"><b>Цена: {{home.price}}лв.</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map">
    <!--In the following div the HERE Map will render-->
      <div id="mapContainer" style="width:100%; height: 100%" ref="hereMap"></div>
    </div>
    <div v-show="show" class="slot">
      <svg @click="show = false" class="custom-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
        <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
          489.292,457.678 277.331,245.004 489.292,32.337 "/>
      </svg>
      <div class="img"><span>🏡</span></div>
      <div class="row pt-5">
        <div class="col-md-10 mx-auto mt-5">
          <div class="text-left">
            <p class="h4 mb-4"><b>Адрес:</b> {{ homeSlot.address }}</p>
            <p class="h4 mb-4"><b>Стаи:</b> {{ homeSlot.rooms }}</p>
            <p class="h4 mb-4"><b>Цена:</b> {{ homeSlot.price }}лв.</p>
            <p class="h4 mb-4"><b>Площ:</b> {{ homeSlot.area }}кв.м.</p>
            <p class="h4 mb-4"><b>Етаж:</b> {{ homeSlot.floor }}</p>
            <p class="h4 mb-4"><b>Описание:</b> {{ homeSlot.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="notification" :class="{'show': notifi}">
      New house added!!!
    </div>
  </div>
</template>

<script>
import { mapRef, address } from '../firebase'
import axios from 'axios'

export default {
  name: "HereMap",
  data() {
    return {
      test2: address.on('child_changed', async () => {
        let res = await axios.get(`https://pizza-5f900.firebaseio.com/address.json`)
        this.info2 = await res.data
        this.findAddress('clicked')
        console.log(1);
      }),
      test: mapRef.on('child_added', () => {
        this.notifi = true
        this.findAddress()
        console.log(2);
      }),
      show: false,
      platform: null,
      apikey: "t-RgxidFoqTL25DCcA9zSIXCIiUca4O7XnGdJ0XeJho",
      center: {
        lat: 0,
        lng: 0
      },
      info: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: ''
      },
      info2: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: ''
      },
      geocodingService: {},
      map: {},
      homeSlot: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: '',
      },
      homeDataBase: [],
      notifi: false,
      suggestion: [],
      error: ''
    };
  },
  watch: {
    center: {
      handler() {
        const platform = new window.H.service.Platform({
          apikey: this.apikey
        });
        this.platform = platform;
        this.initializeHereMap();
        this.geocodingService = this.platform.getGeocodingService()
      },
      deep: true
    },
    info: {
      handler(val) {
        this.info2.address = val.address
        this.geocodingService.geocode({ autocomplete: true, searchText: this.info2.address }, res => {
          if (res.Response.View[0]) {
            this.suggestion = res.Response.View[0].Result
          }
        })
        console.log(this.suggestion);
      }, deep: true
    },
    notifi() {
      setTimeout(() => {
        this.notifi = false
      }, 3000)
    }
  },
  methods: {
    async findAddress(state) {      
      if (this.info2.address !== '') {
        this.geocodingService.geocode({ searchText: this.info2.address }, res => {
          if (res.Response.View.length > 0) {
            if (res.Response.View[0].Result.length > 0) {
              let position = res.Response.View[0].Result[0].Location.DisplayPosition
              let cordinates = { lat: position.Latitude, lng: position.Longitude}
              this.addMarker(cordinates)
              if (state === 'clicked') {
                this.map.getViewModel().setLookAtData({ position: { lat: position.Latitude, lng: position.Longitude }, zoom: 17 },true);
                axios.post(`https://pizza-5f900.firebaseio.com/map/.json`, this.info2)
                this.info.address = ''
              }
            }
          } else {
            this.error = 'Address not found. Be more precise'
          }
        }, err => {
          console.log(err);
        })
      }
    },
    start() {
      this.info2 = this.info
      let address = this.info2
      axios.put(`https://pizza-5f900.firebaseio.com/address.json`, address)
    },
    addMarker(cordinates) {
      var group = new window.H.map.Group();

      this.map.addObject(group);
      group.addEventListener('tap', evt => {
        let info = evt.target.getData().split('|')
        this.homeSlot.address = info[0]
        this.homeSlot.rooms = info[1]
        this.homeSlot.price = info[2]
        this.homeSlot.area = info[3]
        this.homeSlot.description = info[4]
        this.homeSlot.floor = info[5]
        this.show = true
      }, false);
           
      let homeInfo = `${this.info2.address}|${this.info2.rooms}|${this.info2.price}|${this.info2.area}|${this.info2.description}|${this.info2.floor}`
      this.addMarkerToGroup(group, cordinates, homeInfo)
          
    },
    async addMarkerToGroup(group, coordinates, html) {
      var svgMarkup = '<svg width="100" height="100" class="test" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill-opacity="0" stroke-opacity="0" x="1" y="1" width="100" ' +
        'height="100" /><text x="50" y="80" font-size="60pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">🏡</text></svg>';
      var icon = new window.H.map.Icon(svgMarkup);
      var marker = new window.H.map.Marker(coordinates, {icon: icon});
      // add custom data to the marker
      marker.setData(html);
      // marker.setIcon(icon);
      group.addObject(marker);

    },
    lookAt(address) {
      this.geocodingService.geocode({ searchText: address }, res => {
        if (res.Response.View.length > 0) {
          if (res.Response.View[0].Result.length > 0) {
            let position = res.Response.View[0].Result[0].Location.DisplayPosition
            this.map.getViewModel().setLookAtData({ position: { lat: position.Latitude, lng: position.Longitude }, zoom: 17 },true);
          }
        }
      }, err => {
        console.log(err);
      })
    },
    async initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = await this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 16,
        center: this.center
      });

      addEventListener("resize", () => this.map.getViewPort().resize());
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      H.ui.UI.createDefault(this.map, maptypes);


      let res = await axios.get(`https://pizza-5f900.firebaseio.com/map/.json`)
      if (res.data) {
        const arrayResult = Object.keys(res.data).map(item => {
            return {info: res.data[item]}
        })
        arrayResult.map(item => {
          this.info2 = item.info
          this.findAddress()
        })
      }

    },
    suggestionChoose(address) {
      console.log(123);
      this.info2.address = address
      this.findAddress('clicked')
    }
  },
  computed: {
    homes() {
      return this.$store.state.homes
    }
  },
  async mounted() {
    // Initialize the platform object:
    const success = (position) => {
        this.center.lat  = position.coords.latitude;
        this.center.lng = position.coords.longitude;
        // Do something with the position
    };
    
    const error = (err) => {
      console.log(err)
      this.center.lat = 42.6590597
      this.center.lng = 23.3163785
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error)       
  },
};
</script>

<style lang="scss" scoped>

.notification {
  width: 400px;
  padding: 30px 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid rgb(167, 167, 167);
  outline: 2px solid white;
  border-radius: 16px;
  position: fixed;
  bottom: 200px;
  right: 15px;
  font-size: 1.4rem;
  z-index: 9999;
  transition: 0.4s;
  opacity: 0;
  &.show {
    transition: 0.4s;
    opacity: 1;
  }
}

.homes-container {
  margin-top: 5rem;
  height: 700px;
  overflow-y: scroll;
}

.price {
  position: relative;
}

.home-box {
  border-radius: 16px;
  border: 1px solid #000;
  margin-bottom: 30px;
  span {
    font-size: 4rem;
  }
  h5 {
    font-size: 1rem;
  }
  &:hover {
    background-color: rgba(207, 252, 139, 0.4);
    cursor: pointer;
  }
}

.custom-close {
  position: absolute;
  top: -30px;
  right: 10px;
  width: 20px;
  height: 20px;
  fill: #fff;
  z-index: 9999;
  cursor: pointer;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.slot {
  position: fixed;
  z-index: 2;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  min-width: 900px;
  height: 800px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.slot .img {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 99999px;
  background-color: #fff;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
}

.slot .img span{
  position: relative;
  left: -6px;
  top: -6px;
}

.H_ib_body {
  min-width: 300px !important;
  min-height: 300px !important;
}

.custom-container  {
  display: flex;
  height: 100%;
}

#map {
  background-color: antiquewhite;
  flex-grow: 1;
  min-width: 50%;
  height: 100%;
}

.test {
  width: 400px;
  height: 400px;
  display: block;
  background-color: red;
}

input {
  min-width: 200px;
  height: 40px;
  margin-right: 15px;
}
</style>