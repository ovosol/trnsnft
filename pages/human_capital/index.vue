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
      :content="content"
      @changeBtns="changeBtns"
      class="all-size flex-center human_capital-btns"
    ></ModuleBtnCollection>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getHumanCapitalContent} from "@/components/humanCapitalContent";
import HumanCapitalContent from "@/components/Module/HumanCapitalContent.vue";

export default {
  components: {HumanCapitalContent},
  data() {
    return {
      img: 'rbbtn',//btnwitharrow
      array: [],
      style: 'oddBtns',
      title: '',
      currentPage: null,
      pagesStack: [],
      content: null
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

      if (this.humanCapital[btn.link]) {
        // first level pages
        this.content = null
        this.title = btn.name.replaceAll(' <br>', '')
        this.array = this.humanCapital[btn.link]
        this.style = this.humanCapital[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
      } else if (btn.link.includes('_book')) {
        // honor or veteran book
        this.$router.push({path: '/human_capital/' + btn.link})
      } else {
        // any content page
        console.log('content page', btn.link)
        this.content = getHumanCapitalContent(btn.link)
        this.array = []
        //this.title = btn.name.replaceAll(' <br>', '')
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
  top: 335px;
  width: 30px;
  height: 235px;
  z-index: 10;
}
</style>
