
<template>
  <div class="custom-container position-relative">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-10 mx-auto">
            <!-- <div class="d-flex justify-content-center my-5">
              <button class="btn btn-primary mr-3">Добави квартира</button>
              <button class="btn btn-warning">Намери квартира</button>
            </div> -->
            <div class="row mt-5">
              <div class="col-md-12 mx-auto mb-3">
                <input type="text" class="form-control w-100" v-model="info.address" placeholder="Адрес">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.rooms" placeholder="Стаи">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.price" placeholder="Цена">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.area" placeholder="Площ кв.м">
              </div>
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control w-100" v-model="info.floor" placeholder="Етаж">
              </div>
              <div class="col-md-12 mb-4">
                <textarea class="form-control w-100" v-model="info.description" placeholder="Описание"></textarea>
              </div>
            </div>
            <button @click="findAddress" class="btn btn-success w-100">Добави</button>
          </div>
          <div v-if="homeSlot.address" class="col-md-8 mx-auto mt-5">
            <h2 class="mb-3">Къща 🏡</h2>
            <div class="text-left">
              <p class="mb-2"><b>Адрес:</b> {{ homeSlot.address }}</p>
              <p class="mb-2"><b>Стаи:</b> {{ homeSlot.rooms }}</p>
              <p class="mb-2"><b>Цена:</b> {{ homeSlot.price }}</p>
              <p class="mb-2"><b>Площ:</b> {{ homeSlot.area }}</p>
              <p class="mb-2"><b>Етаж:</b> {{ homeSlot.floor }}</p>
              <p class="mb-2"><b>Описание:</b> {{ homeSlot.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map">
    <!--In the following div the HERE Map will render-->
      <div id="mapContainer" style="width:100%; height: 100%" ref="hereMap"></div>
    </div>
</div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
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
      geocodingService: {},
      map: {},
      homeSlot: {
        address: '',
        rooms: '',
        price: '',
        area: '',
        description: '',
        floor: ''
      }
      // You can get the API KEY from developer.here.com
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
    };

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error)    
  },
  methods: {
    findAddress() {
      this.geocodingService.geocode({ searchText: this.info.address }, res => {
        if (res.Response.View.length > 0) {
          if (res.Response.View[0].Result.length > 0) {
            let position = res.Response.View[0].Result[0].Location.DisplayPosition
            // let marker = new window.H.map.Marker({ lat: position.Latitude, lng: position.Longitude})
            let cordinates = { lat: position.Latitude, lng: position.Longitude}
            this.addMarker(cordinates)
            this.map.getViewModel().setLookAtData({ position: { lat: position.Latitude, lng: position.Longitude }, zoom: 17 },true);
            // this.map.addObject(marker)
          }
        }
      }, err => {
        console.log(err);
      })
    },
    addMarker(cordinates) {
      var group = new window.H.map.Group();
      // var maptypes = this.platform.createDefaultLayers();
      // var ui = window.H.ui.UI.createDefault(this.map, maptypes);

      this.map.addObject(group);
      group.addEventListener('tap', evt => {
        let info = evt.target.getData().split('|')
        this.homeSlot.address = info[0]
        this.homeSlot.rooms = info[1]
        this.homeSlot.price = info[2]
        this.homeSlot.area = info[3]
        this.homeSlot.description = info[4]
        this.homeSlot.floor = info[5]
      }, false);
           
      let homeInfo = `${this.info.address}|${this.info.rooms}|${this.info.price}|${this.info.area}|${this.info.description}|${this.info.floor}`
      this.addMarkerToGroup(group, cordinates, homeInfo)
          
    },
    addMarkerToGroup(group, coordinates, html) {
      var svgMarkup = '<svg width="100" height="100" ' +
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
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 16,
        center: this.center
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
    }
  }
};
</script>

<style>

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

input {
  min-width: 200px;
  height: 40px;
  margin-right: 15px;
}
</style>