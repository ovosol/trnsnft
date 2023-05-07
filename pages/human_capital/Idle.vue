<template>
  <v-idle
    style="display: none"
    @idle="onIdle"
    :loop="true"
    :duration="duration"
    :events="['mousemove', 'keypress', 'click', 'touchmove', 'touchstart', 'touchmove', 'scroll']"
  />
</template>
<script>
export default {
  name: 'idle',
  emits: ['on-idle'],
  props: {
    duration: {type: Number, default: 600, required: false}
  },
  methods: {
    onIdle() {
      this.$emit('on-idle')
    }
  }
}
</script>
