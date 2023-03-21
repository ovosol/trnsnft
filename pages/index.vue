<template>
  <div class="flex-center all-screen corner-decoration">
    <div>

    <nuxt-link to="/entry_group"
      >+ Входная группа. В презентации 2 стр.</nuxt-link
    >
    (обоих видео) <br />
    <nuxt-link to="/human_capital">
     4 Человеческий капитал. В презентации 29-32 стр.(виртуальная клавиатура)</nuxt-link
    >
    (!!!описание логики - вплоть до того что не понятно, как должна быть
    представлена информация в любом пункте, кроме Интерактивной книги почета,
    которая на самом деле, судя по всему, книга памяти ветеранов ВОВ, <br />
    Фото, Видео, креативы) <br />
    <nuxt-link to="/tablet">5 Планшет. В презентации нет. </nuxt-link
    > <br />
    <nuxt-link to="/technology">
     1 Технологии. В презентации 16-21 стр.</nuxt-link
    >
    (Видео, 3D-модели деталей, креативы, состояние бездействия) <br />
    <nuxt-link to="/samara">+2 Самара. В презентации 24-27 стр.</nuxt-link>
    (видео) <br />
    <nuxt-link to="/timeline">+3 Лента времени. В презентации 5-15стр </nuxt-link>
    (видео) <br />
    <nuxt-link to="/stream7"> +7 потоков нефти. </nuxt-link>
    (картинки) <br />
    <nuxt-link to="/small_technology_future">1 Маленький планшет рядом с технологией будущего </nuxt-link>
    (картинки и креативы, создание проги для 3д) <br />
  </div>
</div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // ...mapGetters({
    // infoStatus: 'infoStatus'
    // }),
  },
}
</script>
<style scoped>
a {
  font-size: 24pt;
  font-weight: 800;
}
</style>
