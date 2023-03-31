<template>
  <people-book people-type="fame" :veterans="employees"></people-book>
</template>

<script>

import PeopleBook from "@/components/Module/PeopleBook.vue";

export default {
  components: {PeopleBook},
  async asyncData({$api}) {
    const res = await $api.humanCapital.getEmployeeList('fame')
    const employees = res.employees
    employees.forEach((e) => {
      e.photo = process.env.BASE_URL + '/media/' + e.photo
    })
    return {employees}
  },
  data() {
    return {
      employees: [],
    }
  },
}
</script>

<style>

</style>
