<template>
  <div>


    <!-- MODAL MODIF-->


    <div class="modal  " v-bind:class="{ 'is-active':ModalModif }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">
     <div class="columns is-mobile">
       <div class="column">
         <p>BEGIN DATE</p>
         <input v-model="Begin" type="date" placeholder="">
       </div>

       <div class="column">
         <p>END DATE</p>
         <input v-model="End" type="date" placeholder="">
       </div>
       <div></div>
     </div>

          <div class="columns is-mobile">
            <div class="column">
              <textarea v-model="Description"  class="textarea" placeholder="Description ref"> </textarea>

            </div>
          </div>
        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalModif=!ModalModif;ChangeElem()" class="button is-success">Save changes</button>
          <button @click="ModalModif=!ModalModif" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>



    <!-- MODAL DELETE-->

    <div class="modal  " v-bind:class="{ 'is-active': ModalRef }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body has-text-centered">

          <p> Do you really want to delete </p>
          <p>{{CurrentWord}}</p>
        </section>
        <footer class="modal-card-foot has-text-centered">
          <button @click="ModalRef=!ModalRef;DeleteElem(CurrentWord)" class="button is-success">Save changes</button>
          <button @click="ModalRef=!ModalRef" class="button">Cancel</button>
        </footer>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- TAGS -->


    <div class="container">
      <div class="is columns">


        <div class="column is-3">

          <p class="title">
            Références:<br> {{CurrentWord.name}}
          </p>

        </div>


        <div class="column is-6">
          <div class="field is-grouped is-grouped-multiline">

            <div v-for="item in items" :key="item._id" class="control">
              <div  @click="CurrentWord=item;" class="tags has-addons">
          <span v-on:dblclick="ModalModif = true" @click="SetRefStore(item._id);" class="tag is-medium i" v-bind:class="{ 'is-black': item === CurrentWord }">
            {{ item.name }}
          </span>

                <span class="tag is-info">{{item.begin}} - {{item.end}} </span>


                <a @click="CurrentWord=item; ModalRef=true" class="tag is-delete"></a>
              </div>
            </div>


          </div>
        </div>


        <div class="column">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input v-model="NewRef" class="input" type="text" placeholder="Add a Ref">

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
  import { DELETE_REF, CREATE_REF, UPDATE_REF} from '~/apollo/mutation'



  export default {
    name: "ManageRef",

    data() {
      return {
        CurrentWord: "",
        ModalRef: false,
        ModalModif: false,
        NewRef: "",
        End:"",
        Begin: "",
        Description: ""
      }
    },

    methods: {
      DeleteElem: function (value) {
        this.$apollo.mutate({
          mutation:  DELETE_REF,
          variables: {
            _id : value._id
          }
        })

        window.location.reload(true)
      },
      ChangeElem: function(){

        console.log(this.CurrentWord)
        this.$apollo.mutate({
          mutation:  UPDATE_REF,
          variables: {
            _id: this.CurrentWord._id,
            brand_id: this.$store.state.current_brand,
            type_id: this.$store.state.current_type,
            name :this.CurrentWord.name,
            end: this.End,
            begin: this.Begin,
            description: this.Description
          }
        }) .then(({ data }) => {
            console.log(data)
          window.location.reload(true)

        })
      },
      AddElem: function(){
        let tmp = this.NewRef;


        if (tmp === "")
          return;


        console.log(this.items)
        let doublon = this.items.find(function(element) {
          return element === tmp;
        });


        console.log(this.$store.state.current_brand_name + '_'+ tmp)

        if (doublon === undefined) {
          this.$apollo.mutate({
            mutation:  CREATE_REF,
            variables: {
              name : tmp,
              brand_id: this.$store.state.current_brand,
              type_id: this.$store.state.current_type
            }
          })

          window.location.reload(true)
        }

      },

      SetRefStore(id){
        this.$store.commit('set_ref', id)
      },

    },
    computed: {
      items() {
        return this.$store.state.current_list_ref;
      }
    },

  }
</script>

<style scoped>

</style>
