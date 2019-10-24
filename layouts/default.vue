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
   components: {Header, Footer},
    head () {
      return {
        script: [


          {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js',  defer: true },
          {src: 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg.js',  defer: true },
          {src: 'https://cdn.jsdelivr.net/gh/pierregriffith/libzer@master/js/svgpopclocks.js',  defer: true }

        ],
      }
    },

  }

</script>


<style lang="scss">
@import '~assets/scss/app.scss';

  .main__color{
     background-color: $background-main;
  }




</style>

