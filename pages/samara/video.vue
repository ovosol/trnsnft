<template>
  <div class="all-screen">
    <ModuleVideo
      v-if="idleState"
      :videoSrc="idleVideo"
      :loop="true"
    ></ModuleVideo>
    <ModuleVideo
      v-else
      @ended="changeSamaraSimple"
      :videoSrc="currentVideo"
    >
    </ModuleVideo>
  </div>
</template>

<script>

import {Laurent} from "@/plugins/laurentControllerLegacy";

export default {
  async asyncData({$axios, $api}) {
    const idleState = await $api.idle.getState('samara')
    console.log('ASYNC idleState', idleState)
    let stage = 0
    let currentVideo = ''
    let idleVideo = ''
    const autoplay = await $api.samara.getAutoPlay()
    if (idleState) {
      idleVideo = await $api.idle.getVideo('samara')
    } else {
      stage = await $api.samara.getStage()
      currentVideo = await $api.samara.getVideo(stage)
    }

    return {currentVideo, stage, idleState, idleVideo, autoplay}
  },
  mounted() {
    console.log('MOUNTED idleState', this.idleState)
    if (!this.idleState) {
      this.startSequence()
    }
  },
  data() {
    return {
      idleState: true,
      stage: 0,
      currentVideo: '',
      idleVideo: '',
      autoplay: '',
      timers: []
    }
  },
  watch: {
    idleState(newVal) {
      console.log('idleState', newVal)
      if (!newVal) {
        this.startSequence()
      } else {
        this.stopSequence()
      }
    }
  },
  methods: {
    async startSequence() {
      const times = [30, 60, 82, 98]
      //const times = [3, 6, 8, 9, 12]
      const actions = [
        () => Laurent.apps.samara.changeAllGroups('1000').then(),
        () => Laurent.apps.samara.changeAllGroups('1100').then(),
        () => Laurent.apps.samara.changeAllGroups('1110').then(),
        () => Laurent.apps.samara.changeAllGroups('1111').then(),
      ]
      const startTime = Date.now()
      console.log('startSequence')

      for (let i = 0; i < times.length; i++) {
        this.timers.push(setTimeout(() => {
          const elapsedTime = Date.now() - startTime
          console.log('Waypoint', i, elapsedTime)
          actions[i]()
        }, times[i] * 1000))
      }
      await Laurent.apps.samara.changeAllGroups('0000')
      // TODO await Laurent.setAllRelays(Laurent.appName.Samara, '0000')
      await Laurent.apps.samara.changeLight(0)
      // TODO await Laurent.sendOut(Laurent.appName.Samara, 5, 0)
    },
    async stopSequence() {
      console.log('stopSequence')
      this.timers.forEach(timer => {
        clearTimeout(timer)
      })
      this.timers = []
      await Laurent.apps.samara.changeAllGroups('0000')
      // TODO await Laurent.setAllRelays(Laurent.appName.Samara, '0000')
      await Laurent.apps.samara.changeLight(1)
      // TODO await Laurent.sendOut(Laurent.appName.Samara, 5, 1)
    },
    async changeSamaraSimple() {
      console.log("ON SAMARA VIDEO END")
      //we have only one video
      //await this.$api.samara.postAutoPlay(false)
      console.log("CHANGING IDLE SAMARA")
      await this.$api.idle.postState('samara', true)
      await Laurent.apps.samara.changeAllGroups('00001xxxxxxx')
      // TODO await Laurent.setAllRelays(Laurent.appName.Samara, '00001xxxxxxx')
    },
    async changeSamara() {
      /*const autoplay = await this.$api.samara.getAutoPlay()
      console.log('autoplay', autoplay)
      if (!autoplay) {
        // go to idle after any video
        await Laurent.setAllRelays(Laurent.appName.Samara, '00001xxxxxxx')
        await this.$api.samara.postAutoPlay(false)
        await this.$api.idle.postState('samara', true)
      } else {
        const currentStage = await this.$api.samara.getStage()
        const nextVideo = currentStage + 1
        if (nextVideo > 4) {
          await this.$api.samara.postAutoPlay(false)
          await this.$api.idle.postState('samara', true)
        } else {
          await this.$api.samara.postStage(nextVideo)
        }
      }*/
    }
  }
}
</script>

<style></style>
