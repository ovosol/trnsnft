<script>

import PeopleBook from "@/components/Module/PeopleBook.vue";

export default {
  components: {PeopleBook},
  computed: {
    peopleType() {
      return this.$route.params.people
    },
  },
  data() {
    return {
      employees: null,
      videoUrl: null,
    }
  },
  async mounted() {
    console.log(this.peopleType)
    this.videoUrl = await this.$api.idle.getVideo("human_capital")
    const res = await this.$api.humanCapital.getEmployeeList(this.peopleType)
    const employees = res.employees
    employees.forEach((e) => {
      e.photo = process.env.BASE_URL + e.photo
    })

    this.employees = employees
  }
}


</script>

<template>
  <people-book v-if="employees" people-type="veterans" :veterans="employees" :video-url="videoUrl"></people-book>
</template>

<style scoped>

</style>
