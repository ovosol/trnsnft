<template>
  <div
    @mouseup="handleMouseUp"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @touchend="handleTouchEnd"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    draggable="false"
    class="vue-product-360 all-screen"
  >
    <template v-if="isLoaded">
      <img
        :style="!remove360?'height: 55%':'height: 100%'"
        draggable="false"
        :src="images[carousel.current]"
        :class="imageClass"

      />
      <img
        v-if="!remove360"
        draggable="false"
        src="~/assets/picture/modelControl/circle.png"
        alt=""
      />
    </template>
    <slot class="vue-product-360__loading" v-else></slot>
  </div>
</template>

<style scoped>
.vue-product-360 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.vue-product-360 > img[draggable="false"]:last-child {
  height: 20%;
}
</style>

<script>
import ImagesLoader from './ImagesLoader'
import {mapMutations} from 'vuex'

export default {
  name: 'vue-product-360',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    remove360: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
    imageClass: {
      type: String,
      default: null,
    },
    speed: {
      type: Number,
      default: 10,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    keepPosition: {
      type: Boolean,
      default: true,
    },

  },
  data: () => ({
    isLoaded: false,
    carousel: {
      current: 0,
      currentPath: null,
    },
    mouse: {
      isMoving: false,
      savedPositionX: 0,
      currentPositionX: 0,
    },
  }),
  beforeMount() {
    this.$emit('loading')
    this.handleLoading().then(() => {
      this.$emit('loaded')
    })
  },
  created() {
    this.carousel.currentPath = this.images[this.carousel.current]
  },
  methods: {
    ...mapMutations(['CHANGE_BY_PATH']),
    handleLoading() {
      return ImagesLoader(this.images).then(() => {
        this.isLoaded = true
      })
    },
    handleMouseUp() {
      this.mouse.isMoving = false
      this.$emit('stopping', {position: this.carousel.current})
    },
    handleMouseLeave() {
      if (this.mouse.isMoving) {
        this.mouse.isMoving = false
        this.$emit('stopping', {position: this.carousel.current})
      }
    },
    handleMouseDown(event) {
      if (!this.disabled) {
        this.mouse.savedPositionX = event.pageX
        this.mouse.isMoving = true
        this.$emit('starting', {position: this.carousel.current})
      }
    },
    handleTouchStart(event) {
      event.preventDefault()
      if (!this.disabled) {
        this.mouse.savedPositionX = event.touches[0].pageX
        this.mouse.isMoving = true
        this.$emit('starting')
      }
    },
    handleTouchEnd() {
      this.mouse.isMoving = false
      this.$emit('stopping')
    },
    handleTouchMove(event) {
      event.preventDefault()
      this.handleMovement(event.touches[0].pageX)
    },
    handleMouseMove(event) {
      this.handleMovement(event.pageX)
    },
    handleMovement(currentPosition) {
      if (this.mouse.isMoving) {
        this.mouse.currentPositionX = currentPosition
        const distance = this.mouse.currentPositionX - this.mouse.savedPositionX
        if (Math.abs(distance) > this.speed) {
          this.mouse.savedPositionX = this.mouse.currentPositionX
          const steps = Math.floor(Math.abs(distance) / this.speed)
          if (
            (distance > 0 && !this.reverse) ||
            (distance < 0 && this.reverse)
          ) {
            this.slideToRight(steps)
          } else {
            this.slideToLeft(steps)
          }
        }
      }
    },
    slideToRight(steps = 1) {
      let newCurrent = this.carousel.current + steps;
      if (newCurrent >= this.images.length) {
        if (this.infinite) {
          newCurrent = newCurrent % this.images.length;
        } else {
          newCurrent = this.images.length - 1;
        }
      }
      this.slideTo(newCurrent);
    },
    slideToLeft(steps = 1) {
      let newCurrent = this.carousel.current - steps;
      if (newCurrent < 0) {
        if (this.infinite) {
          newCurrent = this.images.length - 1;
        } else {
          newCurrent = 0;
        }
      }
      this.slideTo(newCurrent);
    },
    slideTo(position) {
      if (this.images[position]) {
        this.carousel.current = position
        this.carousel.currentPath =
          this.images[position]
      }
    },
  },
  watch: {
    images: {
      handler() {
        this.$emit('refreshing')
        this.handleLoading().then(() => {
          const positionExist = this.images[this.carousel.current]
          if (this.keepPosition && positionExist) {
            this.slideTo(this.carousel.current)
          } else {
            this.slideTo(0)
          }
          this.$emit('refreshed')
        })
      },
    },
    modelValue(newVal) {
      console.log('newVal modelValue');
      this.$nextTick(function () {
        if (this.carousel.current !== this.modelValue) {
          this.carousel.current = newVal;
          this.modelValue = newVal
        }
      })
    },
    'carousel.current'(newVal) {
      console.log(newVal, 'newVal');
      this.$emit('changeCurrent', newVal);
    },
  },
}
</script>
