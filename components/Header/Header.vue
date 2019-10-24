<template>
  <div>
    <header-connexion>

    </header-connexion>
    <header-numbers>
    </header-numbers>
    <header-menus>
    </header-menus>
    <header-pres>
    </header-pres>
  </div>
</template>

<script>
  import HeaderNumbers from './HeaderNumbers.vue'
  import HeaderMenus from './HeaderMenus.vue'
  import HeaderPres from './HeaderPres.vue'
  import HeaderConnexion from "./HeaderConnexion";


    export default {
        name: "Header",
      components: {
        HeaderConnexion,
        HeaderNumbers,
        HeaderMenus,
        HeaderPres,
      }
    }
</script>

<style lang="scss" scoped>


</style>
