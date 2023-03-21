<template>
  <div>
    chosenYear = {{ chosenYear }}
    <div
      v-for="(video, index) in [
        '1936',
        '1953',
        '1961',
        '1970',
        '1980s',
        '1990s',
        '2000s',
        '2010s',
      ]"
      :key="index"
    >
      {{ video }}
      {{ newVideos[index] }}
      <ModuleVideo
        v-show="intro"
        v-if="video === chosenYear"
        :videoSrc="
          localhostLink +
          '/media/static/timeline/video/mixkit-pet-owner-playing-with-a-cute-cat-1779-medium.mp4'
        "
        :loop="false"
        :pause="timeline.pause"
        @ended="intro = false"
      ></ModuleVideo>
      <ModuleVideo
        v-show="!intro"
        v-if="video === chosenYear"
        :videoSrc="newVideos[index]"
        :loop="false"
        :pause="timeline.pause"
      ></ModuleVideo>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData({ $axios }) {
    const chosenYear = await $axios
      .$get('/api/timeline/year/')
      // const chosenYear = await $axios.$get(api + '/api/timeline/year/')
      .then((response) => {
        console.log(response, 'response.data')
        return response.year
      })
    var a = []
    for (const year of [
      '1936',
      '1953',
      '1961',
      '1970',
      '1980s',
      '1990s',
      '2000s',
      '2010s',
    ]) {
      const video = await $axios
        .$get('/api/timeline/' + year + '/2/')
        .then((response) => {
          console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })
      a.push(video)
    }

    return {
      newVideos: a,
      chosenYear: chosenYear,
      localhostLink: process.env.BASE_URL,
    }
  },
  data() {
    return {
      intro: true,
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
    // allYears() {
    //   return this.videoByPath('tablet.changeYear')
    // },
  },
  // mounted() {
  //   this.refreshData()
  // },
  methods: {
    async changeTimeline() {
      let counter =
        this.allYears.findIndex((x) => x.name === this.chosenYear) + 1
      let newYear = this.allYears[counter].name
      if (!this.timeline.pause) {
        this.timeline.pause = false
      }
      if (counter >= 7) {
        await this.$axios
          .$post('/api/timeline/year/', { year: newYear })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        await this.$axios
          .$post('/api/timeline/year/', { year: newYear })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
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

<style></style>
