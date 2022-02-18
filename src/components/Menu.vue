<template>
    <div>
        <div id="menu">
            <button :class="{'active': page === 'SearchAll'}" @click="goTo('SearchAll', 'search-all')">
                <svg xmlns="http://www.w3.org/2000/svg" width="21.182" height="20.271" viewBox="0 0 21.182 20.271">
                <g id="Group_49" data-name="Group 49" transform="translate(-2942 -66.863)">
                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="8.142" cy="8.142" r="8.142" transform="translate(2942 66.863)" fill="#000"/>
                    <path id="Rectangle_23" data-name="Rectangle 23" d="M0,0H2.683a0,0,0,0,1,0,0V7.858A1.342,1.342,0,0,1,1.342,9.2h0A1.342,1.342,0,0,1,0,7.858V0A0,0,0,0,1,0,0Z" transform="translate(2954.55 80.979) rotate(-48)" fill="#000"/>
                </g>
                </svg>
            </button>
            <button :class="{'active': page === 'AddHouse' || page === 'add-house'}" class="mid" @click="goTo('AddHouse', 'add-house')">
                <span>Add</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="23.598" height="22.022" viewBox="0 0 23.598 22.022">
                <path id="XMLID_219_" d="M24.481,13.443a1.743,1.743,0,0,1-1.644,1.142h-.6v8.652a.787.787,0,0,1-.787.787H16.731V18.518a3.933,3.933,0,0,0-7.866,0v5.506H4.146a.787.787,0,0,1-.787-.787V14.585h-.6A1.76,1.76,0,0,1,1.6,11.5l9.186-8.7a2.925,2.925,0,0,1,4.021,0l9.208,8.72A1.733,1.733,0,0,1,24.481,13.443Z" transform="translate(-0.999 -2.001)"/>
                </svg>
            </button>
            <button :class="{'active': page === 'Home' || page === ''}" @click="goTo('Home', '')">
                <svg id="_352536_map_icon" data-name="352536_map_icon" xmlns="http://www.w3.org/2000/svg" width="26.245" height="26.245" viewBox="0 0 26.245 26.245">
                <path id="Path_142" data-name="Path 142" d="M25.137,6a.442.442,0,0,0-.17.027L19.123,8.3,12.561,6,6.4,8.078A.556.556,0,0,0,6,8.6V25.137a.548.548,0,0,0,.547.547.442.442,0,0,0,.17-.027l5.845-2.269,6.561,2.3,6.168-2.072a.563.563,0,0,0,.394-.53V6.547A.548.548,0,0,0,25.137,6ZM19.123,23.5l-6.561-2.3V8.187l6.561,2.3Z" transform="translate(-2.719 -2.719)"/>
                <path id="Path_143" data-name="Path 143" d="M0,0H26.245V26.245H0Z" fill="none"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      page: ''
    }
  },
  methods: {
    goTo(string, route) {
      if (this.page !== string) {
        this.page = string
        this.$router.push(`/${route}`)
      }
    }
  },
  watch: { 
     '$route.name': {
        handler: function(search) {
           this.page = search
        },
        deep: true,
        immediate: true
      }
  },
}
</script>

<style lang="scss" scoped>
#menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: #333;
  z-index: 9999999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px 10px 32px;
  button {
    height: 47px;
    border: 0;
    border-radius: 16px;
    background-color: #fff;
    min-width: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #000;
    &.mid {
      min-width: 133px;
      span {
        position: relative;
        bottom: -2px;
      }
      svg {
        position: relative;
        top: -3px;
        margin-left: 5px;
      }
    }
    &.active {
      color: #fff;
      background-color: #A55FF7;
      svg {
        fill: #fff;
      }
    }
  }
}
</style>