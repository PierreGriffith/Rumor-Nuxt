<template>
<div>

  <!-- MODAL -->

  <div class="modal  " v-bind:class="{ 'is-active': ModalBrand }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body has-text-centered">

        <p> Do you really want to delete </p>
        <p>{{CurrentWord}}</p>
      </section>
      <footer class="modal-card-foot has-text-centered">
        <button @click="ModalBrand=false;DeleteElem(CurrentWord)" class="button is-success">Save changes</button>
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
       Marques:<br> {{CurrentWord}}
      </p>

    </div>


    <div class="column is-9">
      <div class="field is-grouped is-grouped-multiline">

      <div v-for="item in items" :key="item" class="control">
        <div  @click="CurrentWord=item;" class="tags has-addons">
          <span class="tag is-medium i" v-bind:class="{ 'is-black': item === CurrentWord }">
            {{ item }}
          </span>
          <a @click="CurrentWord=item; ModalBrand=true" class="tag is-delete"></a>
        </div>
      </div>


    </div>
    </div>

  </div>
  </div>

</div>

</template>



<script>
  export default {
    name: "create",

    data() {
      return {
        items: ["Rolex","Richard Mille", "Philippe Patek", "Audemars Piguet"],
        CurrentWord: "",
        ModalBrand: false

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
