<template>
  <div id="list-complete-demo" class="demo container">
    <div class="control">
      <input class="input" type="text" placeholder="Looking for a brand..."  :value="inputValue">
    </div>


    <button v-on:click="shuffle">Shuffle</button>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name="list-complete" class="has-text-centered" tag="div">

      <div
      v-for="item in items"
      v-bind:key="item"
      class="list-complete-item column is-3"
    >

       <p class="title has-text-centered"> {{ item }} </p>

    </div>
    </transition-group>


  </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          items: ["Rolex", 2, 3, 4, 5, 6, 7, 8, 9],
          nextNum: 10,
          inputValue: ""
        }
      },

      methods: {
        randomIndex: function () {
          return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
          this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
          this.items.splice(this.randomIndex(), 1)
        },
        shuffle: function () {
          this.items = _.shuffle(this.items)
        },

      },

      computed: {
        checkValue() {
          return this.items.filter( x => x.search(this.inputValue) !== -1)
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

  .input:focus {
    border-color: #000000;
    box-shadow: 0 0 0 0.125em rgb(255, 255, 255);
  }
</style>
