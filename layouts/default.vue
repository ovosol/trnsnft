<template>
  <nuxt/>
</template>

<script>
export default {
  methods: {
    refreshData: function () {
      setInterval(async function () {
        await this.$nuxt.refresh()
      }, 300)
    }
  },
  mounted() {
    this.refreshData()
    document.addEventListener('contextmenu', event => event.preventDefault());
  }
}
</script>

<style>

</style>
