<template>
  <div class="all-screen" v-if="loaded">
    <ModuleVideo
      v-if="data.idleState"
      :videoSrc="data.idleVideo"
      :loop="true"
      mute
    ></ModuleVideo>
    <ModuleVideo
      v-else
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
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    },
  }
}
</script>

<style></style>
