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

export default {
  async asyncData({$axios, store, $api}) {
    let chosenYear = ''
    let currentVideo = ''
    let idleVideo = ''

    const idleState = await $api.idle.getState('timeline')

    if (idleState) {
      const res = await $api.idle.getVideo('timeline')
      idleVideo = process.env.BASE_URL + res.current_video
    } else {
      chosenYear = await $api.timeline.getYear()
      const res = await $api.timeline.getVideo(chosenYear, 1)
      currentVideo = process.env.BASE_URL + res.current_video
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
        this.$laurent.setOneRelayOn(this.$laurent.appName.Timeline, 0).then()
        await this.$api.idle.postState('timeline', true)
        return
      }

      let newYear = this.allYears[counter]
      if (!this.timeline.pause) {
        this.timeline.pause = false
      }
      this.$laurent.setOneRelayOn(this.$laurent.appName.Timeline, counter + 1).then()
      await this.$api.timeline.postYear(newYear)
    },
  },
}
</script>

<style></style>
