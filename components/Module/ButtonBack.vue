<template>
  <img
    @click="click"
    class="human_capital-back"
    src="~assets/creative/sidewitharrow.png"
    alt=""
  />
</template>

<script>
export default {
  name: "ButtonBack",
  methods: {
    click() {
      this.$emit("click");
    }
  }
}
</script>

<style scoped>
.human_capital-back {
  position: absolute;
  left: 0;
  top: 325px;
  height: 225px;
  z-index: 10;
}
</style>
