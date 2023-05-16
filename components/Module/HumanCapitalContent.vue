<template>
  <div v-if='contentPage && content'>
    <h2 class='subtitle'>{{ content.subtitle }}</h2>
    <div class='horizontal'>
      <slide-show :images='content.images' v-if='content.images' />
      <div :class='"text-wrapper " + (content.images? "text-slide-show":"text-plain") ' ref='textWrapper'>
        <p ref='text' class='text'>{{ text }}</p>
      </div>
      <div>
        <button @click="scrollText('up')" class='arrow-up'>
          <img alt src='~assets/creative/arrow_up.png' width='40' height='35'>
        </button>
        <button @click="scrollText('down')" class='arrow-down'>
          <img alt src='~assets/creative/arrow_down.png' width='40' height='35'>
        </button>
      </div>
    </div>
    <div v-if='content.buttons'>
      <button-menu
        v-for='(btn, index) in content.buttons'
        :key='index'
        :btn='btn'
        color='blue'
        size='sm'
        style='margin-left: 175px'
        @click='changeBtns(btn)'
      ></button-menu>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {Object} HumanCapitalContent
 * @property {string} [title]
 * @property {string | null} subtitle
 * @property {HumanCapitalImage[]} [images]
 * @property {string} [video]
 * @property {HumanCapitalButton[]} [buttons]
 */

/**
 * @typedef {Object} HumanCapitalButton
 * @property {string} name
 * @property {string} link
 * @property {string} [title]
 * @property {"sm" | "md" | "lg"} [size]
 * @property {"sm" | "md" | "lg"} [textSize]
 */

/**
 * @typedef {HumanCapitalButton} HumanCapitalButtonExtended

 */

/**
 * @typedef {Object} HumanCapitalImage
 * @property {string} src
 * @property {string} [title]
 */

import SlideShow from '@/components/Module/SlideShow.vue'
import ButtonMenu from '@/components/Module/ButtonMenu.vue'

export default {
  name: 'HumanCapitalContent',
  components: { ButtonMenu, SlideShow },
  data() {
    return {
      text: '',
      isTextOverflowing: false,
      /** @type {null | HumanCapitalContent}*/
      content: null
    }
  },
  props: {
    contentPage: {
      type: String || null,
      required: false,
      default: null
    }
  },
  async mounted() {
    await this.fetchText()
    await this.fetchContent()
    this.checkOverflowing()
  },
  methods: {
    changeBtns(btn) {
      console.log('human capital changeBtns', btn)
      this.$emit('changeBtns', btn)
    },
    async fetchText() {
      try {
        const response = await fetch(`/humanCapital/texts/${this.contentPage}.txt`)
        if (response.ok) {
          this.text = await response.text()
        } else {
          this.text = `Страница ${this.contentPage} не найдена`
        }
      } catch (error) {
        this.text = `Страница ${this.contentPage} не найдена (e)`
      }
    },
    async fetchContent() {
      try {
        const content = await fetch(`/humanCapital/texts/${this.contentPage}.json`)
        if (content.ok) {
          this.content = await content.json()
        } else {
          this.content = {subtitle: ''}
        }
      } catch (e) {
        this.content = {subtitle: `ERROR ${e}`}
      }

      this.$emit('changeTitle', this.content.title)
    },
    scrollText(direction) {
      const textElement = this.$refs.text
      const scrollAmount = 100

      if (direction === 'up') {
        textElement.scrollTop -= scrollAmount
      } else {
        textElement.scrollTop += scrollAmount
      }
    },
    checkOverflowing() {
      if (this.$refs.text &&
        this.$refs.textWrapper) {
        console.log('scrollHeight , offsetHeight, clientHeight')
        console.log(this.$refs.text.scrollHeight, this.$refs.text.offsetHeight, this.$refs.text.clientHeight)
        console.log(this.$refs.textWrapper.scrollHeight, this.$refs.textWrapper.offsetHeight, this.$refs.textWrapper.clientHeight)
      }
      const overflow = (
        this.$refs.text &&
        this.$refs.textWrapper &&
        this.$refs.text.scrollHeight > this.$refs.text.offsetHeight
      )
      console.log(overflow)
      this.isTextOverflowing = true

    }
  }
}
</script>

<style scoped>
.navy-blue-button {
  background-image: url('~/assets/creative/learn_more.png');
  color: white;
  background-position: center center;
}

.subtitle {
  color: #025692;
  width: 97vw;
  text-align: center;
  font-size: 18pt;
  font-family: Century Gothic, sans-serif;
  margin-top: 10px;
}

.text-plain {
  margin-top: 10px;
  margin-left: 150px;
  margin-right: 150px;
}

.text-slide-show {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 100px;
}

.text-wrapper {
  flex-grow: 1;
  height: 330px;
  position: relative;
  overflow: hidden;
}

.horizontal {
  display: flex;
  width: 100%;
  margin: 0 2rem;
}

.text {
  text-align: justify;
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
  width: 95%;
  font-size: 12pt;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.arrow-up {
  margin-top: 40px;
  right: 40px;
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
}

.arrow-down {
  margin-top: 260px;
  right: 40px;
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
}

</style>
