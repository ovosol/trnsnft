<template>
  <div class="all-screen">
    <ModuleVideo
      v-if="idleState"
      :videoSrc="idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      v-else
      class="all-size"
      :videoSrc="video"
      :loop="true"
      @ended="startIdle()"
    ></ModuleVideo>
    <div
      style="height: 100vh; display: flex"
      class="all-size corner-decoration"
      v-show="stage === 'future'"
    >
      <div class="future-moving-screen flex-center">
        <div class="carousel" style="justify-content: space-between;" v-show="modelIndex === null">
          <div class="logo-place">
            <img src="~/assets/picture/logo.png" alt=""/>
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
              <!-- <img
                src="~/assets/picture/carousel/controlElements/arrowBack.png"
                alt=""
              /> -->
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
              <!-- <img
                src="~/assets/picture/carousel/controlElements/arrowForward.png"
                alt=""
              /> -->
            </div>
          </div>
        </div>
        <div class="carousel all-screen" style="justify-content: center;" v-show="modelIndex !== null">
          <div class="logo-place" style="padding-bottom: 15vh;">
            <img src="~/assets/picture/logo.png" alt=""/>
          </div>
          <div
            class="carousel-items all-size"
            v-show="index === modelIndex"
            v-for="(model, index) in models"
            :key="index"
          >
            <div class="text-elements all-size">
              <div class="name">{{ model.name }}</div>
              <div class="desc">{{ model.desc }}</div>
              <Vue360Spinner
                :reverse="true"
                :images="models[index].jpgs"
                :remove360="true"
              >
                <p>Грузиться</p>
              </Vue360Spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueRangeSlider from 'vue-range-component'
// import VueProduct360 from '@deviznet/vue-product-360'

import {mapGetters} from 'vuex'

export default {
  async asyncData({$api}) {
    let idleVideo = ""

    let stage = ""
    let video = ""
    const idleState = await $api.idle.getState('technology')
    if (idleState) {
      idleVideo = await $api.idle.getVideo('technology')
    } else {
      stage = await $api.technology.getStage()

      video = await $api.technology.getVideo("moving", stage)
    }

    return {video, stage, idleState, idleVideo}
  },
  data() {
    return {
      futureMoving: false,
      newCoords: {},
      value: 60,
      carouselIndex: 1,
      slider: 0,
      video: null,
      stage: '',
      idleState: false,
      idleVideo: null,
    }
  },

  methods: {
    carouselAuto: function () {
      setInterval(() => {
        this.carouselChange(1)
      }, 5000)
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
      this.$api.idle.postState('technology', true)
    }
  },
  mounted() {
    this.carouselAuto()
  },
  computed: {
    ...mapGetters({byPath: 'byPath',}),
    modelIndex() {
      return this.byPath('smallTablet.modelIndex')
    },
    models() {
      return this.byPath('technology.models')
    },
  },
}
</script>

<style>
.future-moving-screen {
  /* padding: 10vh 0; */
  height: 80%;
}

.future-moving-screen > .carousel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  /* margin: 10vh auto auto auto; */
}

.future-moving-screen > .carousel > .logo-place {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  width: 100%;
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
  margin: auto 50px;
}
</style>
