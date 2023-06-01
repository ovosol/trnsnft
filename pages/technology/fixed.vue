<template>
  <div class="all-screen">
    <ModuleVideo
      v-if="idleState"
      :videoSrc="idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      class="all-size"
      :videoSrc="video"
      :loop="true"
    ></ModuleVideo>
  </div>
</template>

<script>

export default {
  data() {
    return {
      video: null,
      stage: '',
      idleState: false,
      idleVideo: null,
    }
  },
  async asyncData({$axios, $api}) {
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
  },
}
</script>

<style></style>
