<template>
  <div class="columns">
    <div class="column"> </div>
    <div class="column">

    <brand :nom= this.$store.state.page_brand.name :description=this.$store.state.page_brand.description
    ></brand>
    <brand-table :types=this.$store.state.page_brand_types></brand-table>
  </div>
    <div class="column"> </div>
  </div>
</template>

<script>
  import Brand from "../../components/Brand/Brand.vue"
  import BrandTable from "../../components/Brand/BrandTable.vue"
  import {GET_BRAND, ALL_TYPE} from '~/apollo/queries'



  export default {
    name: "idbrand",
    components: {BrandTable, Brand},

    async  asyncData(context) {

      let tmp
    await  context.app.apolloProvider.clients.defaultClient.query ({
        query: GET_BRAND,
        variables: { name : context.params.idbrand}
      }).then(({ data }) => {
        if (!(data.brand[0] !== undefined))
          return context.redirect('/404')

      tmp = data.brand[0]._id
      context.store.commit('set_page_brand', data.brand[0])

    })
      await  context.app.apolloProvider.clients.defaultClient.query ({
        query:ALL_TYPE,
        variables: { _id : tmp}
      }).then(({ data }) => {

        console.log(data)
        context.store.commit('set_page_brand_types', data.types)


      })




    }

  }

</script>

<style scoped>

</style>
