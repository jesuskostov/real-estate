
<template>
  <div>
    <input type="text" v-model="address" placeholder="Address">
    <input type="text" v-model="info.rooms" placeholder="Rooms">
    <input type="text" v-model="info.price" placeholder="Price">
    <button @click="findAddress">Save</button>
    <div style="width: 800px; margin: 30px auto;">
      <p style="text-align: left">Историята е: Ти си брокер и искаш да запишеш апартаменти на картата с информация колко стаи имат и каква е цената им. <br>
        1. Копирай точен адрес например от Google Maps на дадената локация<br>
        2. Добави броят на стаите<br>
        3. Добави цената
      </p>
    </div>
    <div id="map">
    <!--In the following div the HERE Map will render-->
      <div id="mapContainer" style="height:800px;width:100%" ref="hereMap"></div>
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
      address: 'бул. „Черни връх“ 100, 1407 Хладилника, София',
      info: {
        rooms: '',
        price: '',
      },
      geocodingService: {},
      map: {}
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
      this.geocodingService.geocode({ searchText: this.address }, res => {
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
      var maptypes = this.platform.createDefaultLayers();
      var ui = window.H.ui.UI.createDefault(this.map, maptypes);

        this.map.addObject(group);

        // add 'tap' event listener, that opens info bubble, to the group
        group.addEventListener('tap', function (evt) {
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData()
          });
          // show info bubble
          ui.addBubble(bubble);
        }, false);

        this.addMarkerToGroup(group, cordinates,
          `<p>Rooms: ${this.info.rooms}</p> <p>Price: ${this.info.price}</p>`
        )
          
    },
    addMarkerToGroup(group, coordinates, html) {
      var marker = new window.H.map.Marker(coordinates);
      // add custom data to the marker
      marker.setData(html);
      group.addObject(marker);
    },
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 12,
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

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 20px auto;
  background-color: #ccc;
}

input {
  min-width: 200px;
  height: 40px;
  margin-right: 15px;
}
</style>