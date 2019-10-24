<template>

  <div>


    <!-- MODAL -->

    <div class="modal" v-bind:class="{ 'is-active': ModalValue }">
      <div class="modal-background"  @click="ModalValue=false;"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modify a value</p>
          <button class="delete" @click="ModalValue=false;" aria-label="close"></button>
        </header>
        <section class="modal-card-body">

        <ManageTableInput v-bind:date="CurrentValue.date"  v-bind:id="CurrentValue.id"
                          v-bind:value="CurrentValue.price" v-bind:link="CurrentValue.link"
                          v-bind:sell="CurrentValue.sell">

        </ManageTableInput>

        </section>
        <footer class="modal-card-foot">
          <button @click="ModalValue=false;" class="button is-success">Save changes</button>
          <button @click="DeleteElem();ModalValue=false;" class="button is-danger">Delete</button>
        </footer>
      </div>
    </div>


    <!-- TABLE -->
    <div class="container">

      <table class="table is-fullwidth is-hoverable">
        <thead>
        <tr>
          <th><abbr title="Link"> Value </abbr></th>
          <th><abbr title="Value"> Date </abbr></th>
          <th><abbr title="Date"> Link </abbr></th>
          <th><abbr title="Date"> Vente </abbr></th>
          <th><abbr title="ID">Id </abbr></th>
          <th><abbr title="ID">Ref Id </abbr></th>

        </tr>
        </thead>

        <tfoot>
        <tr>

          <th> Value </th>
          <th>Date </th>
          <th>Link</th>
          <th>Vente</th>
          <th>id</th>
          <th>Ref id</th>
        </tr>
        </tfoot>

        <tbody>


        <tr class="tag--click" v-for="item in items" :key="item._id"
            v-on:dblclick="ModalValue = true"

            v-bind:class="{ 'is-selected': item._id === CurrentValue.id }"

            @click="CurrentValue.id=item._id;
            CurrentValue.price=item.price;
            CurrentValue.link=item.link;
            CurrentValue.date=item.date;
            CurrentValue.date=item.sell
            ">

          <td>{{ item.price}}</td>
          <td>{{ item.date }}</td>

          <td><a :href="item.link" :title="item._id">{{ item.link}}</a>
          </td>
          <td>{{ item.sell == true ? "Vente" : "Achat" }}</td>
          <td>{{ item._id }}</td>
          <td>{{ item.reference_id }}</td>
        </tr>


        </tbody>
        </table>
    </div>
  </div>

</template>

<script>


  import { DELETE_VALUE } from '~/apollo/mutation'

    import ManageTableInput from "./ManageTableInput";
    export default {
        name: "ManageTableValue",
      components: {ManageTableInput},
      data() {
        return {
          CurrentValue: { id: "", link: "", price: "", date:"", sell: false},
          ModalValue: false

        }
      },

      methods: {
        DeleteElem: function () {


          this.$apollo.mutate({
            mutation:  DELETE_VALUE,
            variables: {
              _id : this.CurrentValue.id
            }
          })
          window.location.reload(true)
        },
      },
      computed: {
        items() {
          return this.$store.state.current_list_value;
        }
      },
    }
</script>

<style scoped>

  .table tr.is-selected{
  color: white;
  background-color: black;
}


  .tag--click{
    cursor: pointer;
  }

</style>
