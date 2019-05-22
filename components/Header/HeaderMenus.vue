<template>

  <section class="hero is-small">
    <div class="hero-body">

    <div class="columns is-mobile">

      <div class="column is-1">
        <Zondicon icon="menu" class="icon__size"/>
      </div>


      <div class="column is-1">
      </div>


      <div class="column">

        <p class="logo__main has-text-centered">cote</p>
      </div>

      <div class="column is-1">
        <Zondicon icon="search" class="icon__size"/>

      </div>


      <div class="column is-1 is-hidden-desktop">
      </div>


      <div class="column is-1">
        <Zondicon icon="user" class="icon__size"/>
      </div>

      </div>
    </div>
  </section>


</template>

<script>
    export default {
        name: "HeaderMenus"
    }
</script>

<style lang="scss" scoped>

  @import '~assets/scss/app.scss';

  .icon__size {
    height: 15px;
    cursor: pointer;
  }

  .logo__main{
    margin-top: -50px;
    font-size: 50px;
    font-family: $font-logo;
    font-weight: bold;
    cursor: pointer;
  }


</style>
