export const state = () => ({
  counter: 0,
  current_brand: ''
})



export const mutations = {
  increment (state) {
    state.counter++
  },
  set_brand(state, value) {
 console.log(value)
    state.brand = value
  }
}
