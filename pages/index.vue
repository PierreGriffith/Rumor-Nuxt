<template>
  <div class="container">


    <title-page title="HOMEPAGE"> </title-page>

    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
    </div>


    <div class="columns is-mobile">
      <div class="column has-text-centered">


        <homepage-clock class="is-hidden-mobile is-hidden-tablet-only"></homepage-clock>

      </div>

      <div class="column">

        <div class="columns is-mobile">
          <div class="column"> </div>
          <div class="column">
            <homepaget-table></homepaget-table>
          </div>
          <div class="column"> </div>
        </div>

        🇫🇷

        <p class="has-text-centered">Cote.Watch est un Bot 🤖 qui recherche la Vrai Cotation des montres ⌚,
          Actuellement nous sommes spécialisés dans la ROLEX ©️
        </p>

        🇺🇸
        <p class="has-text-centered">Cote.Watch
          is a Bot 🤖 who is looking for the true quotation of watches ⌚,
          Currently we are specialized in ROLEX © ️️
        </p>



      </div>

      <div class="column">

      </div>


    </div>

    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
    </div>

  </div>
</template>

<script>
  import HomepageClock from '../components/Homepage/HomepageClock.vue'
  import HomepagetTable from '../components/Homepage/HomeTable.vue'
  import TitlePage from '../components/Global/TitlePage'


  export default {
    name: "",
    components: {HomepageClock, TitlePage, HomepagetTable}
  }

</script>
<style>

</style>

