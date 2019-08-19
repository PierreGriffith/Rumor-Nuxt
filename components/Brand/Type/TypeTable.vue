<template>


  <table class="table is-fullwidth">
    <thead>
    <tr>
      <th>⚫</th>
      <th>Ref</th>
      <th>In base</th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="item in refs" :key="item._id">

      <th>-</th>

      <td  class="clikable__table">

        <nuxt-link :to="{ path: item.name}" append>      {{ item.name | capitalize }} </nuxt-link>

      </td>

      <th></th>

    </tr>


    </tbody>
  </table>
</template>

<script>
    export default {
        name: "TypeTable",
      props: {
        refs: {types: Array }
      }
    }
</script>

<style scoped>

  .clikable__table{
    cursor: pointer;
  }


</style>
