<template>
  <div class="flex-center all-screen corner-decoration">
    <img
    @click="returnToMain()"
      v-show="title"
      class="human_capital-back"
      src="~/assets/creative/sidewitharrow.png"
      alt=""
    />

      <ModuleBtnCollection
      :btnImg="img"
      :btnArray="btnArray"
      :btnStyle="style"
      :btnTitle="title"
      @changeBtns="changeBtns"
      class="all-size flex-center human_capital-btns"
      ></ModuleBtnCollection>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      img: 'rbbtn',//btnwitharrow
      array: [],
      style: 'oddBtns',
      title: '',
    }
  },
  computed: {
    btnKeys() {
      return Object.keys(this.humanCapital)
    },
    btnArray() {
      if (this.array.length === 0) {
        return this.humanCapital.main
      } else {
        return this.array
      }
    },
    ...mapGetters({
      byPath : 'btns/byPath'
    }),
    humanCapital() {
      return this.byPath('humanCapital')
    }
  },
  methods: {
    returnToMain() {
      this.array = this.humanCapital.main;
      this.title = '';
    },
    changeBtns(btn) {
      if (this.humanCapital[btn.link]) {
        this.array = this.humanCapital[btn.link]
        this.title = btn.name.replaceAll(' <br>', '')
        this.style = this.humanCapital[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
      } else {
        this.$router.push({ path: '/human_capital/' + btn.link })
      }
    },
  },
}
</script>

<style>
.human_capital-btns {
  flex-direction: column;
  align-items: center;
}
.human_capital-back {
  position: absolute;
  left: 0;
  top: 40vh;
  width: 2vw;
  z-index: 10;
}
</style>
