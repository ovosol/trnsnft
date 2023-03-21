<template>
  <div class="all-screen">
    <!-- style="display: none" -->
    {{ samara.start }}
    {{samaraVideos}}
    ssssssssssss{{samara.idle}}
    <div v-for="(video, index) in samaraVideos" :key="index+'1'">
      <v-idle
        @idle="CHANGE_BY_PATH(['samara.idle', true])"
        :loop="false"
        :duration="parseFloat(video.video_duration) + 3"
        :events="['']"
        v-if="!samara.idle && index === stage"
      />
    </div>
    <div class="">
      Здесь играет ролик, выбранный с помощью кнопок, на стенде Самара
      снизу(Этап 1...4, Пуск) Если хотите переключить ролик, откройте в другой
      вкладке <NuxtLink to="/entry_group/left">эту ссылку</NuxtLink> и
      переключите
    </div>
    Сейчас Выбран {{ stage }}
    <!-- <div class="" v-show="!samara.idle"> -->
    <div
      v-show="!samara.idle"
      v-for="(video, index) in samaraVideos"
      :key="index"
    >
    <ModuleVideo
        v-if="index === stage-1"
        class="all-size"
        :videoSrc="video.current_video"
        :loop="false"
        @ended="changeSamara()"
      ></ModuleVideo>
    </div>
    <!-- </div> -->
    <img
      class="all-screen"
      v-show="samara.idle"
      src="~/assets/picture/logo.png"
      alt=""
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData({ $axios }) {
    const stage = await $axios
        .$get('/api/area_samara/stage/')
        .then((response) => {
          console.log(response, 'response.data')
          return response.stage
        })
    var a = []
    for (let count = 1; count <= 4; count++) {
      const video = await $axios
        .$get('/api/area_samara/' + count + '/video/')
        .then((response) => {
          console.log(response, 'response.data')
          return response
        })
      a.push(video)
    }
    a.forEach((e) => {e.current_video = process.env.BASE_URL + e.current_video})

    return { samaraVideos: a, stage: stage }
  },
  // samara: {
  //   video: [
  //     {
  //       src: require('/static/video/samara/1.mp4'),
  //       endTime: 20,
  //     },
  //     {
  //       src: require('/static/video/samara/2.mp4'),
  //       endTime: 15,
  //     },
  //     {
  //       src: require('/static/video/samara/3.mp4'),
  //       endTime: 23,
  //     },
  //     {
  //       src: require('/static/video/samara/3.mp4'),
  //       endTime: 23,
  //     },
  //   ]
  // },
  computed: {
    ...mapGetters({ byPath: 'byPath', videoByPath: 'video/byPath' }),
    samara() {
      return this.byPath('samara')
    },
    videoSamara() {
      return this.videoByPath('samara')
    },
  },
  methods: {
    ...mapMutations(['CHANGE_SAMARA_VIDEO','CHANGE_BY_PATH']),
    async changeSamara() {
      if (this.samara.start) {
        let newStage = parseInt(this.stage)+1;
        console.log(newStage, 'newStage');
        // this.CHANGE_SAMARA_VIDEO(this.samara.counter + 1)
        await this.$axios
        .$post('/api/area_samara/stage/', {stage: newStage,})
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    // refreshData: function () {
    //   setInterval(async function () {
    //     await this.$nuxt.refresh()
    //   }, 5000)
    // },
  },
  // mounted() {
  //   this.refreshData()
  // },
}
</script>

<style></style>
