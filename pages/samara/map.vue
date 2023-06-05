<template>
  <div class="all-screen">
    <img :src="samara.map" alt="" class="all-size" />
  </div>
</template>

<script>

export default {
  computed: {
    samara() {
      return this.$store.state.samara
    }
  },
}
</script>

<style></style>
