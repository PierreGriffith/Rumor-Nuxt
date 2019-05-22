<template>
  <div>
   <Header class="main__color container"></Header>
    <nuxt/>
    <Footer class="main__color container"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header/Header.vue'
  import Footer from '../components/Footer/Footer.vue'

  export default {
   components: {Header, Footer}
  }

</script>


<style lang="scss">
@import '~assets/scss/app.scss';

  .main__color{
     background-color: $background-main;
  }




</style>

