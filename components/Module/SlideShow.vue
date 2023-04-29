<template>
  <div class="slideshow">
    <div class="image-container">
      <img :src="images[currentIndex].src" alt="Slideshow Image" class="slide-image" />
      <div class="overlay" v-if="showControls">
        <button @click="previousImage" class="arrow left-arrow">&#8592;</button>
        <span class="image-count">{{ currentIndex + 1 }}/{{ images.length }}</span>
        <button @click="nextImage" class="arrow right-arrow">&#8594;</button>
      </div>
      <div class="caption" v-if="showCaption" v-html='images[0].title'>
<!--        {{ images[0].title}}-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideShow",
  props: {
    /** @type {Array<HumanCapitalImage>}*/
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    previousImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  computed: {
    showControls() {
      return this.images.length > 1;
    },
    showCaption() {
      return !this.showControls && this.images[0].title;
    }
  }
}
</script>

<style scoped>
.slideshow {
  width: 470px;
  height: 320px;
  position: relative;
  margin-top: 15px;
  margin-left: 10px
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.caption{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #175ba0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  color: #ffffff;
  text-align: center;
}

.arrow,
.image-count {
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.left-arrow,
.right-arrow {
  background-color: transparent;
  border: none;
  padding: 0.5rem;
}

.image-count {
  margin-bottom: 0.5rem;
}
</style>
