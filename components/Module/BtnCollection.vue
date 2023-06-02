<template>
  <div class="human_capital-btns">
    <div v-if='!noLogo && !realTitle' class='flex-center big-logo'>
      <img class='all-size' :src='logoUrl' alt=''/>
    </div>
    <div v-if='!noLogo && realTitle'>
      <div class='flex-center small-logo'><img class='all-size' src='~/assets/picture/logo.png' alt=''/></div>
      <h1 v-show='realTitle' class='title'>
        <hr class='hr-shadow'>
        {{ realTitle }}
      </h1>
      <div v-if='contentPage == null' class='custom-margin'></div>
    </div>
    <div :class="btnStyle + ' btn-container'">
      <transition-group name='btns' class='flex-center' style='flex-wrap: wrap;' v-if='contentPage == null'>
        <button-menu
          v-for='btn in btnArray' :key='btn.name'
          :btn="btn"
          color="white"
          @click='changeBtns(btn)'
          :size="btnSize"
          :interactive='canInteract(btn)'
        />
      </transition-group>
      <HumanCapitalContent
        v-if='contentPage !== null'
        :contentPage='contentPage'
        @changeBtns='changeBtns'
        ref="content"
        @changeTitle='contentTitle = $event'
      />
    </div>
  </div>
</template>

<script>
import HumanCapitalContent from '@/components/Module/HumanCapitalContent.vue'
import ButtonMenu from "@/components/Module/ButtonMenu.vue";

export default {
  name: 'BtnCollection',
  components: {ButtonMenu, HumanCapitalContent},
  data() {
    return {
      contentTitle: null
    }
  },
  props: {
    logoStyle: {
      type: 'light' | 'dark',
      default: 'light'
    },
    btnArray: Array,
    btnStyle: String,
    btnTitle: String | null,
    noLogo: Boolean,
    contentPage: {
      type: String || null,
      required: false,
      default: null
    },
    activeButtons: {
      type: Object,
      required: false,
      default: null
    }
  },
  watch: {
    contentPage() {
      if (this.contentPage === null) {
        this.contentTitle = null
      }
    }
  },
  methods: {
    changeBtns(btn) {
      this.$emit('changeBtns', btn)
    },
    /**
     *
     * @param {HumanCapitalButtonExtended} btn
     * @return {boolean}
     */
    canInteract(btn) {

      if (this.activeButtons === null) return true
      if (this.activeButtons[btn.link] === undefined) return true
      return this.activeButtons[btn.link]
    }
  },
  computed: {
    btnSize() {
      if (this.btnArray.length <= 2) return 'lg'
      if (this.btnArray.length <= 7) return 'md'
      return 'sm'
    },
    realTitle() {
      return this.btnTitle ?? this.contentTitle
    },
    logoUrl() {
      if (this.logoStyle === 'light') return require('~/assets/picture/logo.png')
      return require('~/assets/picture/logo_dark.png')
    }
  }
}
</script>

<style>
.human_capital-btns {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
}
.custom-margin {
  margin-bottom: 30px;
}

.btn-container {
  display: flex;
  gap: 1%;
  flex-wrap: wrap;
  z-index: 3;
  margin-bottom: 2vh;
}

.big-logo {
  margin-top: 70px;
  margin-bottom: 5vh;
  width: 1000px;
  height: 170px;
}

.small-logo {
  width: 550px;
  height: 90px;
  margin: auto;
  padding-top: 45px;
}

.hr-shadow {
  margin-bottom: 43px;
  border-bottom: 4px solid #ffffff;
  box-shadow: 0 4px 9px #333;
}

.title {
  color: #ffffff;
  width: 97vw;
  text-align: center;
  vertical-align: bottom;
  display: table-cell;
  font-size: 40pt;
  font-weight: bolder;
  font-family: Century Gothic, serif;
}

.btnwitharrow {
  background-image: url('~/assets/creative/btnwitharrow.png');
}

.rbbtn:hover {
  animation: moveInBottom .5s ease-out;
}

.rbbtn {
  background-image: url('~/assets/creative/btnwitharrow.png');
  color: #025692;
  background-position: center center;
}

.rbsmbtn {
  background-image: url('~/assets/creative/rbsmbtn.svg');
}

.oddBtns {
  justify-content: center;
}

.evenBtns {
  justify-content: space-around;
}


@keyframes moveInBottom {
  0% {
    /* opacity: 0; */
    background-size: 100% 100%;
  }

  50% {
    background-size: 103% 103%;
    /* opacity: 1; */
    /* transform: scaleX(1.4) scaleY(1.6); */
  }

  100% {
    background-size: 100% 100%;
    /* opacity: 0; */
    /* transform: scaleX(1) scaleY(1); */
  }
}
</style>





