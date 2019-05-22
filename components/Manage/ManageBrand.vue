<template>
  <div>
    <!-- MODAL  PICTURES -->

    <div class="modal  " v-bind:class="{ 'is-active': ModalPicture }">
      <div class="modal-background"  @click="ModalPicture=false" ></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">

          <p> Logo Link</p>
             <input class="input" type="text" placeholder="Text input">

          <div class="columns">
            <div class="column">

            </div>
          </div>

            <figure class="image is-128x128 centered">
              <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>


          <div class="columns">
            <div class="column">

            </div>
          </div>



          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea class="textarea" placeholder="Description"></textarea>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalPicture=false" class="button is-success">Save changes</button>
          <button @click="ModalPicture=false" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>



    <!-- MODAL  DELETE -->

    <div class="modal  " v-bind:class="{ 'is-active': ModalBrand }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">

          <p> Do you really want to delete </p>
          <p>{{CurrentWord.name}}</p>
          <p>{{CurrentWord.id}}</p>

        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalBrand=false;DeleteElem(CurrentWord.id)" class="button is-success">Save changes</button>
          <button @click="ModalBrand=false" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- TAGS -->


    <div class="container">
      <div class="is columns">


        <div class="column is-3">

          <p class="title">
            Marques:<br> {{CurrentWord.name}}
          </p>
        </div>

        <div class="column is-6">
          <div class="field is-grouped is-grouped-multiline">
            <div v-for="brand in brands" :key="brand" class="control">
              <div  v-on:dblclick="ModalPicture = true"  @click="CurrentWord.name=brand.name;" class="tags has-addons tag--click">
          <span class="tag is-medium i" v-bind:class="{ 'is-black': brand.name === CurrentWord.name }">
            {{ brand.name }}
          </span>
                <a @click="CurrentWord.name=brand.name; CurrentWord.id=brand._id; ModalBrand=true" class="tag is-delete"></a>
              </div>
            </div>


          </div>
        </div>



        <div class="column">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input v-model="NewBrand" class="input" type="text" placeholder="Add a brand">

            </p>
            <p @click="AddElem()" class="control">
              <a class="button is-dark">
               Create
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>



<script>

  import { DELETE_BRAND, CREATE_BRAND} from '~/apollo/mutation'
  import {ALL_BRANDS} from '~/apollo/queries'

  export default {
    name: "ManageBrand",


    data() {
      return {
        brands: [],
        loading: 0,
        CurrentWord:{name: "", id: ""},
        ModalBrand: false,
        ModalPicture: false,
        NewBrand: ""

      }
    },

    methods: {
      DeleteElem: function (value) {
        this.$apollo.mutate({
          mutation:  DELETE_BRAND,
          variables: {
          _id : value
          }
        })
      },

      AddElem: function(){
        let tmp = this.NewBrand;


        if (tmp == "")
          return

        let doublon = this.brands.find(function(element) {
          return element === tmp;
        });

        if (doublon === undefined) {
          this.$apollo.mutate({
            mutation:  CREATE_BRAND,
            variables: {
              name : tmp
            }
          })

        }

      },
    },
    beforeCreate() {
      this.$apollo.query({
        query: ALL_BRANDS})
        .then(({ data }) => {
          this.brands = data.brands;
        })

    },
  }
</script>

<style scoped>

  .tag--click{
    cursor: pointer;
  }


</style>
