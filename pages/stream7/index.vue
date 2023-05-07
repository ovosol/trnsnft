<template>
  <div class="streams-container all-screen-overlay">
    <div style="position: absolute;">
      <video autoplay muted loop id="myVideo" class="all-screen-overlay">
        <source src="~/assets/picture/streams/map_stream.mp4" type="video/mp4">
      </video>
      <audio autoplay id="myAudio" ref="audio">
        <source :src="audio" type="audio/mp3">
      </audio>
      <img
        v-for="(item, index) in streamArr" :key="index"
        v-show="item === '1'"
        class="all-size all-screen-overlay"
        :src="require('~/assets/picture/streams/lines/stream' + `${(index+1)}` +  '.png')"
        alt=""
      />
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({$axios, $api}) {
    const streamArr = (await $api.flows.getFlows()).split('').reverse()

    return {streamArr}
  },
  data() {
    return {
      streamArr: [],
      audio: null
    }
  },
  watch: {
    streamArr(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
      if (newVal.length !== oldVal.length) return;

      let switchedOn = null

      for (let i = 0; i < newVal.length; i++) {
        if (newVal[i] === oldVal[i]) {
          continue;
        }

        if (newVal[i] === '0') {
          this.audio = null
          this.$refs.audio.pause()
          return;
        }

        if (switchedOn === null) {
          switchedOn = i
        } else {
          switchedOn = -1
          break;
        }
      }

      if (switchedOn == null) {
        return;
      }

      if (switchedOn < 0) {
        this.audio = null
        this.$refs.audio.pause()
        return;
      }

      let value = switchedOn
      console.log("value", value, switchedOn)
      this.audio = `/audio/streams/colba-${value}.mp3`
      this.$refs.audio.load()
      this.$refs.audio.play()
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
