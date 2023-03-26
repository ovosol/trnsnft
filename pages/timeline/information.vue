<template>
  <div>
    <ModuleVideo
      @ended="changeTimeline()"
      :videoSrc="currentVideo"
      :loop="false"
    ></ModuleVideo>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {appName, setOneRelayOn} from "~/plugins/laurentController";

export default {
  async asyncData({ $axios }) {
    const chosenYear = await $axios
      .$get('/api/timeline/year/')
      .then((response) => {
        // console.log(response, 'response.data')
        return response.year
      })

    const currentVideo = await $axios
      .$get('/api/timeline/' + chosenYear + '/1/')
      .then((response) => {
        // console.log(response, 'response.data')
        return process.env.BASE_URL + response.current_video
      })

    return {
      currentVideo,
      chosenYear,
    }
  },
  data() {
    return {
      allYears: [
        '1936',
        '1953',
        '1961',
        '1970',
        '1980s',
        '1990s',
        '2000s',
        '2010s',
      ],
    }
  },
  watcher: {
    chosenYear() {
      this.intro = true
    },
  },
  computed: {
    ...mapGetters({ videoByPath: 'btns/byPath', byPath: 'byPath' }),
    timeline() {
      return this.byPath('timeline')
    },
  },
  methods: {
    async changeTimeline() {
      let counter = this.allYears.findIndex((x) => x === this.chosenYear) + 1
      let newYear = this.allYears[counter]
      if (!this.timeline.pause) {
        this.timeline.pause = false
      }
      setOneRelayOn(appName.Timeline, counter + 1).then()
      // if (counter >= 7) {
      await this.$axios
        .$post('/api/timeline/year/', { year: newYear })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      // }
    },
    // refreshData: function () {
    //   setInterval(async function () {
    //     await this.$nuxt.refresh()
    //   }, 5000)
    // },
  },
}
</script>

<style></style>
