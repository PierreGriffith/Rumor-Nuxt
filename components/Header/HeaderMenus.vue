<template>

  <section class="hero is-small">
    <div class="hero-body header-custom">

    <div class="columns is-mobile">

      <div class="column is-1">

     <!--
        <Zondicon icon="menu" class="icon__size"/>
     -->

      </div>


      <div class="column is-1">
      </div>


      <div class="column has-text-centered">


<div class="centered-logo">
          <n-link to="/" class="logo__main has-text-centered">cote</n-link>
</div>




      </div>

      <div class="column is-1">

        <!--
        <Zondicon icon="search" class="icon__size"/>
-->
      </div>


      <div class="column is-1 is-hidden-desktop">
      </div>

      <div  v-if="this.$store.state.login_button"   @click="ActiveConnex()" class="column is-1">
        <!--

        <Zondicon    icon="user" class="icon__size"/>
   -->
      </div>
      <div  v-else   @click="Deconnexion()" class="column is-1">
   <!--

        <Zondicon  icon="stand-by" class="icon__size"/>
-->
      </div>



      </div>
    </div>
  </section>


</template>

<script>
    export default {
        name: "HeaderMenus",
      methods : {
          ActiveConnex(){
            this.$store.commit('set_modal_connexion', true)
          },
       Deconnexion(){
          this.$cookies.remove('cookie-id')
           const cookieRes = this.$cookies.get("cookie-id");
         if (cookieRes === undefined){
           this.$store.commit('set_login_button', false)
         }
         window.location.reload()
        }
      },
      created(){
        const cookieRes = this.$cookies.get("cookie-id");
        if (cookieRes !== undefined){
          this.$store.commit('set_login_button', false)
        }
        },
    }
</script>

<style lang="scss" scoped>

  @import '~assets/scss/app.scss';

  .icon__size {
    height: 15px;
    cursor: pointer;
  }

  .logo__main{
    font-size: 50px;
    font-family: $font-logo;
    font-weight: bold;
    cursor: pointer;
    color: #363636;
  }

   .header-custom{
     margin-top: -115px;
   }

  .centered-logo{
    padding-top: 5%;
  }

</style>
