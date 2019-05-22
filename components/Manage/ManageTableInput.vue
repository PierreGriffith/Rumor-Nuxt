<template>
    <div>

      <div class="container">

        <div class="columns is-mobile">

          <div class="column">

            <p>Link</p>
            <br>
            <input v-model="link" class="input" type="text" placeholder="Link">

          </div>


          <div class="column">

            <p>Value</p>
            <br>
            <input v-model="value" class="input" type="text" placeholder="Value">

          </div>



          <div class="column">

            <p>Date</p>
            <br>
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input v-model="date" class="input" type="text" placeholder="Date">
              </p>
              <p class="control">
                <a class="button is-dark">
                 Send
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
        name: "ManageTableInput",
       props: {
        link: String,
        date: String,
        value: String,
       },


    }
</script>

<style scoped>

</style>
