<template>
  <div class="all-size flex-center" style="align-items: center">
    <div class="sliderus">
      <div v-show="index === modelIndex" v-for="index in 3" :key="index">
        <div>
          <Vue360Spinner
            :reverse="true"
            @changeCurrent="changeModelValue"
            :images="models[index].jpgs"
          >
            <p>Грузиться</p>
          </Vue360Spinner>
        </div>
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
import { mapMutations, mapGetters } from 'vuex'
// import 'vue-range-component/dist/vue-range-slider.css'
// import VueProduct360 from '@deviznet/vue-product-360'
// import VueRangeSlider from 'vue-range-component'

export default {
  data() {
    return {
      modelValue: 1,
    }
  },
  props: {
    modelNum: Number,
  },
  components: {
    // VueProduct360,
    // VueRangeSlider,
  },
  watch: {
    modelValue(mv) {
      this.CHANGE_BY_PATH(['smallTablet.modelValue', mv])
    },
  },
  computed: {
    ...mapGetters({ byPath: 'byPath' }),
    modelIndex() {
      return this.byPath('smallTablet.modelIndex')
    },
    models() {
      return this.byPath('technology.models')
    },
  },
  methods: {
    ...mapMutations(['CHANGE_BY_PATH']),
    changeModelValue (newVal) {
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
