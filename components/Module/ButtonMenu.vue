<template>
  <div :class='classes' @click='onClick' v-html='btn.title ?? btn.name'>
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
    },
    textSize: {
      type: "sm" | "md" | "lg" | null,
      default: null
    },
    interactive: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  methods: {
    onClick() {
      if (!this.interactive) return
      this.$emit("click", this.btn);
    }
  },
  computed: {
    classes() {
      const classes = []
      classes.push("button")
      classes.push(`button-color-${this.color}`)
      classes.push(`button-size-${this.btn.size ?? this.size}`)
      classes.push(`text-size-${this.btn.textSize ?? this.textSize ?? this.size}`)

      if (!this.interactive) {
        classes.push("disabled")
      }

      return classes.join(" ")
    }
  }
}
</script>

<style scoped>
.button-color-blue {
  background-image: url('~/assets/creative/learn_more.png');
  color: white;
}

.button-color-white {
  background-image: url('~/assets/creative/btnwitharrow.png');
  color: #025692;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button {
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

.button-size-sm {
  width: 22vw;
  height: 9vh;
  margin: 3vh 1vw;
}

.text-size-sm {
  font-size: 18px;
}

.button-size-md {
  width: 29vw;
  height: 12vh;
  margin: 3vh 2vw;
}

.text-size-md {
  font-size: 24px;
}

.button-size-lg {
  width: 29vw;
  height: 12vh;
  margin-left: 50px;
  margin-top: 20px;
}

.text-size-lg {
  font-size: 24px;
}

</style>
