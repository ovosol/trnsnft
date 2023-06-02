<template>
  <div class="all-screen" v-if="loaded">
    <ModuleVideo
      v-if="data.idleState"
      :videoSrc="data.idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      class="all-size"
      :videoSrc="data.video"
      :loop="true"
    ></ModuleVideo>
  </div>
</template>

<script>

import {getCurrentData} from "@/components/movingFetch";

export default {
  data() {
    return {
      loaded: false,
      data: {
        /** @type {TechnologyStage | null}*/
        stage: null,
        idleState: false,
        idleVideo: null,
        video: null,
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      while (true) {
        this.data = await getCurrentData("backstage", this.$api)

        this.loaded = true

        await new Promise(resolve => setTimeout(resolve, 500))
      }
    },
  }
  /*async asyncData({$axios, $api}) {
    let idleVideo = ""
    let video = ""
    let idleState = await $api.idle.getState('technology')
    const stage = await $api.technology.getStage()
    // show idle video if the screen is moving to start position
    idleState = idleState || stage === 'preparation'
    if (idleState) {
      idleVideo = await $api.idle.getVideo('technology')
    } else {
      video = await $api.technology.getVideo("backstage", stage)
    }

    return {video, stage, idleState, idleVideo}
  },*/
}
</script>

<style></style>
