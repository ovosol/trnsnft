<template>
  <div class="all-screen">
    <!--    <div class="">
          Это неподвижный большой экран стенда техноглогии. Здесь играет ролик,
          выбранный с помощью кнопок планшета. Если хотите переключить ролик,
          откройте в другой вкладке
          <NuxtLink to="/technology">эту ссылку</NuxtLink> и переключите
        </div>
        Сейчас выбран период {{ stage }} fixedVideo - {{ fixedVideo }}-->
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
    let stage = ""
    let video = ""
    const idleState = await $api.idle.getState('technology')
    if (idleState) {
      idleVideo = await $api.idle.getVideo('technology')
    } else {
      stage = await $api.technology.getStage()

      video = await $api.technology.getVideo("backstage", stage)
    }

    return {video, stage, idleState, idleVideo}
  },
}
</script>

<style></style>
