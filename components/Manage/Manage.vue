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


    <ManageTableInput>

    </ManageTableInput>


    <div class="columns">
      <div class="column">

      </div>
    </div>

    <ManageTableRef>

    </ManageTableRef>


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
  import ManageTableInput from "./ManageTableInput";
  import ManageTableRef from "./ManageTableRef";


    export default {
        name: "Manage",
      components: {ManageTableRef, ManageTableInput, ManageType, ManageBrand, ManageRef}
    }
</script>

<style scoped>

</style>
