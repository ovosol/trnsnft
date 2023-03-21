<template>
  <div class="flex-center all-screen corner-decoration">
    <img
      @click="returnToMain()"
      v-show="showControl"
      class="human_capital-back"
      src="~/assets/creative/sidewitharrow.png"
      alt=""
    />
    <ModuleBtnCollection
      v-show="!showControl"
      :btnImg="img"
      :btnArray="smallTablet.main"
      :btnStyle="style"
      @changeBtns="changeModelIndex"
      class="flex-center human_capital-btns"
    ></ModuleBtnCollection>
    <ModuleModelControl v-show="showControl"> </ModuleModelControl>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      img: 'rbbtn',
      array: [],
      style: 'oddBtns',
      showControl: false,
    }
  },
  computed: {
    btnKeys() {
      return Object.keys(this.btns)
    },
    //   btnArray() {
    //     if (this.array.length === 0) {
    //       return this.btns.main
    //     } else {
    //       return this.array
    //     }
    //   },
    ...mapGetters({
      getByPath: 'btns/byPath',
    }),
    smallTablet() {
      return this.getByPath('smallTablet')
    },
  },
  methods: {
    ...mapMutations(['CHANGE_BY_PATH']),
    returnToMain() {
      this.CHANGE_BY_PATH(['smallTablet.modelIndex', null])
      this.showControl = false
    },
    changeModelIndex(btn) {
      this.showControl = true
      this.CHANGE_BY_PATH(['smallTablet.modelIndex', btn.model])
      // this.CHANGE_MODEL_INDEX(btn.model);
      // if (this.btns[btn.link]) {
      //   this.array = this.btns[btn.link]
      //   this.title = btn.name.replaceAll(' <br>', '')
      //   this.style = this.btns[btn.link].length % 2 ? 'odd' : 'even'
      // } else {
      //   this.$router.push({ path: '/human_capital/' + btn.link })
      // }
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
  top: 30vh;
  width: 2.8vw;
  z-index: 10;
}
</style>
