<template>
  <div class="flex-center all-screen ">
    <div id="videoBackground">
      <video
        src="/humanCapital/video/Capital_BG_loop.mp4"
        autoplay
        loop
        muted
        width="100%"
        height="100%"
        style="object-fit: cover;"
      ></video>
    </div>
    <button-back
      @click="returnToMain()"
      v-show="title || contentPage"
    />

    <ModuleBtnCollection
      :btnArray="btnArray"
      :btnStyle="style"
      :btnTitle="title"
      :contentPage="contentPage"
      @changeBtns="changeBtns"
      class="all-size flex-center "
    ></ModuleBtnCollection>
    <idle @on-idle="returnToMain(true)"/>
  </div>
</template>

<style scoped>
#videoBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}
</style>

<script>
import {mapGetters} from 'vuex'
import ButtonBack from "@/components/Module/ButtonBack.vue";
import Idle from "@/pages/human_capital/Idle.vue";
import VideoPlayer from 'vue-video-player-mx'

export default {
  components: {Idle, ButtonBack, VideoPlayer},
  data() {
    return {
      array: [],
      style: 'oddBtns',
      title: null,
      currentPage: null,
      pagesStack: [],
      contentPage: null
    }
  },
  computed: {
    btnKeys() {
      return Object.keys(this.humanCapital)
    },
    btnArray() {
      if (this.array.length === 0) {
        return this.humanCapital.main
      } else {
        return this.array
      }
    },
    humanCapital() {
      return this.$store.state.btns.humanCapital
    }
  },
  methods: {
    returnToMain(forceMain = false) {
      this.currentPage = null
      if (forceMain || this.pagesStack.length === 0) {
        this.current = null
        this.parent = null
        this.array = this.humanCapital.main;
        this.title = null
        this.contentPage = null
        this.pagesStack = []
      } else {
        const btn = this.pagesStack.pop()
        this.changeBtns(btn)
      }
    },
    changeBtns(btn) {
      if (this.currentPage) {
        this.pagesStack.push(this.currentPage)
      }
      this.currentPage = btn

      if (this.humanCapital[btn.link]) {
        // first level pages
        this.contentPage = null
        this.title = btn.name.replaceAll(' <br>', '')
        this.array = this.humanCapital[btn.link]
        this.style = this.humanCapital[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
      } else if (btn.link.includes('_book')) {
        // honor or veteran book
        this.$router.push({path: '/human_capital/' + btn.link})
      } else {
        // any content page
        console.log('content page', btn.link)
        this.contentPage = btn.link
        this.array = []
        //this.title = btn.name.replaceAll(' <br>', '')
      }
    },
  },
}
</script>

