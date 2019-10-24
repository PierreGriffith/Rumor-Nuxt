<template>
    <div>
    <manage-user>
    </manage-user>

      <div class="columns">
        <div class="column">

        </div>
      </div>

      <manage-table-user>

      </manage-table-user>


    </div>
</template>

<script>
    import ManageUser from "./ManageUser";
    import ManageTableUser from "./ManageTableUser";
    export default {
        name: "ManageU",
      components: {ManageTableUser, ManageUser}
    }
</script>

<style scoped>

</style>
