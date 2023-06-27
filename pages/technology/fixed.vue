<template>
  <div class="all-screen" v-if="loaded">
    <ModuleVideo
      v-if="data.idleState"
      :videoSrc="data.idleVideo"
      :loop="true"
      class="all-size"
      mute
      stretch
    ></ModuleVideo>
    <ModuleVideo
      v-else
      class="all-size"
      :videoSrc="data.video"
      :loop="true"
      stretch
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
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      await new Promise(resolve => setTimeout(resolve, 300))
      this.data = await getCurrentData("backstage", this.$api)
      this.loaded = true
      setTimeout(() => {
        this.loadData()
      }, 300)
    },
  }
}
</script>

<style></style>
