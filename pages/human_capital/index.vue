<template>
  <div class="flex-center all-screen corner-decoration">
    <button-back
      @click="returnToMain()"
      v-show="title || contentPage"
    />

    <ModuleBtnCollection
      :btnArray="btnArray"
      :btnStyle="style"
      :btnTitle="title"
      :contentPage="contentPage"
      @changeBtns="changeBtns"
      class="all-size flex-center human_capital-btns"
    ></ModuleBtnCollection>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import HumanCapitalContent from "@/components/Module/HumanCapitalContent.vue";
import ButtonBack from "@/components/Module/ButtonBack.vue";

export default {
  components: {ButtonBack, HumanCapitalContent},
  data() {
    return {
      array: [],
      style: 'oddBtns',
      title: '',
      currentPage: null,
      pagesStack: [],
      contentPage: null
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
        this.contentPage = null
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
        this.contentPage = null
        this.title = btn.name.replaceAll(' <br>', '')
        this.array = this.humanCapital[btn.link]
        this.style = this.humanCapital[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
      } else if (btn.link.includes('_book')) {
        // honor or veteran book
        this.$router.push({path: '/human_capital/' + btn.link})
      } else {
        // any content page
        console.log('content page', btn.link)
        this.contentPage = btn.link
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
  justify-content: flex-start;
  margin-top: 40px;
}
</style>
