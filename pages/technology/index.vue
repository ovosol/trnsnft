<template>
  <div class="">
    Это страница технологий. Нажмите на кнопки ниже, чтобы запустить
    соответствующий период. Кнопки также есть в
    <NuxtLink to="/tablet">планшете</NuxtLink>

    <br>
    Выбран период {{stage}}
    <br>

    <div v-for="(item, index) in ['past', 'present', 'present2', 'future']" :key="index">
      <button @click="changeStage(item)">
        {{ item }}
      </button>
    </div>

    <br />
    <NuxtLink to="/technology/fixed"
      >ссылка на Большой задний экран в технологиях</NuxtLink>
    <br />
    <NuxtLink to="/technology/moving"
      >ссылка на Перемещающиеся экран в технологиях</NuxtLink>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  async asyncData({ $axios }) {
    const stage = await $axios
        .$get('/api/technologies/stage/')
        .then((response) => {
          console.log(response, 'response.data')
          return response.stage
        })
    return { stage: stage }
  },
  computed: {
    ...mapGetters(['byPath']),
    technology() {
      return this.byPath('technology')
    }
  },
  methods: {
    async changeStage(stage) {
      await this.$axios
        .$post('/api/technologies/stage/', {
          stage: stage,
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // ...mapMutations(['CHANGE_BY_PATH']),
  },
}
</script>

<style></style>
