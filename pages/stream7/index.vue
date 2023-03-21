<template>
  <div class="streams-container all-screen">
    <!-- <div style="z-index: 99">
      <div v-for="item in 7" :key="item">
        <img
          @click="streams(item)"
          :class="streamArr.indexOf(item) !== -1 ? 'choose-7stream' : ''"
          style="width: 100px"
          :src="require('~/assets/picture/stream.jpeg')"
          alt=""
        />
      </div>
    </div> -->
      <br />
      {{ streamArr }}
      <br />
      <div style="position: absolute;">
        <div class="all-screen"  v-for="(item, index) in streamArr" :key="index">
          <img
          v-show="item === '1'"
          class="all-size"
          :src="
            require('~/assets/picture/streams/lines/' + item + '.jpeg')
          "
          alt=""
        />
      </div>
    </div>
</div>
</template>

<script>

export default {
  async asyncData({ $axios }) {
    var flows = await $axios.$get('/api/flows/')
        .then((response) => {
          console.log(response, 'response.data')
          return response.mask
        });
    flows = flows.split('')

    return { streamArr: flows }
  },
  data() {
    return {
      streamArr: [],
    }
  },
  // mounted() {
  //   this.refreshData()
  // },
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
    // refreshData: function () {
    //   setInterval(async function () {
    //     await this.$nuxt.refresh()
    //   }, 5000)
    // },
  },
}
</script>

<style>
.choose-7stream {
  box-shadow: black 3px 3px;
}
.streams-container > div {
  display: flex; flex-direction: row;
  background-size: 100% 100%;
}
.streams-container {
  display: flex; flex-direction: column;
  background-image: url('~/assets/picture/samara/map.png');
}
</style>
