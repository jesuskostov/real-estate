<template>
  <div class="custom-container position-relative d-flex flex-column flex-md-row">
    <Transition>
      <div v-show="load" class="fixed inset-0 bg-white z-20 flex items-center justify-center">
        <p class="text-black text-2xl animate-pulse duration-50">Map loading...</p>
      </div>    
    </Transition>
    <!-- MAP -->
    <div id="map">
      <div id="mapContainer" style="width:100%; height: 100%" ref="hereMap"></div>
    </div>
    <div v-if="homeSlot.address" class="slot">
      <div class="row">
        <div class="col-8">
          <div class="text-left pl-4 pt-4 mt-2">
            <h1 class="h4 font-weight-bold">House</h1>
            <p class="h6 mb-0 mt-3 font-weight-bold text-muted">Description</p>
          </div>
        </div>
        <div class="col-3 pt-3">
          <img src="../assets/house.png" alt="house">
        </div>
      </div>
      <div class="text-left pl-4 mt-1">
        <small>{{ homeSlot.description }}</small>
      </div>
      <div class="text-left pl-4 pt-5">
        <button class="close-btn bg-danger" @click="homeSlot.address = ''">X</button>
        <p>
          <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="14.027" height="20.455" viewBox="0 0 11.027 16.455">
            <path id="_1243686_location_address_gps_place_pointer_icon" data-name="1243686_location_address_gps_place_pointer_icon" d="M10.7.3A5.259,5.259,0,0,0,5.1,5.785c0,4.366,4.03,9.795,5.093,10.858a.428.428,0,0,0,.28.112h0a.308.308,0,0,0,.28-.168c.56-.616,5.373-6.213,5.373-10.8A5.115,5.115,0,0,0,10.7.3Zm-.224,15.392C9.186,14.181,5.94,9.479,5.94,5.785A4.38,4.38,0,0,1,10.7,1.14a4.38,4.38,0,0,1,4.646,4.646C15.343,9.087,12.432,13.453,10.473,15.692Zm.168-12.146A2.239,2.239,0,1,0,12.88,5.785,2.245,2.245,0,0,0,10.641,3.546Zm0,3.638a1.4,1.4,0,1,1,1.4-1.4A1.386,1.386,0,0,1,10.641,7.184Z" transform="translate(-5.1 -0.3)" fill="#262324"/>
          </svg>
          <span style="position: relative; top: 2px;">{{ homeSlot.address }}</span>
        </p>
        <div class="d-flex">
          <p class="mr-3">
            <svg class="mr-2" id="_172529_price_usd_tag_icon" data-name="172529_price_usd_tag_icon" xmlns="http://www.w3.org/2000/svg" width="18.302" height="18.302" viewBox="0 0 18.302 18.302">
              <rect id="Rectangle_17" data-name="Rectangle 17" width="18.302" height="18.302" fill="none"/>
              <circle id="Ellipse_9" data-name="Ellipse 9" cx="1.22" cy="1.22" r="1.22" transform="translate(12.201 3.66)" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
              <path id="Path_126" data-name="Path 126" d="M18.457,3.878A.878.878,0,0,0,17.579,3H12.353c-.467,0-.914-.025-1.174.235L3.194,11.22a.664.664,0,0,0,0,.939l6.1,6.1a.664.664,0,0,0,.939,0l7.984-7.985c.259-.259.235-.7.235-1.173C18.456,9.1,18.457,3.933,18.457,3.878Z" transform="translate(-1.946 -1.209)" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"/>
              <g id="Group_38" data-name="Group 38" transform="translate(6.031 6.897)">
                <path id="Path_127" data-name="Path 127" d="M17.85,21.017a1.47,1.47,0,0,0,.292.858l1.531-1.531a5.576,5.576,0,0,1-.364-.693,1.914,1.914,0,0,1-.156-.584,1.046,1.046,0,0,1,.087-.52,1.871,1.871,0,0,1,.932-.887,1.641,1.641,0,0,1,1.253,0,2.026,2.026,0,0,1,.575.355l.381-.381.318.318-.387.387a1.7,1.7,0,0,1,.4,1.091,2.339,2.339,0,0,1-.4,1.19l-.491-.491a1.087,1.087,0,0,0,.023-1.317l-1.421,1.421.254.438a2.258,2.258,0,0,1,.171.373,1.778,1.778,0,0,1,.1.5,1.57,1.57,0,0,1-.072.563,1.36,1.36,0,0,1-.356.557,1.764,1.764,0,0,1-.6.407,1.608,1.608,0,0,1-.641.116,1.765,1.765,0,0,1-.65-.147A2.505,2.505,0,0,1,18,22.648l-.474.474-.318-.318.474-.474a1.905,1.905,0,0,1,.046-2.657l.491.491A1.222,1.222,0,0,0,17.85,21.017Zm.965,1.415a.962.962,0,0,0,.373.1.839.839,0,0,0,.381-.069,1.206,1.206,0,0,0,.376-.266.873.873,0,0,0,.222-.338.857.857,0,0,0,.037-.349,1.254,1.254,0,0,0-.1-.373c-.056-.129-.12-.261-.194-.4l-1.449,1.449A1.682,1.682,0,0,0,18.815,22.432Zm2.053-4.225a.891.891,0,0,0-.693.306.868.868,0,0,0-.208.306.692.692,0,0,0-.041.317,1.26,1.26,0,0,0,.087.335,3.04,3.04,0,0,0,.173.358l1.352-1.351A1.161,1.161,0,0,0,20.868,18.207Z" transform="translate(-17.168 -17.536)"/>
              </g>
            </svg>
            <span style="position: relative; top: 2px;">{{ homeSlot.price }}</span>
          </p>
          <p class="mr-3">
            <svg class="mr-2" id="_6602651_area_design_graphic_select_selection_icon" data-name="6602651_area_design_graphic_select_selection_icon" xmlns="http://www.w3.org/2000/svg" width="15.529"      height="12.201" viewBox="0 0 15.529 12.201">
              <path id="Path_128" data-name="Path 128" d="M26.773,21a.524.524,0,0,0-.555.555v1.664H24.555a.555.555,0,0,0,0,1.109h2.218a.524.524,0,0,0,.555-.555V21.555A.524.524,0,0,0,26.773,21Z" transform="translate(-11.799 -12.126)"/>
              <path id="Path_129" data-name="Path 129" d="M15.882,25H12.555a.555.555,0,1,0,0,1.109h3.328a.555.555,0,1,0,0-1.109Z" transform="translate(-6.454 -13.908)"/>
              <path id="Path_130" data-name="Path 130" d="M4.773,23.218H3.109V21.555A.524.524,0,0,0,2.555,21,.524.524,0,0,0,2,21.555v2.218a.524.524,0,0,0,.555.555H4.773a.555.555,0,0,0,0-1.109Z" transform="translate(-2 -12.126)"/>
              <path id="Path_131" data-name="Path 131" d="M2.555,16.328a.524.524,0,0,0,.555-.555V13.555A.524.524,0,0,0,2.555,13,.524.524,0,0,0,2,13.555v2.218A.524.524,0,0,0,2.555,16.328Z" transform="translate(-2 -8.563)"/>
              <path id="Path_132" data-name="Path 132" d="M4.773,5H2.555A.524.524,0,0,0,2,5.555V7.773a.524.524,0,0,0,.555.555.524.524,0,0,0,.555-.555V6.109H4.773a.524.524,0,0,0,.555-.555A.524.524,0,0,0,4.773,5Z" transform="translate(-2 -5)"/>
              <path id="Path_133" data-name="Path 133" d="M15.882,5H12.555A.524.524,0,0,0,12,5.555a.524.524,0,0,0,.555.555h3.328a.524.524,0,0,0,.555-.555A.524.524,0,0,0,15.882,5Z" transform="translate(-6.454 -5)"/>
              <path id="Path_134" data-name="Path 134" d="M26.773,5H24.555A.524.524,0,0,0,24,5.555a.524.524,0,0,0,.555.555h1.664V7.773a.555.555,0,0,0,1.109,0V5.555A.524.524,0,0,0,26.773,5Z" transform="translate(-11.799 -5)"/>
              <path id="Path_135" data-name="Path 135" d="M28.555,13a.524.524,0,0,0-.555.555v2.218a.555.555,0,1,0,1.109,0V13.555A.524.524,0,0,0,28.555,13Z" transform="translate(-13.58 -8.563)"/>
            </svg>
            <span style="position: relative; top: 2px;">{{ homeSlot.area }}m2</span>
          </p>
          <p class="mr-3">
            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="12.017" height="16.023" viewBox="0 0 12.017 16.023">
              <path id="_8687078_ic_fluent_door_regular_icon" data-name="8687078_ic_fluent_door_regular_icon" d="M7,11.013a1,1,0,1,0-1-1A1,1,0,0,0,7,11.013ZM4,4A2,2,0,0,1,6,2h8.012a2,2,0,0,1,2,2V16.02a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2ZM6,17.022h8.012a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H6A1,1,0,0,0,5,4V16.02A1,1,0,0,0,6,17.022Z" transform="translate(-4 -2)" fill="#212121"/>
            </svg>
            <span style="position: relative; top: 2px;">{{ homeSlot.rooms }}</span>
          </p>
          <p>
            <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="15.926" height="12.194" viewBox="0 0 15.926 12.194">
              <path id="Path_137" data-name="Path 137" d="M4,17.194H7.731V13.463h3.731V9.731h3.731V6h3.731" transform="translate(-3.5 -5.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
            </svg>

            <span style="position: relative; top: 2px;">{{ homeSlot.floor }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapRef } from '../firebase'
import axios from 'axios'

export default {
  name: "HereMap",
  data() {
    return {
      test: mapRef.on('child_added', async () => {
        let res = await axios.get(`https://pizza-5f900.firebaseio.com/address.json`)
        this.info2 = await res.data
        setTimeout(() => {
          console.log(this.geocodingService);
          if (this.$route.params.title === 'clicked') {
            this.findAddress('clicked')
          } else {
            this.findAddress()
          }
        }, 5000)
      }),
      show: false,
      platform: null,
      apikey: "t-RgxidFoqTL25DCcA9zSIXCIiUca4O7XnGdJ0XeJho",
      center: {
        lat: 0,
        lng: 0
      },
      info2: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: ''
      },
      geocodingService: null,
      map: null,
      homeSlot: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: '',
      },
      homeDataBase: [],
      suggestion: [],
      error: '',
      load: false
    };
  },
  watch: {
    center: {
      async handler() {
        const platform = new window.H.service.Platform({
          apikey: this.apikey
        });
        this.platform = platform;
        this.geocodingService = await this.platform.getGeocodingService()
        this.initializeHereMap();
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
  },
  methods: {
    async findAddress(state) { 
      setTimeout(() => {
        if (this.info2.address !== '') {
          this.geocodingService.geocode({ searchText: this.info2.address }, res => {
            if (res.Response.View.length > 0) {
              if (res.Response.View[0].Result.length > 0) {
                let position = res.Response.View[0].Result[0].Location.DisplayPosition
                let cordinates = { lat: position.Latitude, lng: position.Longitude}
                this.addMarker(cordinates)
                if (state === 'clicked') {
                  this.map.getViewModel().setLookAtData({ position: { lat: position.Latitude, lng: position.Longitude }, zoom: 17 },true);
                }
              }
            } else {
              this.error = 'Address not found. Be more precise'
            }
          }, err => {
            console.log(err);
          })
        }
      }, 100)
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
      var svgMarkup = '<svg width="100" height="100" viewBox="0 0 115 115" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="black" fill-opacity="1" stroke-opacity="1" rx="22" ry="22" x="0" y="0" width="90" ' +
        'height="90" />' +
        '<text x="42" y="65" font-size="45pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">🏡</text>' +
        '<path id="Polygon_2" data-name="Polygon 2" ' +
        'd="M6.5,0,13,11H0Z" transform="translate(53 100) rotate(180)" ' +
        'fill="#151515"/></svg>';
      
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
      this.load = false
    },
    suggestionChoose(address) {
      this.info2.address = address
      this.findAddress('clicked')
    }
  },
  computed: {
    homes() {
      return this.$store.state.homes
    }
  },
  async created() {
    this.load = true
    // Initialize the platform object:
    const success = (position) => {
        this.center.lat  = position.coords.latitude;
        this.center.lng = position.coords.longitude;
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
html, body {
  @media (max-width: 575.98px) {
    overflow: hidden;
  }
}

.close-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  top: -25px;
  border-radius: 999px;
  border: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-weight: bold;
}

.add-form {
  @media (max-width: 575.98px) {
    position: fixed;
    width: 90%;
    height: 90%;
  }
}

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
  width: 100%;
  min-height: 50%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px -2px 10px 0;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
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

.custom-container {
  height: 100%;
}

#map {
  background-color: antiquewhite;
  flex-grow: 1;
  min-width: 50%;
  height: 100%;
    @media (max-width: 575.98px) {
      width: 100%;
      max-width: 100%;
      height: 100vh;
    }
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