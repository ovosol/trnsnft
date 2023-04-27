<template>
  <div :class='classes' @click='onClick' v-html='btn.name'>

  </div>
</template>

<script>
export default {
  name: "ButtonMenu",
  props: {
    /**
     * @type {HumanCapitalButton} MenuButton
     */
    btn: {
      type: Object,
      required: true
    },
    color: {
      type: "blue" | "white",
      default: "blue"
    },
    size: {
      type: "sm" | "md" | "lg",
      default: "md"
    }
  },
  methods: {
    onClick() {
      this.$emit("click", this.btn);
    }
  },
  computed: {
    classes() {
      const classes = []
      classes.push("buttonStyle")
      switch (this.color)
      {
        case "blue":
          classes.push("blue-button")
          break
        case "white":
          classes.push("white-button")
          break
      }
      switch (this.size)
      {
        case "sm":
          classes.push("buttonStyle-sm")
          break
        case "md":
          classes.push("buttonStyle-md")
          break
        case "lg":
          classes.push("buttonStyle-lg")
          break
      }

      return classes.join(" ")
    }
  }
}
</script>

<style scoped>
.blue-button{
  background-image: url('~/assets/creative/learn_more.png');
  color: white;
}

.white-button{
  background-image: url('~/assets/creative/btnwitharrow.png');
  color: #025692;
}
.buttonStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  font-weight: bolder;
  font-family: Century Gothic, serif;
}

.buttonStyle-sm {
  width: 22vw;
  height: 9vh;
  margin: 3vh 1vw;
  font-size: 18px;
}

.buttonStyle-lg {
  width: 29vw;
  height: 12vh;
  font-size: 24px;
  margin: 100px 2vw 3vh;
}

.buttonStyle-md {
  width: 29vw;
  height: 12vh;
  margin: 3vh 2vw;
  font-size: 24px;
}

</style>
