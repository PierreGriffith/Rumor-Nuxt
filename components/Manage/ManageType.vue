<template>
  <div>

    <!-- MODAL -->

    <div class="modal  " v-bind:class="{ 'is-active': ModalType }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">

          <p> Do you really want to delete </p>
          <p>{{CurrentWord}}</p>
        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalType=false;DeleteElem(CurrentWord)" class="button is-success">Save changes</button>
          <button @click="ModalType=false" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- TAGS -->


    <div class="container">
      <div class="is columns">


        <div class="column is-3">

          <p class="title">
            Types:<br> {{CurrentWord.name}}
          </p>

        </div>


        <div class="column is-6">
          <div class="field is-grouped is-grouped-multiline">

            <div v-for="item in items" :key="item._id" class="control">
              <div  @click="CurrentWord=item;" class="tags has-addons">
          <span @click="SetTypeStore(item._id);" class="tag is-medium i" v-bind:class="{ 'is-black': item._id === CurrentWord._id }">
            {{ item.name }}
          </span>
                <a @click="CurrentWord=item; ModalType=true" class="tag is-delete"></a>
              </div>
            </div>


          </div>
        </div>

        <div class="column">

          <div class="field is-grouped">

            <p class="control is-expanded">
              <input v-model="NewType" class="input" type="text" placeholder="Add a Type">

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

  import { DELETE_TYPE, CREATE_TYPE} from '~/apollo/mutation'


  export default {
    name: "ManageType",

    data() {
      return {
        CurrentWord: "",
        ModalType: false,
        NewType: ""

      }
    },

    methods: {
      DeleteElem: function (value) {
        this.$apollo.mutate({
          mutation:  DELETE_TYPE,
          variables: {
            _id : value._id
          }
        })

        window.location.reload(true)
      },

      AddElem: function(){
        let tmp = this.NewType;


        if (tmp === "")
          return;

        let doublon = this.items.find(function(element) {
          return element === tmp;
        });

        if (doublon === undefined) {
          this.$apollo.mutate({
            mutation:  CREATE_TYPE,
            variables: {
              name : tmp,
              brand_id: this.$store.state.current_brand
            }
          })
          window.location.reload(true)
        }

        },

      SetTypeStore(id){
        this.$store.commit('set_type', id)
      },



    },
    computed: {
      items() {
        return this.$store.state.current_list_types;
      }
    },


  }
</script>

<style scoped>

</style>
