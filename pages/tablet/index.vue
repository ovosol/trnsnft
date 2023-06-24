<template>
  <div class="">
    <div
      v-show="pass !== truePass"
      style="align-items: center"
      class="flex-center all-screen corner-decoration"
    >
      <div class="field-container">
        <input
          class="field-input"
          id="pwdInput"
          name="inputName"
          v-model.lazy="pass"
          type="text"
          placeholder=" "
        />
        <label id="pwdInputLabel" class="field-placeholder" for="inputName">Пароль</label>
        <!-- тоже на скорую руку, потом может допилю получше, но я правильно поянл тему с плашкой? -->
        <ModuleBtnCollection
          :btnArray="[{ name: 'Проверить' }]"
          :btnStyle="style"
          :noLogo="true"
          style="margin-top: 60px"
          class="all-size flex-center "
        ></ModuleBtnCollection>
        <h1 v-show="pass !== undefined" style="color: red">Не правильно</h1>
      </div>
    </div>
    <div
      v-show="pass === truePass"
      class="flex-center all-screen corner-decoration"
    >
      <!-- {{ btnKeys }} -->
      <br/>
      <!-- {{ title }} -->
      <br/>
      <button-back
        @click="returnToMain()"
        v-show="title"
      />
      <ModuleBtnCollection
        :noLogo="false"
        :btnArray="btnArray"
        :btnStyle="style"
        :btnTitle="title"
        :active-buttons="activeButtons"
        @changeBtns="changeBtns"
        class="all-size flex-center"
        ref="btns"
      ></ModuleBtnCollection>
    </div>
  </div>
</template>

<script>
import {Laurent} from "@/plugins/laurentControllerLegacy";
import ButtonBack from "@/components/Module/ButtonBack.vue";
import {getLightInfo, lights} from "@/components/lights";

export default {
  components: {ButtonBack},
  data() {
    return {
      array: [],
      style: 'oddBtns',
      title: '',
      myBtn: '',
      pass: undefined,
      truePass: 'asd',
      activeButtons: {}
    }
  },
  computed: {
    btnArray() {
      //return only visible buttons
      return (this.array.length === 0 ? this.tablet.main : this.array)
    },
    tablet() {
      return this.$store.state.btns.tablet
    },
  },
  methods: {
    returnToMain() {
      this.array = this.tablet.main
      this.title = ''
    },
    /**
     *
     * @return {Promise<void>}
     */
    async updateButtons() {
      switch (this.myBtn) {
        case "samara": {
          const idleState = await this.$api.idle.getState('samara')

          for (let stage of ['start', '1', '2', '3', '4', 'light']) {
            this.activeButtons[`samaraButtons-${stage}`] = idleState
          }

          this.activeButtons['samaraButtons-idle'] = !idleState
          this.$refs.btns.$forceUpdate()
          break
        }
        case "timeline": {
          const idleState = await this.$api.idle.getState('timeline')
          // TODO add timeline idle
          break
        }
      }
    },
    async changeBtns(btn) {
      const startsWith = (str, prefix) => {
        if (str.slice(0, prefix.length) === prefix)
          return str
      }
      if (this.tablet[btn.link]) {
        console.log(btn.link)
        this.array = this.tablet[btn.link]
        if (this.array && this.array.length > 0)
          this.array.forEach(btn => {
            if (!btn.name && startsWith(btn.link, 'light')) {
              const light = getLightInfo(btn.link)
              btn.light = light
              let name = light.name
              if (typeof light.mode !== 'undefined') {
                name += ' <br> ' + (light.mode ? '💡' : '⚫')
              }
              btn.name = name
            }
          })
        this.title = btn.name.replaceAll(' <br>', '')
        this.style = this.tablet[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
        this.myBtn = btn.link
      } else {
        switch (btn.link) {
          case startsWith(btn.link, 'light-'):
            const light = getLightInfo(btn.link)
            if (!Object.values(Laurent.appName).includes(light.app))
              break

            if (light.relays) {
              if (light.relays.length === 1) {
                await Laurent.sendRelay(light.app, light.relays[0], 2)
              } else {
                const maskLength = Laurent.thingsPerApp[light.app].relays
                const mode = light.mode
                // get the array of relays. create a binary mask with length of maskLength, fill with 0s and for each relay in the array set the corresponding bit to 1
                const mask = light.relays.reduce((acc, relay) => {
                  acc[relay - 1] = 1;
                  return acc
                }, new Array(maskLength).fill("x"))
                // convert mask to string
                let maskStr = mask.join('')
                console.log("mode: " + mode)
                if (!mode) maskStr = maskStr.replaceAll('1', '0')

                await Laurent.setAllRelays(light.app, maskStr)
              }
            }

            if (light.outs) {
              if (light.outs.length === 1) {
                await Laurent.sendOut(light.app, light.outs[0], 2)
              } else {
                const maskLength = Laurent.thingsPerApp[light.app].outs
                const mode = light.mode;
                // get the array of outs. create a binary mask with length of maskLength, fill with 0s and for each out in the array set the corresponding bit to 1
                const mask = light.outs.reduce((acc, out) => {
                  acc[out - 1] = 1
                  return acc
                }, new Array(maskLength).fill("x"))
                // convert mask to string
                let maskStr = mask.join('')
                console.log("mode: " + mode)
                if (!mode) maskStr = maskStr.replaceAll('1', '0')
                await Laurent.setAllOuts(light.app, maskStr)
              }
            }
            break
          case startsWith(btn.link, 'samaraButtons'):
            const stage = btn.link.split('-')[1]
            const samaraIdle = await this.$api.idle.getState('samara')
            if (stage === 'start') {
              await this.$api.samara.postStage(1)
              await this.$api.idle.postState('samara', false)
            } else if (stage === 'idle') {
              await this.$api.idle.postState('samara', true)
              await Laurent.apps.samara.changeLight(1)
              // TODO await Laurent.sendOut(Laurent.appName.Samara, 5, 1)
            } else if (stage === 'light') {
              if (samaraIdle)
                await Laurent.apps.samara.changeLight(2)
              // TODO await Laurent.sendOut(Laurent.appName.Samara, 5, 2)
            } else {
              if (samaraIdle) {
                await Laurent.apps.samara.changeGroup(stage, 2)
                // TODO await Laurent.sendRelay(Laurent.appName.Samara, stage, 2)
              }
            }
            break
          case 'changeTimelineIdle':
            await this.$api.idle.postState('timeline', true)
            await Laurent.setOneRelayOn(Laurent.appName.Timeline, 0)
            break
          case 'changeYear':
            if (btn.index < 0) {
              await Laurent.setAllRelays(Laurent.appName.Timeline, '1'.repeat(12)) //TODO
            } else {
              await Laurent.setOneRelayOn(Laurent.appName.Timeline, btn.index + 1)
            }
            //await this.$laurent.setOneRelayOn(this.$laurent.appName.Timeline, btn.index + 1)
            console.log({year: btn.name})
            await this.$api.idle.postState('timeline', false)
            await this.$api.timeline.postYear(btn.name) //TODO name is not suitable
            break
          case startsWith(btn.link, 'technology-'):
            const btnName = btn.link.split('-')[1]
            //const idleState = await this.$api.idle.getState('technology')
            if (btnName === 'idle') {
              await this.$api.idle.postState('technology', true)
              //await this.$api.technology.postLaurentPoint('past')
            } else {
              await this.$api.technology.postStage(btnName, true)
              await this.$api.idle.postState('technology', false)
            }
            break
          case startsWith(btn.link, 'demo_tech_stage-'):
            const stageName = btn.link.split('-')[1]
            if (stageName === 'idle')
              await this.$api.idle.postState('technology', true)
            else {
              await this.$api.idle.postState('technology', false)
              await this.$api.technology.postStage(stageName, false)
            }
            break
          case startsWith(btn.link, 'demo_tech_point-'):
            const pointName = btn.link.split('-')[1]
            await this.$api.technology.postLaurentPoint(pointName)
            //await setMotor(pointName)
            break
          case 'colba-all':
            const current = await this.$api.flows.getFlows()
            const needToTurnOn = Number.parseInt(current) !== 0

            const value = (needToTurnOn ? '0' : '1').repeat(7)

            await this.$api.flows.postAllFlows(value)

            const mask = value + 'xxxxx'
            Laurent.sendOutAll(Laurent.appName.Flows, mask).then()
            break
          case startsWith(btn.link, 'colba'):
            const stream = Number.parseInt(btn.link.split('-')[1])
            console.log(stream)
            let stream7 = (await this.$api.flows.getFlows()).split('')

            const currentColbaState = Number.parseInt(stream7[6 - stream])
            await Laurent.sendOut(Laurent.appName.Flows, stream + 1, 1 - currentColbaState)

            await this.$api.flows.postFlow(stream + 1, currentColbaState === 0)
            break

          default:
            console.warn("Unhandled button", btn.link)
            break
        }
      }
    },
  },
  watch: {
    pass() {
      sessionStorage.setItem('tablet_pass', this.pass)
    },
  },
  mounted() {
    this.pass = sessionStorage.getItem('tablet_pass') || undefined
    setInterval(this.updateButtons, 300)
  },
}
</script>

<style>
#pwdInput {
  z-index: 100;
  position: relative;
}

#pwdInputLabel {
  z-index: 101;
}

.field-container {
  position: relative;
  border: 1px solid #bcbaba;
  height: 50px;
  width: 320px;
  padding-left: 12px;
}

.field-placeholder {
  position: absolute;
  top: 50%;
  color: #adadad;
  pointer-events: none;
//transition: all 0.14s ease-in-out; font-size: 18px; transform: translate('5px-50%');
}

input[type='text'].field-input {
  color: #000;
  border: none;
  padding: 5px;
  margin-top: 20px;
  font-size: 16px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  bottom: 0px;
}

input[type='text'].field-input:focus {
  outline: none;
}

input[type='text'].field-input.c-fix,
input[type='text'].field-input:focus,
input[type='text'].field-input:not(:placeholder-shown) {
  border-color: transparent;
}

input[type='text'].field-input.c-fix ~ label,
input[type='text'].field-input:focus ~ label,
input[type='text'].field-input:not(:placeholder-shown) ~ label {
  color: #646669;
  font-size: 11px;
  top: calc(30% - 0.5rem);
  transform: translate('5px0%');
}

input[type='text'].field-input::-webkit-input-placeholder {
  color: transparent;
}

input[type='text'].field-input::-moz-placeholder {
  color: transparent;
}

input[type='text'].field-input:-ms-input-placeholder {
  color: transparent;
}
</style>
