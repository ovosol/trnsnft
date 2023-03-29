<template>
  <div>
    <ModuleVideo
      v-if="idleState"
      :videoSrc="idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      v-else
      @ended="changeTimeline()"
      :videoSrc="currentVideo"
    ></ModuleVideo>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {appName, setOneRelayOn, setOneRelayOnLegacy} from "~/plugins/laurentController";

export default {
  async asyncData({$axios}) {
    let chosenYear = ''
    let currentVideo = ''
    let idleVideo = ''
    /** @type Boolean  */
    const idleState = await $axios
      .$get('/api/idle/timeline/state/')
      .then((response) => {
        // console.log(response, 'response.data')
        return response.state
      })

    if (idleState) {
      idleVideo = await $axios
        .$get('/api/idle/timeline/video')
        .then((response) => {
          // console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })
    } else {
      chosenYear = await $axios
        .$get('/api/timeline/year/')
        .then((response) => {
          // console.log(response, 'response.data')
          return response.year
        })

      currentVideo = await $axios
        .$get('/api/timeline/' + chosenYear + '/1/')
        .then((response) => {
          // console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })
    }

    return {
      currentVideo,
      chosenYear,
      idleState,
      idleVideo
    }
  },
  data() {
    return {
      allYears: [
        '1936',
        '1953',
        '1961',
        '1970',
        '1974',
        '1979',
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
    ...mapGetters({videoByPath: 'btns/byPath', byPath: 'byPath'}),
    timeline() {
      return this.byPath('timeline')
    },
  },
  methods: {
    async changeTimeline() {
      let counter = this.allYears.findIndex((x) => x === this.chosenYear) + 1
      counter %= this.allYears.length;

      if (counter === 0) {
        setOneRelayOn(appName.Timeline, 0).then()
        await this.$axios
          .$post('/api/idle/timeline/', {
            state: true,
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        return
      }

      let newYear = this.allYears[counter]
      if (!this.timeline.pause) {
        this.timeline.pause = false
      }
      setOneRelayOn(appName.Timeline, counter + 1).then()
      await this.$axios
        .$post('/api/timeline/year/', {year: newYear})
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
