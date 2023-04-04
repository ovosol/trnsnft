<template>
  <div class="streams-container all-screen-overlay">
    <div style="position: absolute;">
      <video autoplay muted loop id="myVideo" class="all-screen-overlay">
        <source src="~/assets/picture/streams/map_stream.mp4" type="video/mp4">
      </video>
      <img v-for="(item, index) in streamArr" :key="index"
           v-show="item === '1'"
           class="all-size all-screen-overlay"
           :src="
            require('~/assets/picture/streams/lines/stream' + `${(index+1)}` +  '.png')
          "
           alt=""
      />
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({$axios, $api}) {
    const streamArr = (await $api.flows.getFlows()).split('')

    return {streamArr}
  },
  data() {
    return {
      streamArr: [],
    }
  },
  methods: {
    streams(item) {
      if (this.streamArr.indexOf(item) !== -1) {
        return (this.streamArr = this.streamArr.filter(function (ele) {
          return ele != item
        }))
      } else {
        this.streamArr.push(item)
      }
    },
  },
}
</script>

<style>
.choose-7stream {
  box-shadow: black 3px 3px;
}

.streams-container > div {
  display: flex;
  flex-direction: row;
  background-size: 100% 100%;
}

.streams-container {
  display: flex;
  flex-direction: column;
  background-color: black;
}

.all-screen-overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
}
</style>
