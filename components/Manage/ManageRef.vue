<template>
  <div>

    <!-- MODAL -->

    <div class="modal  " v-bind:class="{ 'is-active': ModalRef }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">

          <p> Do you really want to delete </p>
          <p>{{CurrentWord}}</p>
        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalRef=false;DeleteElem(CurrentWord)" class="button is-success">Save changes</button>
          <button @click="ModalRef=false" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- TAGS -->


    <div class="container">
      <div class="is columns">


        <div class="column is-3">

          <p class="title">
            Références:<br> {{CurrentWord}}
          </p>

        </div>


        <div class="column is-6">
          <div class="field is-grouped is-grouped-multiline">

            <div v-for="item in items" :key="item" class="control">
              <div  @click="CurrentWord=item;" class="tags has-addons">
          <span class="tag is-medium i" v-bind:class="{ 'is-black': item === CurrentWord }">
            {{ item }}
          </span>
                <a @click="CurrentWord=item; ModalRef=true" class="tag is-delete"></a>
              </div>
            </div>


          </div>
        </div>

        <div class="column">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input v-model="NewBrand" class="input" type="text" placeholder="Add a reference">

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
  export default {
    name: "ManageRef",

    data() {
      return {
        items: ["Rolex","Richard Mille", "Philippe Patek", "Audemars Piguet"],
        CurrentWord: "",
        ModalRef: false

      }
    },

    methods: {
      DeleteElem: function (item) {
        this.items = this.items.filter(x => x !== item)
      },
    },


  }
</script>

<style scoped>

</style>
