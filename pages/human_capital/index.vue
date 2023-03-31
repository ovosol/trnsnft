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
      v-if="!isContent"
      :btnImg="img"
      :btnArray="btnArray"
      :btnStyle="style"
      :btnTitle="title"
      @changeBtns="changeBtns"
      class="all-size flex-center human_capital-btns"
    ></ModuleBtnCollection>
    <div
      v-else
    >{{ title }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      img: 'rbbtn',//btnwitharrow
      array: [],
      style: 'oddBtns',
      title: '',
      currentPage: null,
      pagesStack: [],
      isContent: false
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
      byPath: 'btns/byPath'
    }),
    humanCapital() {
      return this.byPath('humanCapital')
    }
  },
  methods: {
    returnToMain() {
      this.currentPage = null
      if (this.pagesStack.length === 0) {
        this.current = null
        this.parent = null
        this.array = this.humanCapital.main;
        this.title = '';
      } else {
        const btn = this.pagesStack.pop()
        this.changeBtns(btn)
      }
    },
    changeBtns(btn) {
      if (this.currentPage) {
        this.pagesStack.push(this.currentPage)
      }
      this.currentPage = btn
      this.title = btn.name.replaceAll(' <br>', '')
      if (this.humanCapital[btn.link]) {
        this.isContent = false
        this.array = this.humanCapital[btn.link]

        this.style = this.humanCapital[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
      } else if (btn.link.includes('_book')) {
        this.$router.push({path: '/human_capital/' + btn.link})
      } else {
        this.isContent = true
        this.array = []
        this.title = btn.name.replaceAll(' <br>', '')
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
