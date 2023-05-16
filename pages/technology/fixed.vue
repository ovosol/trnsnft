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
        class="all-size"
        :videoSrc="video"
        :loop="true"
      ></ModuleVideo>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      video: null,
      stage: '',
    }
  },
  async asyncData({ $axios }) {
    const stage = await $axios
        .$get('/api/technologies/stage/')
        .then((response) => {
          console.log(response, 'response.data')
          return response.stage
        })

    const video = await $axios
        .$get('/api/technologies/backstage/' + stage + '/')
        .then((response) => {
          console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })

    /*const fixedVideos = [];
    for (const period of ['past', 'present_1', 'present_2', 'future']) {
      const video = await $axios
        .$get('api/technologies/backstage/'+ period +'/' )
        .then((response) => {
          console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })

      fixedVideos.push(video)
    }
    fixedVideos.forEach((e) => {e = '/media/' + e})*/

    return { video, stage }
  },
  computed: {
    // Мне кажется, это стоит исправить
    fixedVideo: function () {
      return this.stage === 'past'
        ? 1
        : this.stage === 'present'
        ? 2
        : this.stage === 'present2'
        ? 3
        : this.stage === 'future'
        ? 4
        : 'ОШИБКА'
    },

  },
}
</script>

<style></style>
