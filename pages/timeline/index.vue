<template>
  <div class="timeline">
<!--      <nuxt-link to="/timeline/map">Первый экран c картой</nuxt-link>-->
      <nuxt-link to="/timeline/information">Экран</nuxt-link>
      <button @click="CHANGE_BY_PATH(['timeline.pause', !timeline.pause])">puse {{timeline.pause}}</button>timeline.pause
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['byPath']),
    timeline() {
      return this.byPath('timeline')
    },
  },
  methods: {
    ...mapMutations(['CHANGE_BY_PATH'])
  }
}
</script>

<style>


</style>
