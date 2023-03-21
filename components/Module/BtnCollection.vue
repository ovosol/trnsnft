<template>
  <div>
    <div v-show="!noLogo" :class="'flex-center ' + (btnTitle ? 'small-logo' : 'big-logo')">
      <img class="all-size" src="~/assets/picture/logo.png" alt="" />
    </div>
    <h1 v-show="btnTitle" class="title">{{ btnTitle }}</h1>
    <div :class="btnStyle + ' btn-container'">
    <transition-group name="btns" class=" flex-center" style="flex-wrap: wrap;">
      <div class="coolbtn" v-for="btn in btnArray"  :key="btn.name">
        <div :class="btnImg + ' btnsStyle'" @click="changeBtns(btn)">
          <b class="btn-text" v-html="btn.name"></b>
        </div>
      </div>
    </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnImg: String,
    btnArray: Array,
    btnStyle: String,
    btnTitle: String,
    noLogo: Boolean
  },
  methods: {
    changeBtns(btn) {
      this.$emit('changeBtns', btn)
    },
  },
}
</script>

<style >
.btn-container {
  display: flex;
  gap: 1%;
  flex-wrap: wrap;
  z-index: 3;
}
.big-logo {
  margin-bottom: 8vh;
  width: 60vw;
  /* height: 25vh; */
}
.small-logo {
  width: 30vw;
  /* height: 15vh; */
}
.title {
  border-top: 2px #025692 solid;
  color: #025692;
  width: 97vw;
  text-align: center;
  font-size: 36pt;
}
.btnsStyle > .btn-text{
  width: 70%;
  font-size: 15px;
}
.btnsStyle {
  width: 27vw;
  color: #025692;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 6vh 1vw;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.btnwitharrow {
  background-image: url('~/assets/creative/btnwitharrow.png');
}
.rbbtn:hover {
  animation: moveInBottom .5s ease-out;
}
.rbbtn {
  background-image: url('~/assets/creative/rbbtn.png');
  color: white;
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





