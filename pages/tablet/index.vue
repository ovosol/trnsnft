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
          :btnImg="img"
          :btnArray="[{ name: 'Проверить' }]"
          :btnStyle="style"
          :noLogo="true"
          style="margin-top: 60px"
          class="all-size flex-center human_capital-btns"
        ></ModuleBtnCollection>
        <h1 v-show="pass !== undefined" style="color: red">Не правильно</h1>
      </div>
    </div>
    <div
      v-show="pass === truePass"
      class="flex-center all-screen corner-decoration"
    >
      <!-- {{ btnKeys }} -->
      <br />
      <!-- {{ title }} -->
      <br />
      <img
        @click="returnToMain()"
        v-show="title"
        class="human_capital-back"
        src="~/assets/creative/sidewitharrow.png"
        alt=""
      />
      <ModuleBtnCollection
        :noLogo="false"
        :btnImg="img"
        :btnArray="btnArray"
        :btnStyle="style"
        :btnTitle="title"
        @changeBtns="changeBtns"
        class="all-size flex-center human_capital-btns"
      ></ModuleBtnCollection>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {Laurent} from "@/plugins/laurentControllerLegacy";

export default {
  data() {
    return {
      img: 'rbbtn', //btnwitharrow
      array: [],
      style: 'oddBtns',
      title: '',
      myBtn: '',
      pass: undefined,
      truePass: 'asd',
    }
  },
  computed: {
    // btnKeys() {
    //   return Object.keys(this.tablet)
    // },
    btnArray() {
      //return only visible buttons
      return (this.array.length === 0 ? this.tablet.main : this.array).filter(btn => btn.hidden !== true)
    },
    ...mapGetters({
      getByPath: 'btns/byPath',
    }),
    tablet() {
      return this.getByPath('tablet')
    },
  },
  methods: {
    ...mapMutations([
      'CHANGE_SAMARA_VIDEO',
      'CHANGE_TIMELINE_VIDEO',
      'CHANGE_BY_PATH',
    ]),
    returnToMain() {
      this.array = this.tablet.main
      this.title = ''
    },
    async changeBtns(btn) {
      if (this.tablet[btn.link]) {
        console.log(btn.link)
        this.array = this.tablet[btn.link]
        this.title = btn.name.replaceAll(' <br>', '')
        this.style = this.tablet[btn.link].length % 2 ? 'oddBtns' : 'evenBtns'
        this.myBtn = btn.link
      } else {
        switch (btn.link) {
          case 'samaraButtons':
            const autoPlay = await this.$api.samara.getAutoPlay()
            // TODO handle laurent
            if (btn.stage === 'start') {
              //await this.$api.samara.postAutoPlay(true)
              await this.$api.samara.postStage(1)
              await this.$api.idle.postState('samara', false)
            }
            else if (btn.stage === 'idle'){
              //const idle = await this.$api.idle.getState('samara')
              await this.$api.idle.postState('samara', true)
              await Laurent.sendOut(Laurent.appName.Samara, 1, 1)
            }
            else if (btn.stage === 'light'){
              if (!autoPlay)
                await Laurent.sendOut(Laurent.appName.Samara, 1,2)
            }
            else {
              if (!autoPlay) {
                await Laurent.sendRelay(Laurent.appName.Samara, btn.stage, 2)
                //await this.$api.idle.postState('samara', false)
                //await this.$api.samara.postStage(btn.stage)
                //await this.$api.samara.postAutoPlay(false)
              }
            }
            break
          case 'changeTimelineIdle':
            await this.$api.idle.postState('timeline', true)
            await Laurent.setOneRelayOn(Laurent.appName.Timeline, 0)
            break
          case 'changeYear':
            await Laurent.setOneRelayOn(Laurent.appName.Timeline, btn.index + 1)
            //await this.$laurent.setOneRelayOn(this.$laurent.appName.Timeline, btn.index + 1)
            console.log({ year: btn.name })
            await this.$api.idle.postState('timeline', false)
            await this.$api.timeline.postYear(btn.name)
            break
          case 'changeScreenPosition':
            await this.$axios
              .$post('/api/technologies/stage/', {
                stage: btn.status,
              })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
            break
          case 'colba':
            let stream7 = (await this.$api.flows.getFlows()).split('')

            const currentColbaState = Number.parseInt(stream7[6-btn.colba])
            await Laurent.sendOut(Laurent.appName.Flows, btn.colba + 1, 1 - currentColbaState)

            await this.$api.flows.postFlow(btn.colba + 1, currentColbaState === 0)
            break
          case 'colba-all':
            const current = await this.$api.flows.getFlows()
            const needToTurnOn = Number.parseInt(current) !== 0
            for (let i = 1; i <= 7; i++) {
              await this.$api.flows.postFlow(i, !needToTurnOn)
            }
            const mask = (needToTurnOn ? '0' : '1').repeat(7) + 'xxxxx'
            Laurent.sendOutAll(Laurent.appName.Flows, mask).then()
            break

          default:
            console.log(btn.link)
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
  },
}
</script>

<style>
#pwdInput{
  z-index: 100;
  position: relative;
}
#pwdInputLabel{
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
  transition: all 0.14s ease-in-out;
  font-size: 18px;
  transform: translate('5px-50%');
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
