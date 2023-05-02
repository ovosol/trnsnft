<template>
  <div class="all-screen flex-center veteran-page">
    <button-back
      @click="goBack"
    />
    <div class="all-size veteran-page">
      <div
        class="all-size flex-center chosen-veteran-container"
        style="align-items: center"
        v-show="modal && !visibleKeyboard"
        :style="'z-index: ' + (!modal && visibleKeyboard ? 3 : 6)"
      >
        <div class="chosen-veteran">
          <div class="chosen-veteran-img">
            <img :src="modalInfo.img" alt="" />
          </div>
          <div class="chosen-veteran-desc">
            <h2>{{ modalInfo.name }}</h2>
            <p>{{ modalInfo.desc }}</p>
            <div style="width: 100%; text-align: center">
              <div @click="modal = false">
                <!-- btnwitharrow -->
                <div
                  class="rbbtn"
                  style="
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center center;
                    animation: none;
                  "
                >
                  Назад
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Знаю бред, потом сверстаю нормальную модалку, пока так  -->
      </div>
      <div
        v-show="!modal && mainBtnClick"
        :style="'z-index: ' + (visibleKeyboard ? 3 : 6)"
      >

        <div class="corner-decoration all-screen var flex-center" style="justify-content: center;" >
          <div class="v-container v-grid flex-center">
            <div class="searcher flex-center">
              <!-- <label for="div">Список ветеранов </label> -->
              <div class="filter">
                <input
                  @click="
                    visibleKeyboard = true
                    modal = false
                  "
                  v-model="searchName"
                  type="text"
                  placeholder="🔎 Поиск по имени"
                />
              </div>
            </div>
            <div
              class="var-title"
              v-for="letterArr in arraysByAlphabet(filteredVeterans)"
              :key="letterArr.title + 1"
            >
              <label for="div.item-letter"
              ><h4>
                {{ letterArr.title }}
              </h4></label
              >
              <div
                style="display: flex"
                class="item-letter"
                v-for="letterItem in letterArr.data"
                :key="letterItem.fio + 1"
              >
                <!-- {{letterItem}} -->
                <!-- <img style="width: 100px" :src="letterItem.photo" alt="" /> -->
                <div
                  class="modal"
                  style="width: 100%; text-align: right"
                  @click="
                    modal = true
                    modalInfo = {
                      name: letterItem.fio,
                      img: letterItem.photo,
                      desc: letterItem.description,
                    }
                  "
                >
                  <h4 class="text">
                    {{ letterItem.fio }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div
      :class="visibleKeyboard ? 'corner-decoration' : ''"
      class="ui-keyboard-case flex-center"
      style="flex-direction: column;"
    >
      <div v-show="visibleKeyboard" class="search-name"><h3>{{searchName}}</h3></div>
      <keyboard
        v-show="visibleKeyboard"
        v-model="searchName"
        @custom="custom"
        :layouts="[
          'йцукенгшщзхъ{⇦:backspace}|фывапролджэ|ячсмитьбю|{⇧:goto:1}{Пробел:space}{↵:custom}',
          'ЙЦУКЕНГШЩЗХЪ{⇦:backspace}|ФЫВАПРОЛДЖЭ|ЯЧСМИТЬБЮ|{⇧:goto:0}{Пробел:space}{↵:custom}',
        ]"
      ></keyboard>
    </div>
    <v-idle
      style="display: none"
      @idle="mainBtnClick = false; visibleKeyboard = false; modal = false"
      :loop="true"
      :duration="5"
      :events="['mousemove', 'keypress', 'click', 'touchmove', 'touchstart', 'touchmove', 'scroll']"
    />
    <div
      class="rbbtn btnsStyle main-vet-btn"
      v-show="!mainBtnClick"
      @click="mainBtnClick = true"
    >
      🔎 Поиск по имени
    </div>
  </div>
</template>

<script>
import keyboard from 'vue-keyboard'
import { mapGetters } from 'vuex'
import ButtonBack from "@/components/Module/ButtonBack.vue";
export default {
  name: 'PeopleBook',
  props:{
    peopleType: {
      type: 'veterans' | 'fame',
      required: true,
    },
    veterans: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      input: '',
      searchName: '',
      visible: true,
      layout: 'normal',
      visibleKeyboard: false,
      modal: false,
      mainBtnClick: false,
      modalInfo: {},
      options: {
        useKbEvents: false,
        preventClickEvent: false,
      },
    }
  },
  components: {ButtonBack, keyboard },

  methods: {
    custom() {
      this.visibleKeyboard = false
      if (
        this.filteredVeterans.length === 1 &&
        this.visibleKeyboard === false
      ) {
        this.modal = true
        // this.modalIndex = this.filteredVeterans[0]
        this.modalInfo = {
          name: this.filteredVeterans[0].fio,
          img: this.filteredVeterans[0].photo,
          desc: this.filteredVeterans[0].description,
        }
        // this.modalIndex = 0
      }
      if(this.filteredVeterans.length === 0) {
        this.visibleKeyboard === true
      }
    },
    arraysByAlphabet(vet) {
      //Здесь я разбиваю пришедший массив ветеранов на массив объектов title первая буква и внутри все ветераны с этой буквы, после сортирую по возрастанию
      return Object.values(
        vet.reduce((acc, word) => {
          let firstLetter = word.fio[0].toLocaleUpperCase()
          if (!acc[firstLetter]) {
            acc[firstLetter] = { title: firstLetter, data: [word] }
          } else {
            acc[firstLetter].data.push(word)
          }
          acc = Object.keys(acc)
            .sort()
            .reduce(function (result, key) {
              result[key] = acc[key]
              return result
            }, {})
          // acc = Object.values(acc)
          console.log(acc)
          return acc
        }, {})
      )
    },
    goBack() {
      this.$router.push({path: '/human_capital/'})
    }
  },
  computed: {
    ...mapGetters(['byPath']),
    // veterans() {
    //   return this.byPath('humanCapital.veterans')
    // },

    filteredVeterans() {
      //Здесь я фильтрую согласно инфпуту
      var users_array = this.veterans,
        searchName = this.searchName
      if (!searchName) {
        return users_array
      }
      searchName = searchName.trim().toLowerCase()
      users_array = users_array.filter(function (user) {
        if (user.fio.toLowerCase().indexOf(searchName) !== -1) {
          return user
        }
      })
      // Возвращает массив с отфильтрованными данными.
      return users_array
    },
  },
}
</script>

<style>
.veteran-page {
  background-image: url('~/assets/creative/veteranBg.png');
  background-size: 100vw 100vh;
  display: flex;
}
.main-vet-btn{

  z-index: 10;
  position: absolute;
  display: flex;
  align-self: self-end;
  margin-bottom: 20px;
}
.v-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 30px;
}
.ui-keyboard-case > .search-name > h3 {
  margin: 0;
}
.ui-keyboard-case > .search-name {
  border-radius: 30px;
  background: linear-gradient(180deg, #eaeaec00 70%, #e12123 100%);
  min-width: 30%;
  text-align: center;
  padding: 0 10px;
}
.v-container {
  position: absolute;
  justify-content: flex-start;

  display: grid;
  grid-template-columns: repeat(4, calc(25vw - 100px));

  /* display: flex; */
  /* padding: 50px; */
  z-index: 3;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.corner-decoration.all-screen.var {
  background-attachment: fixed;
  height: 200vh;
}
.corner-decoration.all-screen.var > div {
  margin-top: 200px;
}
.v-container > .var-title > .item-letter > div > h4 {
  margin-left: 30px;
  font-size: 12px;
}
.v-container > .var-title > label > h4 {
  color: white;
  background-image: url('~/assets/creative/veteran-var.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 20px;
  padding: 5px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-left: 27%; */
}
.searcher > .filter > input:focus-visible {
  border: none !important;
}
.searcher > .filter > input {
  width: 20vw;
  text-align: center;
  height: 30px;
  border-radius: 30px;
  background: linear-gradient(180deg, #eaeaec00 70%, #e12123 100%);
  border: none;
  color: black;
}
.v-container > .v > .modal > h3.text {
  background-image: linear-gradient(180deg, #00000000, #000000ff);
  color: white;
  text-align: center;
  margin: 0;
  font-size: 100%;
}
.v-container > .v > .modal {
  justify-content: center;
  display: flex;
  align-items: flex-end;
  width: 300px;
  height: 200px;
  background-size: 100% 100%;
}
.v-container > .v {
  cursor: pointer;
}
.searcher {
  grid-area: 1 / 1 / 1 / 5;
  /* position: absolute; */
  /* bottom: 5vh; */
  display: flex;
  z-index: 7;
}
/* .vue-keyboard-key {
  background: #1777bba0;
  color: white;
} */
.ui-keyboard-case {
  border: none !important;
}

.ui-keyboard-case {
  font-size: 50px;
  text-align: center;
  /* background: #fefefe; */
  border: 1px solid #ffe3e2;
  padding: 12px;
  width: 50%;
  height: auto;
  margin-right: 5%;

  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;

  padding: 0;
  margin-right: 0;
  /* left: 25%; */
  /* top: auto;
    bottom: 0px; */
  /* position: fixed; */
}
/* button.vue-keyboard-key:nth-child(11),
div.vue-keyboard-row:nth-child(4) > button:nth-child(1),
div.vue-keyboard-row:nth-child(5) > button:nth-child(1),
button.action:nth-child(2) {
  background-color: red;
  color: black;
} */
.vue-keyboard-key {
  background-color: white;
  color: black;
  box-shadow: black 3px 3px 3px;
  width: 65px;
  height: 60px;
  font-size: 17px;
  padding: 0;
  margin: 5px;
  color: black;
  box-shadow: #8e8e8e 1px 1px 1px 1.3px;
  margin: 5px;
}

.chosen-veteran {
  display: flex;
  flex-direction: row;
  height: 52%;
  width: 80vw;
  background-image: url('~/assets/creative/chosenVeteranBg.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.chosen-veteran > .chosen-veteran-img {
  height: 100%;
  width: auto;
}
.chosen-veteran > .chosen-veteran-img > img {
  height: 100%;
  width: auto;
}
.chosen-veteran > .chosen-veteran-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0px 30px 10px;
}
.chosen-veteran > .chosen-veteran-desc > h2 {
  text-align: center;
  width: 100%;
}
.chosen-veteran > .chosen-veteran-desc > p {
  text-align: left;
  width: 90%;
  margin: 0;
}
button.action:nth-child(1),
button.vue-keyboard-key:nth-child(13),
button.action:nth-child(3) {
  font-size: 30px;
  height: 70px;
  margin-bottom: 0;
}
</style>
