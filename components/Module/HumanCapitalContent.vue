<template>
  <div>
    <h2 class="subtitle">{{ cContent.subtitle }}</h2>
    <div class="horizontal">
    <slide-show :images="cContent.images" v-if="cContent.images"/>
    <div class="text-wrapper" ref="textWrapper">
      <p ref="text" class="text">{{ text }}</p>
      <div class="arrows">
        <button @click="scrollText('up')" class="arrow">&#8593;</button>
        <button @click="scrollText('down')" class="arrow">&#8595;</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import SlideShow from "@/components/Module/SlideShow.vue";

export default {
  name: "HumanCapitalContent",
  components: {SlideShow},
  data() {
    return {
      text: '',
      isTextOverflowing: false
    }
  },
  props: {
    /** @type {import('vue').PropOptions<HumanCapitalContent>}*/
    content: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    try {
      const response = await fetch(`/humanCapital/texts/${this.cContent.code}.txt`);
      if (response.ok) {
        this.text = await response.text();
      } else {
        console.error(`Error fetching file: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching file: ${error}`);
    }
    this.checkOverflowing();
  },
  computed: {
    /** @returns {HumanCapitalContent} */
    cContent() {
      return this.content
    },

  },
  methods: {
    scrollText(direction) {
      const textElement = this.$refs.text;
      const scrollAmount = 100;

      if (direction === 'up') {
        textElement.scrollTop -= scrollAmount;
      } else {
        textElement.scrollTop += scrollAmount;
      }
    },
    checkOverflowing(){
        if (this.$refs.text &&
          this.$refs.textWrapper) {
          console.log('scrollHeight , offsetHeight, clientHeight')
          console.log(this.$refs.text.scrollHeight , this.$refs.text.offsetHeight, this.$refs.text.clientHeight)
          console.log(this.$refs.textWrapper.scrollHeight , this.$refs.textWrapper.offsetHeight, this.$refs.textWrapper.clientHeight)
        }
        const overflow= (
          this.$refs.text &&
          this.$refs.textWrapper &&
          this.$refs.text.scrollHeight  > this.$refs.text.offsetHeight
        );
        console.log(overflow)
      this.isTextOverflowing = true;

    }
  }
}
</script>

<style scoped>
.subtitle {
  color: #025692;
  width: 97vw;
  text-align: center;
  font-size: 18pt;
  margin-top: 0;
}

.text-wrapper {
  flex-grow: 1;
  margin: 0 42px;
  height: 40vh;
  position: relative;
  overflow: hidden;
}

.horizontal {
  display: flex;
  width: 100%;
  margin: 0 2rem;
}

.text {
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  font-size: 18pt;
  white-space: pre-wrap;
  word-wrap: break-word;
  hyphens: auto;
}

.arrows {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.arrow {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

</style>
