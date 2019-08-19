import {  ALL_TYPE, ALL_REF, ALL_VALUES,GET_BRAND } from '~/apollo/queries'



export const state = () => ({

  /*    ADMIN    */
  current_brand: '',
  current_brand_name: '',
  current_list_types: [],
  current_type: '',
  current_list_ref: [],
  current_ref: '',
  current_list_value: [],
  /*     ADMIN          */


  /*     PAGE       */
  page_brand: '',
  page_brand_types: [],
  page_brand_refs: [],

})



export const mutations = {
  set_brand(state, value) {
    state.current_brand = value
    this.app.apolloProvider.clients.defaultClient.query
    ({
      query: ALL_TYPE,
      variables: {_id: value}
    })
      .then(({ data }) => {
        this.commit("set_types", data.types)
      })
    this.commit("set_refs", [])

  },
  set_types(state, value) {
    state.current_list_types = value
  },
  set_type(state, value) {
    state.current_type = value

    this.app.apolloProvider.clients.defaultClient.query
    ({
      query: ALL_REF,
      variables: {_id: value}
    })
      .then(({ data }) => {
        this.commit("set_refs", data.references)
      })
  },
  set_brand_name(state, value){
    state.current_brand_name = value
  },
  set_refs(state, value){
    console.log(value)
    state.current_list_ref = value
  },
  set_ref(state, value){
    state.current_ref = value
    this.app.apolloProvider.clients.defaultClient.query
    ({
      query: ALL_VALUES,
      variables: {_id: value}
    })
      .then(({ data }) => {
        this.commit("set_values", data.values)
      })

  },
  set_values(state, value){
    state.current_list_value = value
  },

  /* PAGE BRAND */

  set_page_brand(state, value){
    state.page_brand = value;
  },

  set_page_brand_types(state, value){
    state.page_brand_types = value;
  },
 set_page_brand_refs(state, value){
    state.page_brand_refs = value;
  },

}
