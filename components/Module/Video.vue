<template>
  <div>
    <video
      ref="videoStandard"
      preload="auto"
      :src="videoSrc"
      :autoPlay="true"
      :muted="mute"
      :loop="loop"
    >

    </video>
      <video-player
        v-if="false"
        ref="videoPlay"
        :src="videoSrc"
        :autoPlay="true"
        :mute="mute"
        :loop="loop"
        :width="'100%'"
        :height="'100%'"
        @play="onPlay"
        @pause="onPause"
        @ended="onFinish"
        @seeked="onSeeked"
        @timeUpdate="onTimeUpdate"
        @rateChange="onRateChange"
        @volumeChange="onVolumeChange"
        @progressChange="onProgressChange"
        @downloadResource="onDownloadResource"
        @enterFullscreen="onEnterFullscreen"
        @cancelFullscreen="onCancelFullscreen"
        @enterWebFullscreen="onEnterWebFullscreen"
        @cancelWebFullscreen="onCancelWebFullscreen"
      ></video-player>
  </div>
</template>

<script>
import VideoPlayer from 'vue-video-player-mx'

export default {
  data: () => ({}),
  components: {
    VideoPlayer,
  },
  props: {
    videoSrc: String,
    loop: Boolean,
    mute: {type: Boolean, default: false, required: false}
  },
  mounted() {
    //console.log(this.$refs.videoPlay.$el, 'this.$refs');
    this.$nextTick(() => {
      const player = this.$refs.videoStandard
      player.addEventListener('play', this.onPlay)
      player.addEventListener('pause', this.onPause)
      player.addEventListener('ended', this.onFinish)
      player.addEventListener('seeked', this.onSeeked)
      player.addEventListener('timeupdate', this.onTimeUpdate)
    });
  },
  methods: {
    onPlay(info) {
      console.log('onPlay', info)
    },
    onPause(info) {
      console.log('onPause', info)
    },
    onFinish() {
      console.log('onFinish')
      this.$emit('ended')
    },
    onRateChange(rate) {
      console.log('onRateChange', rate)
    },
    onVolumeChange(volume) {
      console.log('onVolumeChange', volume)
    },
    onProgressChange(progress) {
      console.log('onProgressChange', progress)
    },
    onEnterFullscreen() {
      console.log('onEnterFullscreen')
    },
    onCancelFullscreen() {
      console.log('onCancelFullscreen')
    },
    onEnterWebFullscreen() {
      console.log('onEnterWebFullscreen')
    },
    onCancelWebFullscreen() {
      console.log('onCancelWebFullscreen')
    },
    onSeeked(info) {
      console.log('onSeeked', info, info.target.currentTime)
    },
    onDownloadResource() {
      console.log('onDownloadResource')
    },
    onTimeUpdate(info) {
      //console.log('onTimeUpdate', info)
      const currentTime = info.target.currentTime
      const duration = info.target.duration
      console.log('onTimeUpdate', `${currentTime}/${duration}: ${(100 * currentTime / duration).toFixed(2)}%`)
    },
  },
}
</script>

<style>
.mx-video-player__controls.mx-video-player__controls_hide {
  height: 50px;
}

.mx-video-player__core {
  position: relative !important;
}

.mx-slider {
  border-radius: 1px;
  box-sizing: border-box;
  height: 12px;
  padding: 4px 5px;
  transition: all 0.2s;
  width: 100%;
}

.mx-slider-hover {
  height: 6px;
}

.mx-slider-railway {
  background-color: rgb(115, 133, 159, 0.3);
  height: 100%;
  position: relative;
}

.mx-slider-railway:hover {
  cursor: pointer;
}

.mx-slider-railway__cache,
.mx-slider-railway__current {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 0;
}

.mx-slider-railway__current {
  background-color: #2483d5;
  z-index: 2;
}

.mx-slider-railway__cache {
  background-color: rgb(115, 133, 159, 0.5);
  z-index: 1;
}

.mx-slider-railway__popover {
  background-color: rgb(43, 51, 63, 0.7);
  border-radius: 2px;
  bottom: 20px;
  color: #fff;
  max-width: 50%;
  padding: 5px 8px;
  position: absolute;
  transform: translateX(-50%);
}

.mx-slider-railway__block {
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  height: 10px;
  left: 0;
  position: absolute;
  top: calc(-5px - -50%);
  transform: translateX(-5px);
  width: 10px;
  z-index: 3;
}

.mx-video-player__time {
  align-items: center;
  color: #ddd;
  display: flex;
  font-size: 14px;
  letter-spacing: 1px;
}

.mx-video-player__time:hover button {
  color: #fff;
}

.web-fullscreen {
  bottom: 0;
  height: 100vh !important;
  left: 0;
  margin: auto;
  position: fixed !important;
  right: 0;
  top: 0;
  width: 100vw !important;
  z-index: 999999;
}

.mx-video-player__controls {
  background-color: rgb(43, 51, 63, 0.4);
  bottom: 0;
  box-sizing: border-box;
  opacity: 0;
  padding: 4px;
  position: absolute;
  width: 100%;
  z-index: 217483647;
}

.mx-video-player__controls_show {
  animation: showControls 0.5s forwards;
}

.mx-video-player__controls_hide {
  animation: hideControls 0.5s forwards;
}

.mx-video-player__controls-bottom {
  display: flex;
  height: 30px;
  justify-content: space-between;
  padding: 0 10px;
}

.mx-video-player__controls-bottom--left,
.mx-video-player__controls-bottom--right {
  display: flex;
}

.mx-video-player__progress {
  padding: 0 6px;
}

@keyframes showControls {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hideControls {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.mx-video-player__shotScreen:hover {
  margin-top: -50px;
  padding-top: 50px;
}

.mx-video-player__shotScreen:hover .mx-video-player__shotScreen-menu {
  display: block;
}

.mx-video-player__shotScreen-menu {
  display: none;
  padding: 10px;
  position: absolute;
}

.mx-video-player__volume {
  align-items: center;
  display: flex;
}

.mx-video-player__volume-slider {
  overflow: hidden;
  width: 0;
}

.mx-video-player__volume-slider--show {
  animation: showVolumeSlider 0.1s forwards;
}

.mx-video-player__volume-slider--hide {
  animation: hideVolumeSlider 0.1s forwards;
}

@keyframes showVolumeSlider {
  0% {
    width: 0;
  }
  to {
    width: 100px;
  }
}

@keyframes hideVolumeSlider {
  0% {
    width: 100px;
  }
  to {
    width: 0;
  }
}

.mx-video-player__speed:hover {
  margin-top: -50px;
  padding-top: 50px;
}

.mx-video-player__speed:hover .mx-video-player__speed-options {
  display: block;
}

.mx-video-player__speed-options {
  display: none;
  width: 100%;
}

.mx-video-player__speed .mx-video-player__speed-options-item {
  padding: 6px 0;
  text-align: center;
  width: 100%;
}

.mx-video-player__speed .mx-video-player__speed-options-item:hover {
  background-color: rgb(115, 133, 159, 0.5);
}

.mx-video-player__speed-options
.mx-video-player__speed-item.mx-video-player__speed-item_active {
  background-color: #fff;
  color: #000;
}

.mx-video-player__webfullscreen:hover .mx-video-player__webfullscreen-menu {
  display: block;
}

.mx-video-player__webfullscreen-menu {
  display: none;
  padding: 4px 6px;
}

.mx-video-player__fullscreen:hover .mx-video-player__fullscreen-menu {
  display: block;
}

.mx-video-player__fullscreen-menu {
  display: none;
  padding: 4px 6px;
}

.mx-video-player__mask-progress {
  bottom: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: 10000;
}

.mx-video-player__mask-progress_show {
  animation: showMaskProgress 0.5s forwards;
}

.mx-video-player__mask-progress_hide {
  animation: hideMaskProgress 0.5s forwards;
}

@keyframes showMaskProgress {
  0% {
    height: 0;
    opacity: 0;
  }
  to {
    height: 4px;
    opacity: 1;
  }
}

@keyframes hideMaskProgress {
  0% {
    height: 4px;
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

.mx-video-player .mx-video-player__btn,
.mx-video-player button {
  background-color: unset;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  outline: 0;
  padding: 0;
}

.mx-video-player button {
  margin: 0;
}

.mx-video-player .mx-video-player__btn-wrapper {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
  position: relative;
  width: fit-content;
  z-index: 100;
}

.mx-video-player .mx-video-player__btn {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 0 10px;
  text-align: center;
}

.mx-video-player .mx-video-player__btn-menu {
  background-color: rgb(43, 51, 63, 0.7);
  bottom: 0;
  color: #fff;
  left: 50%;
  position: absolute;
  transform: translate3d(-50%, -50px, 0);
  white-space: nowrap;
  z-index: 999;
}

.mx-video-player {
  user-select: none;
}

.mx-video-player li,
.mx-video-player ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mx-video-player__wrapper {
  background-color: #000;
  height: 100%;
  position: relative;
  width: 100%;
}

.mx-video-player__core {
  height: 100%;
  position: absolute;
  width: 100%;
}

.mx-video-player__state {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.mx-video-player__state-button {
  color: #fff;
  font-size: 40px;
  padding: 0;
}
</style>
