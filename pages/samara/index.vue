<template>
  <div class="">
    Это Страница Стенда Самара, здесь вы можете поменять видео(Сейчас нажата
    кнопка({{ samara.counter }})), согласно указанной кнопке(они также есть в
    <NuxtLink to="/tablet">планшете</NuxtLink>)

    <div v-for="index in 4" :key="index">
      <button @click="pusk(index)">
        {{ '(' + index + ')Этап' + (index + 1) }}
      </button>
    </div>
    <button @click="samaraStart()">Пуск</button>
    <br />
    <NuxtLink to="/samara/map">Страница карты Самары</NuxtLink>
    <NuxtLink to="/samara/video">Страница видео Самары</NuxtLink>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({ byPath: 'byPath' }),
    samara() {
      return this.byPath('samara')
    },

  },
  // mounted() {
  //   this.refreshData()
  // },
  methods: {
    ...mapMutations(['CHANGE_BY_PATH', 'CHANGE_SAMARA_VIDEO']),
    async pusk(index) {
      // this.CHANGE_SAMARA_VIDEO(index);
      await this.$axios
        .$post('/api/area_samara/stage/', {stage: index,})
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.CHANGE_BY_PATH(['samara.idle', false])
      this.CHANGE_BY_PATH(['samara.start', false])
    },
    // refreshData: function () {
    //   setInterval(async function () {
    //     await this.$nuxt.refresh()
    //   }, 5000)
    // },
    async samaraStart() {
      this.CHANGE_BY_PATH(['samara.start', true])
      this.CHANGE_BY_PATH(['samara.counter', 1])
      await this.$axios
        .$post('/api/area_samara/stage/', {
          stage: 1,
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // },
    // async changeSamaraVideo() {
    //   this.CHANGE_SAMARA_VIDEO()
    //   // http://localhost:8000/api/area_samara/stage/
    //   await this.$axios
    //     .$post('http://localhost:8000/api/area_samara/stage/', {
    //       stage: this.samara.counter,
    //     })
    //     .then(function (response) {
    //       console.log(response)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
  },
}
</script>

<style></style>
