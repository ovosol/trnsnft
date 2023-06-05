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

export default {
  data() {
    return {
      stage: '',
    }
  },
  async asyncData({ $axios, $api }) {
    const stage = await $api.technology.getStage()
    return { stage }
  },
  methods: {
    async changeStage(stage) {
      await this.$api.technology.postStage(stage)
    }
  },
}
</script>

<style></style>
