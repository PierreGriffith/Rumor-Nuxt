<template>

  <div>

    <div class="columns">
      <div class="column">

      </div>
    </div>

    <ManageBrand>

    </ManageBrand>



    <div class="columns">
      <div class="column">

      </div>
    </div>


    <ManageType>

    </ManageType>


    <div class="columns">
      <div class="column">

      </div>
    </div>

    <ManageRef>

    </ManageRef>


    <div class="columns">
      <div class="column">

      </div>
    </div>


    <ManageValue>

    </ManageValue>


    <div class="columns">
      <div class="column">

      </div>
    </div>

    <ManageTableValue>

    </ManageTableValue>


    <div class="columns">
      <div class="column">

      </div>
    </div>
    <div class="columns">
      <div class="column">

      </div>
    </div>


  </div>
</template>

<script>
  import ManageBrand from "./ManageBrand";
  import ManageType from "./ManageType";
  import ManageRef from "./ManageRef";
  import ManageValue from "./ManageValue";
  import ManageTableValue from "./ManageTableValue";


    export default {
        name: "Manage",
      components: {ManageTableValue, ManageType, ManageBrand, ManageRef, ManageValue}
    }
</script>

<style scoped>

</style>
