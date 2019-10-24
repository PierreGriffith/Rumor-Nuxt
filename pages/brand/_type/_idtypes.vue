<template>
<div>



  <div class="columns">

    <div class="column">
    </div>

      <div class="column">



        <a class="button is-small back__button">
          <nuxt-link :to="this.$store.state.page_brand">
{{ this.Currentbrand}}
          </nuxt-link>
        </a>


        <title-page title="references">

        </title-page>


        <type-table :refs=this.$store.state.page_brand_refs></type-table>

        <div class="columns">
          <div class="column"></div>
        </div>

      </div>


    <div class="column">
    </div>


  </div>

</div>
</template>

<script>
  import TypeTable from "../../../components/Brand/Type/TypeTable.vue"
  import {GET_TYPE_BY_NAME} from '~/apollo/queries'
  import TitlePage from "../../../components/Global/TitlePage";


  export default {
        name: "idtypes",
        components: {TitlePage, TypeTable},
      async  asyncData(context) {

        await  context.app.apolloProvider.clients.defaultClient.query ({
          query: GET_TYPE_BY_NAME,
          variables: { name : context.params.idtypes, brand: context.params.type}
        }).then(({ data }) => {

          if (!(data.type_name[0] !== undefined))
            return context.redirect('/404')


          console.log(context.params.type)

          context.store.commit('set_page_brand', "/brand/" + context.params.type)

          context.store.commit('set_page_brand_refs', data.type_name)

        })
      },
      data () {
          return {
            Currentbrand: ''
          }
      },
      created(){
          this.Currentbrand = this.$store.state.page_brand.slice(6,this.$store.state.page_brand.length)
      }

    }
</script>

<style scoped>

  .back__button{
    color: white;
    background-color: #127749;
  }
  .back__button a {
    color: white;
  }
</style>
