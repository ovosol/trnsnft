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
    models() {
      return this.$store.state.technology.models
    },
    images(){
      console.log('index', this.modelIndex)
      console.log('models', this.models)
      return this.models[this.modelIndex].imagesSmall
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
.sliderus,
.sliderus > div,
.sliderus > div > div {
  height: 100%;
}

/* .vue-product-360 > img[draggable="false"]:first-child {
  height: 55%;
} */
</style>
