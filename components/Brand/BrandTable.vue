<template>
  <table class="table is-fullwidth">
    <thead>
    <tr>
      <th>⚫</th>
      <th>Name</th>
      <th>In Base</th>
    </tr>
    </thead>

    <tbody>

    <tr v-for="item in types" :key="item._id">

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
        name: "BrandTable",
      props: {
          types: {types: Array }
      },filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      }
    }
</script>

<style scoped>

  .clikable__table{
    cursor: pointer;
  }

</style>
