<template>

  <div>
<div class="container">


  <div class="columns">
    <div class="column">

    </div>


    <div class="column">
      <a class="button is-small back__button">
        <nuxt-link :to="this.CurrentTypePath">
          {{ this.CurrentType}}
        </nuxt-link>
      </a>



      <p>  Référence:  {{ this.CurrentRef}}  </p>

      <ref-value>

</ref-value>

    </div>

    <div class="column">

    </div>

  </div>

</div>

  <no-ssr>
    <scatter-plot>
    </scatter-plot>
  </no-ssr>
  </div>
</template>

<script>
import RefValue from '../../components/References/RefValue.vue'
import ScatterPlot from "../../components/References/Stats"
import {GET_VALUES_BY_REF, GET_TYPE, GET_BRAND_BY_ID} from '~/apollo/queries'



    export default {
        name: "idref",
      components: {ScatterPlot, RefValue},
      async  asyncData(context) {

        let ref;
        let brand;

        await  context.app.apolloProvider.clients.defaultClient.query ({
          query: GET_VALUES_BY_REF,
          variables: { ref_name : context.params.idref}
        }).then(({ data }) => {
          if (!(data.value_by_ref[0] !== undefined))
            return context.redirect('/404')
          ref = data.value_by_ref[0].type_id;


          context.store.commit('set_curr_ref', context.params.idref)

          context.store.commit('set_all_values', data)
           context.store.commit('set_page_refs', data.value_by_ref)
        })


        await  context.app.apolloProvider.clients.defaultClient.query ({
          query: GET_TYPE,
          variables: { _id : ref }
        }).then(({ data }) => {
          brand = data.type[0].brand_id;
          context.store.commit('set_page_brand_type', data.type[0].name)
        })


        await  context.app.apolloProvider.clients.defaultClient.query ({
          query: GET_BRAND_BY_ID,
          variables: { _id : brand }
        }).then(({ data }) => {
          console.log(data.brand_by_id[0].name)
          context.store.commit('set_page_brand',data.brand_by_id[0].name)

        })

      }, created(){
        this.CurrentType =   "/" + this.$store.state.page_brand_type;
        this.CurrentTypePath = "/brand/" + this.$store.state.page_brand + "/" + this.$store.state.page_brand_type;
        this.CurrentRef = this.$store.state.curr_ref;
      },
      data (){
          return {
            CurrentType: '',
            CurrentTypePath: '',
            CurrentRef: '',
          }
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
