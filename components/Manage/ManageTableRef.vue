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

        <ManageTableInput v-bind:date="CurrentValue.date"  v-bind:value="CurrentValue.value" v-bind:link="CurrentValue.href">

        </ManageTableInput>

        </section>
        <footer class="modal-card-foot">
          <button @click="ModalValue=false;" class="button is-success">Save changes</button>
          <button @click="ModalValue=false;" class="button is-danger">Delete</button>
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

        </tr>
        </thead>

        <tfoot>
        <tr>

          <th> Value </th>
          <th>Date </th>
          <th>Link</th>
        </tr>
        </tfoot>

        <tbody>


        <tr class="tag--click" v-for="item in items" :key="item.id"
            v-on:dblclick="ModalValue = true"

            v-bind:class="{ 'is-selected': item.id === CurrentValue.id }"

            @click="CurrentValue.id=item.id;
            CurrentValue.value=item.value;
            CurrentValue.href=item.href;
            CurrentValue.date=item.date">

          <td>{{ item.value}}</td>
          <td>{{ item.date }}</td>
          <td><a :href="item.href" :title="item.id">{{ item.href}}</a>
          </td>
        </tr>


        </tbody>
        </table>
    </div>
  </div>

</template>

<script>



    import ManageTableInput from "./ManageTableInput";
    export default {
        name: "ManageTableRef",
      components: {ManageTableInput},
      data() {
        return {
          items: [
            {
              id: "1444",
              href: "https://www.ebay.fr/itm/montre-ROLEX-vintage-mouvement-Prima/333192200753?hash=item4d93cd8231:g:eVwAAOSwPQBc1t2N",
              value: "555",
              date: "22/02/2019"
            },
            {
              id: "17789",
              href: "https://www.ebay.fr/itm/montre-ROLEX-vintage-mouvement-Prima/333192200753?hash=item4d93cd8231:g:eVwAAOSwPQBc1t2N",
              value: "585",
              date: "22/02/2019"
            },
            {
              id: "1448",
              href: "https://www.ebay.fr/itm/montre-ROLEX-vintage-mouvement-Prima/333192200753?hash=item4d93cd8231:g:eVwAAOSwPQBc1t2N",
              value: "755",
              date: "22/02/2019"
            },


          ],

          CurrentValue: { id: "", href: "", value: "", date:""},
          ModalValue: false

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

  .table tr.is-selected{
  color: white;
  background-color: black;
}


  .tag--click{
    cursor: pointer;
  }

</style>
