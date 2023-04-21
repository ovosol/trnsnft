<template>
  <nuxt />
</template>

<script>
export default {
  methods: {
    refreshData: function () {
        setInterval(async function () {
          await this.$nuxt.refresh()
        }, 200)
      },
  },
    mounted() {
    this.refreshData()
  },
}
</script>

<style>
.nuxt-progress {
  display: none !important;
}
  body {
    margin: 0 !important;
  }
.all-screen {
  height: 100vh;
  width: 100vw;
}
.all-size {
  height: 100%;
  width: 100%;
  /* background-image: url('~/assets/creative/fon.png'); */
}
.flex-center {
  display: flex;
  justify-content: center;
  align-content: center;
}

div.mx-video-player__controls {
  display: none !important;
}
div.mx-video-player__mask-progress.mx-video-player__mask-progress_show {
  display: none !important;
}
div.mx-video-player__controls.mx-video-player__controls_hide {
  display: none !important;
}
div.mx-video-player__mask-progress.mx-video-player__mask-progress_show {
  display: none !important;
}
div.mx-video-player__mask-progress.mx-video-player__mask-progress_show {
  display: none !important;
}

.corner-decoration {
  background-image: url('~/assets/creative/rbcornert.png'), url('~/assets/creative/rbcornerb.png'), url('~/assets/creative/fon.png');
  background-size: 45vw, 45vw, 100vw 100vh ;
  background-position: left top, right bottom, center;
  background-repeat: no-repeat, no-repeat;
}

@font-face {
    font-family: "Open Sans", sans-serif;
    src: local("Open Sans"),     url(~/assets/fonts/open-sans.ttf) format("truetype");}

html {
    font-family: "Open Sans", sans-serif;
}

.half-enter-active,
.half-leave-active,
.half-leave-from-class,
.half-enter-from-class,
.half-enter-active-class,
.half-enter-to-class,
.half-leave-from-class,
.half-leave-active-class,
.half-leave-to-class {
transition: opacity 2s ease;
opacity: 1;
}
.half-enter,
.half-leave-to,
.half-enter-from,
.half-leave-to,
.half-leave-from-class {
opacity: 0;
}

.btns-enter-active {
  animation: bounce-in 0.5s;
}
/* .bounce-leave-active {
  animation: bounce-in 0.5s reverse;
} */
@keyframes bounce-in {
  0% {
    transform: scale(1);
    /* opacity: 0; */
  }
  50% {
    transform: scale(1.1);
    /* opacity: .7; */
  }
  100% {
    /* opacity: 1; */
    transform: scale(1);
  }
}

/* @keyframes opacityGroup {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .7;
  }
  100% {
    opacity: 1;
  }
} */

::-webkit-scrollbar {
  display: none;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
