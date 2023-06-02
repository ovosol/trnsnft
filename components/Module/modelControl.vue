<template>
  <div class="all-size flex-center" style="align-items: center">
    <div class="sliderus">
        <div >
          <Vue360Spinner
            :reverse="true"
            @changeCurrent="changeModelValue"
            :images="images"
          >
            <p>Грузится</p>
          </Vue360Spinner>
        </div>

      <!-- <label for="vue-range-slider">x</label> -->
      <!-- <vue-range-slider
        :name="'x'"
        :step="1"
        :min="1"
        :max="179"
        v-model="modelValue"
      ></vue-range-slider> -->
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueProduct360 from '@deviznet/vue-product-360'
// import VueRangeSlider from 'vue-range-component'

export default {
  name: 'ModelControl',
  data() {
    return {
      modelValue: 1,
      lastSendFrame: 1,
    }
  },
  props: {
    modelIndex: Number,
  },
  components: {
    // VueProduct360,
    // VueRangeSlider,
  },
  mounted() {
    setTimeout(this.sendFrame, 30);
  },
  computed: {
    ...mapGetters({byPath: 'byPath'}),
    models() {
      return this.byPath('technology.models')
    },
    images(){
      console.log('index', this.modelIndex)
      console.log('models', this.models)
      return this.models[this.modelIndex].jpgs
    },
  },
  methods: {
    async sendFrame() {
      if (this.lastSendFrame !== this.modelValue) {
        await this.$api.technology.postModelFrame(this.modelValue)
        this.lastSendFrame = this.modelValue
      }

      setTimeout(this.sendFrame, 30);
    },
    changeModelValue(newVal) {
      console.log('changeModelValue', newVal)
      this.modelValue = newVal
    },
  },
}
</script>

<style>
.vue-product-360,
.sliderus,
.vue-product-360 > img,
.sliderus > div,
.sliderus > div > div {
  height: 100%;
}

.vue-product-360 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vue-product-360 > img[draggable="false"]:last-child {
  height: 20%;
}

/* .vue-product-360 > img[draggable="false"]:first-child {
  height: 55%;
} */
</style>
