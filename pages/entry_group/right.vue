<template>
  <div class="all-screen">
    {{entryGroup}}
    <ModuleVideo class="all-size" :videoSrc="entryGroup" :loop="true"></ModuleVideo>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// /video_stand/page/
export default {
  async asyncData({ $axios }) {
    const video = await $axios
        .$get('/api/entry_group/video/')
        .then((response) => {
          console.log(response, 'response.data')
          return process.env.BASE_URL + response.current_video
        })

    return { entryGroup: video }
  },
  computed: {
    ...mapGetters({videoByPath: 'video/byPath'}),
    // entryGroup() {
    //   return this.videoByPath('entryGroup')
    // }
  },
}
</script>

<style></style>
