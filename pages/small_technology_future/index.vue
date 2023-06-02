<template>
  <div class="flex-center all-screen corner-decoration">
    <button-back
      @click="returnToMain()"
      v-show="showControl"
    />
    <ModuleBtnCollection
      v-show="!showControl"
      :btnArray="smallTablet.main"
      :btnStyle="style"
      @changeBtns="changeModelIndex"
      class="flex-center"
      logo-style="dark"
    ></ModuleBtnCollection>
    <ModuleModelControl v-if="showControl" :modelIndex="modelIndex"></ModuleModelControl>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ButtonBack from "@/components/Module/ButtonBack.vue";

export default {
  components: {ButtonBack},
  data() {
    return {
      array: [],
      style: 'oddBtns',
      modelIndex: null,
      lastSendTime: 0,
      lastSendIndex: 0,
    }
  },
  computed: {
    btnKeys() {
      return Object.keys(this.btns)
    },
    ...mapGetters({
      getByPath: 'btns/byPath',
    }),
    smallTablet() {
      return this.getByPath('smallTablet')
    },
    showControl() {
      return this.modelIndex !== null
    },
  },
  mounted() {
    setTimeout(this.sendIndex, 100)
  },
  methods: {
    returnToMain() {
      this.modelIndex = null
    },
    async changeModelIndex(btn) {
      this.modelIndex = btn.model
    },
    async sendIndex() {
      if (this.lastSendIndex !== this.modelIndex) {
        await this.$api.technology.postModelIndex(this.modelIndex)
        this.lastSendIndex = this.modelIndex
      }

      setTimeout(this.sendIndex, 100)
    }
  },

}
</script>
