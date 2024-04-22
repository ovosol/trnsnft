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
import {Laurent} from "@/plugins/laurentControllerLegacy";

export default {
  async asyncData({$axios, store, $api}) {
    let chosenYear = ''
    let currentVideo = ''
    let idleVideo = ''

    const idleState = await $api.idle.getState('timeline')

    if (idleState) {
      idleVideo = await $api.idle.getVideo('timeline')
    } else {
      chosenYear = await $api.timeline.getYear()
      currentVideo = await $api.timeline.getVideo(chosenYear, 1)
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
      currentVideo: '',
      chosenYear: '',
      idleState: '',
      idleVideo: '',
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
  methods: {
    async changeTimeline() {
      let index = this.allYears.findIndex((x) => x === this.chosenYear);

      let counter = index + 1
      counter %= this.allYears.length;

      //const stopPlayback = index < 0 || counter === 0;
      const stopPlayback = true // always stop

      if (stopPlayback) {
        await Laurent.setOneRelayOn(Laurent.appName.Timeline, 0, [11, 12])
        await this.$api.idle.postState('timeline', true)
        return
      }

      let newYear = this.allYears[counter]

      await Laurent.setOneRelayOn(Laurent.appName.Timeline, counter + 1, [11, 12]).then()
      await this.$api.timeline.postYear(newYear)
    },
  },
}
</script>

<style></style>
