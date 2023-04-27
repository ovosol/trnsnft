<template>
  <div>
    <div v-if='!noLogo && !btnTitle' class='flex-center big-logo'>
      <img class='all-size' src='~/assets/picture/logo.png' alt=''/>
    </div>
    <div v-if='!noLogo && btnTitle'>
      <div class='flex-center small-logo'><img class='all-size' src='~/assets/picture/logo.png' alt=''/></div>
      <h1 v-show='btnTitle' class='title'>
        <hr class='hr-shadow'>
        {{ btnTitle }}
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
        />
      </transition-group>
      <HumanCapitalContent
        v-if='contentPage !== null'
        :contentPage='contentPage'
        @changeBtns='changeBtns'
      />
    </div>
  </div>
</template>

<script>
import HumanCapitalContent from '@/components/Module/HumanCapitalContent.vue'
import ButtonMenu from "@/components/Module/ButtonMenu.vue";

export default {
  components: {ButtonMenu, HumanCapitalContent},
  props: {
    btnArray: Array,
    btnStyle: String,
    btnTitle: String,
    noLogo: Boolean,
    contentPage: {
      type: String || null,
      required: false,
      default: null
    }
  },
  methods: {
    changeBtns(btn) {
      this.$emit('changeBtns', btn)
    }
  },
  computed: {
    btnSize() {
      if (this.btnArray.length <= 2) return 'lg'
      if (this.btnArray.length <= 7) return 'md'
      return 'sm'
    }
  }
}
</script>

<style>
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
  border-bottom: 4px solid #025692;
  box-shadow: 0 4px 9px #333;
}

.title {
  color: #025692;
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





