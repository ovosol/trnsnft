<template>
  <div class="all-screen">
    <ModuleVideo
      v-if="idleState"
      :videoSrc="idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      v-else
      @ended="changeSamara()"
      :videoSrc="currentVideo"
    >
    </ModuleVideo>
  </div>
</template>

<script>

export default {
  async asyncData({$axios, $api}) {
    const idleState = await $api.idle.getState('samara')
    let stage = 0
    let currentVideo = ''
    let idleVideo = ''
    if (idleState) {
      const res = await $api.idle.getVideo('samara')
      idleVideo = process.env.BASE_URL + res.current_video
    } else {
      stage = await $api.samara.getStage()
      const res = await $api.samara.getVideo(stage)
      currentVideo = process.env.BASE_URL + res.current_video
    }

    return {currentVideo, stage, idleState, idleVideo}
  },
  data() {
    return {
      idleState: true,
      stage: 0,
      currentVideo: '',
      idleVideo: '',
    }
  },
  methods: {
    async changeSamara() {
      const autoplay = await this.$api.samara.getAutoPlay()
      console.log('autoplay', autoplay)
      if (!autoplay) {
        // go to idle after any video
        await this.$api.samara.postAutoPlay(false)
        await this.$api.idle.postState('samara', true)
      } else {
        const currentStage = await this.$api.samara.getStage()
        const nextVideo = currentStage + 1
        if (nextVideo > 4) {
          await this.$api.samara.postAutoPlay(false)
          await this.$api.idle.postState('samara', true)
        } else {
          await this.$api.samara.postStage(nextVideo)
        }
      }
    }
  }
}
</script>

<style></style>
