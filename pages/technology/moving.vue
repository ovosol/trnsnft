<template>
  <div class="all-screen" v-if="dataLoaded">
    <ModuleVideo
      v-if="data.idleState"
      :videoSrc="data.idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      v-if="!data.idleState && data.stage !== 'future'"
      class="all-size"
      :videoSrc="data.video"
      :loop="false"
      @ended="startIdle()"
    ></ModuleVideo>
    <div
      style="height: 100vh; display: flex"
      class="all-size"
      v-if="data.stage === 'future'"
    >
      <video
        class="all-size background-video"
        :src="data.video"
        :loop="true"
        autoplay
        muted
        v-if="data.stage === 'future'"
      ></video>
      <div class="future-moving-screen flex-center">
        <div class="carousel" style="justify-content: space-between;" v-if="modelIndex === null">
          <div class="logo-place" style="padding-bottom: 15vh;">
            <img src="~assets/picture/logo_dark.png" alt=""/>
          </div>
          <div class="carousel-items">
            <img
              :key="item + '1'"
              v-for="item in 5"
              v-show="carouselIndex === item"
              :src="require('/assets/picture/carousel/' + item + '.png')"
              alt=""
            />
          </div>
          <div class="control-elements">
            <div @click="carouselChange(-1)" class="arrow-back">
            </div>
            <div class="circle" v-for="item in 5" :key="item + '1'">
              <img
                v-show="carouselIndex === item"
                src="~/assets/picture/carousel/controlElements/active.png"
                alt=""
              />
              <img
                v-show="carouselIndex !== item"
                src="~/assets/picture/carousel/controlElements/notActive.png"
                alt=""
              />
            </div>
            <div @click="carouselChange(1)" class="arrow-forward">
            </div>
          </div>
        </div>
        <div class="carousel all-screen" style="justify-content: center;" v-if="modelIndex !== null">
          <div class="logo-place" style="padding-bottom: 3vh;">
            <img src="~assets/picture/logo_dark.png" alt=""/>
          </div>
          <div
            class="carousel-items all-size"
          >
            <div class="text-elements all-size">
              <div class="name">{{ models[modelIndex].name }}</div>
              <div class="desc" v-html="description"></div>
              <Vue360Spinner
                class="moving-spinner"
                :reverse="true"
                :images="models[modelIndex].imagesBig"
                :remove360="true"
                :model-value="modelFrame"
              >
                <p>Грузится</p>
              </Vue360Spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Timeline} from "@/components/timeline";
import {getCurrentData} from "@/components/movingFetch";

export default {
  data() {
    return {
      dataLoaded: false,
      futureMoving: false,
      newCoords: {},
      value: 60,
      carouselIndex: 1,
      slider: 0,
      /** @type {Timeline | null}*/
      timeline: null,
      modelFrame: 0,
      carouselInterval: null,
      modelIndexInterval: null,
      modelFrameInterval: null,
      modelIndex: null,
      data: {
        /** @type {TechnologyStage | null}*/
        stage: null,
        idleState: false,
        idleVideo: null,
        video: null,
      }
    }
  },
  watch: {
    'data.stage': function (newVal) {
      if (newVal === 'future') {
        this.startCarousel()
      } else {
        this.stopCarousel()
      }
    },
    'data.idleState': function (newVal) {
      console.log('=== idleState', newVal)
      console.log('=== stage', this.data.stage)
      if (!newVal) {
        this.startSequence()
      } else {
        this.stopSequence()
      }
    },
  },
  methods: {
    async loadData() {
      while (true) {
        this.data = await getCurrentData("moving", this.$api)
        this.dataLoaded = true
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    },
    async startSequence() {
      console.log('=== startSequence', this.data.stage)
      if (this.data.stage === 'diaskan') {
        console.log("=== waypoint")
        this.timeline = new Timeline(true)
        const app = this
        this.timeline.addAction(34, () => {
          app.$api.technology.postLaurentPoint("present_2")
        })
        this.timeline.addAction(73, () => {
          app.$api.technology.postLaurentPoint("present_3")
        })
        this.timeline.start()
      }
    },
    async stopSequence() {
      this.timeline?.stop()
    },
    startCarousel() {
      this.carouselInterval =
        setInterval(() => {
          this.carouselChange(1)
        }, 5000)

      this.modelIndexInterval =
        setInterval(async () => {
          this.modelIndex = await this.$api.technology.getModelIndex()
        }, 100)

      this.modelFrameInterval =
        setInterval(async () => {
          if (this.modelIndex === null) return
          this.modelFrame = await this.$api.technology.getModelFrame()
        }, 30)
    },
    stopCarousel() {
      clearInterval(this.carouselInterval)
      clearInterval(this.modelIndexInterval)
      clearInterval(this.modelFrameInterval)
      this.modelIndex = null
      this.modelFrame = 0
    },
    carouselChange(count) {
      this.carouselIndex += count
      if (this.carouselIndex === 6) {
        this.carouselIndex = 1
      }
      if (this.carouselIndex === 0) {
        this.carouselIndex = 5
      }
    },
    startIdle() {
      this.timeline?.stop()
      this.timeline?.clearActions()
      this.$api.idle.postState('technology', true)
    }
  },
  mounted() {
    this.startCarousel()
    this.loadData()
  },
  destroyed() {
    this.stopCarousel()
  },
  computed: {
    models() {
      return this.$store.state.technology.models
    },
    description() {
      if (this.modelIndex === null) return ''
      let d = this.models[this.modelIndex].desc
      d = d.replaceAll('\n', '<br/>')
      return d
    }
  },
}
</script>

<style>
.moving-spinner {
  height: 60vh;
}

.background-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.future-moving-screen {
  height: 80%;
  margin-top: auto;
  margin-bottom: auto;
}

.future-moving-screen > .carousel {
  /* display: flex;
   flex-direction: column;*/
  width: 100%;
  height: 100vh;
  /* margin: 10vh auto auto auto; */
}

.future-moving-screen > .carousel > .logo-place {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  top: 24px;
}

.future-moving-screen > .carousel > .logo-place > img {
  width: 50%;
  display: flex;
  justify-self: center;
  align-self: center;
}

.future-moving-screen > .carousel > .carousel-items {
  height: 40%;
  display: flex;
}

.future-moving-screen > .carousel > div {
  display: flex;
  justify-content: center;
  /* padding: 10% 0%; */
}

.future-moving-screen > .carousel > div > div > img {
  padding: 10% 0%;
  width: 80%;
  height: 80%;
}

.future-moving-screen > .carousel > .control-elements {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;
  justify-content: center;
}

.future-moving-screen > .carousel > .control-elements > div {
  width: 10%;
}

.future-moving-screen > .carousel > .control-elements > div > img {
  width: 60%;
}

.text-elements > .name {
  font-size: 180%;
  font-weight: 800;
  text-align: center;
  padding-bottom: 30px;
}

.text-elements > .desc {
  margin: auto 120px;
}
</style>
