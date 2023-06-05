<template>
  <div class="flex-center all-screen corner-decoration">
    <div class="buttons-container">
      <nuxt-link to="/entry_group">Входная группа 🚪</nuxt-link>
      <br>
      <nuxt-link to="/tablet">Управляющий планшет 🎛️</nuxt-link>
      <br>
      <nuxt-link to="/human_capital">Люди 👥</nuxt-link>
      <br>
      <h1>Технологии ⚙️</h1>
      <nuxt-link to="/technology/fixed">- Фоновый экран 🖼️</nuxt-link>
      <nuxt-link to="/technology/moving">- Двигающийся экран🏃‍♂️</nuxt-link>
      <nuxt-link to="/small_technology_future">- Технологии маленький планшет ▪️</nuxt-link>
      <br>
      <h1>Самара 🧡</h1>
      <nuxt-link to="/samara/map">- Карта 🗺️</nuxt-link>
      <nuxt-link to="/samara/video">- Видео 🎥</nuxt-link>
      <br>
      <nuxt-link to="/timeline">Лента времени ⏳</nuxt-link>
      <br>
      <nuxt-link to="/stream7">7 потоков нефти 🛢️</nuxt-link>
    </div>
  </div>
</template>

<script>

export default {}
</script>
<style scoped>
.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: start;
  margin: auto;
  max-width: 600px;
  width: 100%;
  height: 100%;
}

a {
  font-size: 24pt;
  font-weight: 800;
}
</style>
