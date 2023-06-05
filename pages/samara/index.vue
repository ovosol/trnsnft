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
export default {
  computed: {
    samara() {
      return this.$store.state.samara
    },

  },
  methods: {
    async pusk(index) {
      await this.$axios
        .$post('/api/area_samara/stage/', {stage: index,})
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async samaraStart() {
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
  },
}
</script>

<style></style>
