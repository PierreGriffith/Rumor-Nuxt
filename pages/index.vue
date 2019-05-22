<template>
  <div>
    <title-page title="HOMEPAGE"> </title-page>

  <homepage-clock></homepage-clock>

  </div>
</template>

<script>
  import HomepageClock from '../components/Homepage/HomepageClock.vue'
  import TitlePage from '../components/Global/TitlePage'


  export default {
    name: "",
    components: {HomepageClock, TitlePage}
  }

</script>
<style>

</style>

