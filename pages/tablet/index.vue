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
          id="inputid"
          name="inputName"
          v-model.lazy="pass"
          type="text"
          placeholder=" "
        />
        <label class="field-placeholder" for="inputName">Пароль</label>
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
import {
  appName,
  setOneRelayOn,
  setOneRelayOnLegacy,
} from '~/plugins/laurentController'

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
      if (this.array.length === 0) {
        return this.tablet.main
      } else {
        return this.array
      }
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
            if (btn.stage === 'start') {
              this.CHANGE_BY_PATH(['samara.start', true])
              this.CHANGE_BY_PATH(['samara.counter', 1])
              await this.$axios
                .$post('/api/area_samara/stage/', {
                  stage: 1,
                })
                .then(function (response) {
                  console.log(response)
                })
                .catch(function (error) {
                  console.log(error)
                })
            } else {
              await this.$axios
                .$post('/api/area_samara/stage/', {
                  stage: btn.stage,
                })
                .then(function (response) {
                  console.log(response)
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            break
          case 'changeTimelineIdle':
            /*let timelineIdle = await this.$axios
              .$get('/api/idle/timeline/state')
              .then((response) => {
                console.log(response, 'response.data')
                return response.state
              })*/

            await this.$axios
              .$post('/api/idle/timeline/', {
                state: true,
              })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
            setOneRelayOn(appName.Timeline, 0).then()
            break
          case 'changeYear':
            // let data = JSON.stringify({year: btn.name})
            setOneRelayOn(appName.Timeline, btn.index + 1).then()
            console.log({ year: btn.name })
            await this.$axios
              .$post('/api/idle/timeline/', {
                state: false,
              })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
            await this.$axios
              .$post('/api/timeline/year/', {
                year: btn.name,
              })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
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
            let stream7 = await this.$axios
              .$get('/api/flows/')
              .then((response) => {
                console.log(response, 'response.data')
                return response.mask.split('')
              })
            stream7[btn.colba] = stream7[btn.colba] == '0' ? '1' : '0'
            stream7 = stream7.join('')
            console.log(btn.colba, stream7)
            console.log('не понял')
            await this.$axios
              .$post('/api/flows/', {
                mask: stream7,
              })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
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
.human_capital-btns {
  flex-direction: column;
  align-items: center;
}
.human_capital-back {
  position: absolute;
  left: 0;
  top: 40vh;
  z-index: 10;
  width: 2vw;
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
