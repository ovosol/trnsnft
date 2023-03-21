<template>
  <div class="all-screen">
    <img :src="samara.map" alt="" class="all-size" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['byPath']),
    samara() {
      return this.byPath('samara')
    }
  },
}
</script>

<style></style>
