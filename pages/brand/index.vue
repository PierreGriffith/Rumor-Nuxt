<template>
  <div id="list-complete-demo" class="demo container">

  <div class="columns">
    <div class="column"></div>
  </div>

    <div class="control">

    <div class="columns is-mobile">

      <div class="column"> </div>

      <div class="column">
        <input class="input" type="text" v-on:input="searchbrand" placeholder="Looking for a brand..."  v-model="inputValue">

      </div>

      <div class="column"> </div>

    </div>
    </div>

    <transition-group name="list-complete" class="has-text-centered" tag="div">

      <div
      v-for="item in items"
      v-bind:key="item._id"
      class="list-complete-item column is-3"
    >

       <p class="title has-text-centered">
         <nuxt-link :to=item.name  append>
         {{ item.name | capitalize }}
         </nuxt-link>
       </p>

    </div>
    </transition-group>


  </div>
</template>

<script>

  import { ALL_BRANDS} from '~/apollo/queries'

  export default {
      name: "index",
      data() {
        return {
          items: [],
          items_refresh: [],
          nextNum: 10,
          inputValue: ""
        }
      },

      methods: {
        searchbrand: function () {
          this.items = this.items_refresh.filter(item => item.name.search(this.inputValue.toLocaleLowerCase() ) !== -1 )
        },
      },

    beforeCreate() {
        this.$apollo.query({
          query: ALL_BRANDS})
          .then(({ data }) => {
            this.items = data.brands
            this.items_refresh = data.brands
          })

      },filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toUpperCase()
        }
      }
    }
</script>



<style scoped>
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }

  a {
    color: #1a7b4b;
    cursor: pointer;
    text-decoration: none;
  }

  .input:focus {
    border-color: #000000;
    box-shadow: 0 0 0 0.125em rgb(255, 255, 255);
  }
</style>
