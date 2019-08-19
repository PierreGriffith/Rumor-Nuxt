<template>
  <div>

    <div class="container">

      <div class="columns is-mobile">

        <div class="column">

          <p>Link</p>
          <br>
          <input v-model="link" class="input"
                 v-bind:class="{ 'is-danger': isWrong }"
                 type="text" placeholder="Link">

        </div>


        <div class="column">

          <p>price</p>
          <br>
          <input v-model="price" class="input"
                 v-bind:class="{ 'is-danger': isWrong }"
                 type="text" placeholder="price">

        </div>



        <div class="column">

          <p>Date</p>
          <br>
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input v-model="date" class="input"
                     v-bind:class="{ 'is-danger': isWrong }"
                     type="date" placeholder="Date">
            </p>
            <p class="control">
              <a @click="AddElem()" class="button is-dark">
                Send
              </a>
            </p>
          </div>


        </div>


        <div class="column">

          <p>Type</p>
          <br>

          <div class="field is-grouped">
            <p class="control">
              <a class="button is-light"
                 v-bind:class="{ 'is-primary': isSale }"
                 @click="isSale = !isSale"
              >
                vente
              </a>
            </p>
            <p class="control">
              <a class="button is-light"
                 v-bind:class="{ 'is-primary': !isSale }"
                 @click="isSale = !isSale"
              >
                Achat
              </a>
            </p>
          </div>
        </div>



      </div>

    </div>


  </div>
</template>

<script>

  import { CREATE_VALUE} from '~/apollo/mutation'

  export default {
    name: "ManageInput",

    data() {
      return {
        link: "",
        price: "",
        date: "",
        isWrong: false,
        isSale: false,
      }

    },
    methods: {
      AddElem: function(){
        if (this.link === "" || this.price === "" || this.date === "") {
          this.isWrong= true
          return
        }
        else
          this.isWrong = false

        console.log(this.link, this.price, this.date, this.isSale)
        this.$apollo.mutate({
          mutation:  CREATE_VALUE,
          variables: {
            link : this.link,
            price : this.price,
            date : this.date,
            brand_id: this.$store.state.current_brand,
            type_id: this.$store.state.current_type,
            reference_id: this.$store.state.current_ref,
            sell: this.isSale
          }
        })   .then(({ data }) => {
          console.log(data)
        })

      //  window.location.reload(true)


      }
    }
  }
</script>

<style scoped>

</style>
