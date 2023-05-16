<template>
  <div class="all-screen">
    {{entryGroup}}
    <ModuleVideo class="all-size" :videoSrc="entryGroup" :loop="true"></ModuleVideo>
  </div>
</template>

<script>

export default {
  data() {
    return {
      entryGroup: '',
    }
  },
  async asyncData({ $axios }) {
    const entryGroup = await $axios
        .$get('/api/entry_group/video/')
        .then((response) => {
          console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })

    return { entryGroup }
  },
}
</script>

<style></style>
