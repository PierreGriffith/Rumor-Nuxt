<template>
  <div class="container">


    <div class="columns is-mobile">
      <div class="column"></div>
      <div class="column">
      <p class="has-text-centered error__cote">
       ERROR {{error.statusCode}}
      </p>
        <p class="has-text-centered">
         <nuxt-link to="/">BACK TO HOME ?</nuxt-link>
        </p>

        <figure class="image">
          <img src="https://www.wykop.pl/cdn/c3201142/comment_ZbbwCOne9vJsQJprSi3YnC0RWjIcc2NO.gif">
        </figure>


      </div>
      <div class="column"></div>

    </div>

    <div class="columns">
      <div class="column"> </div>
    </div>


  </div>
</template>

<script>
    export default {
        name: "error",
        props: ['error'],
    }
</script>

<style scoped>

  .error__cote {
  font-size: 50px;
  font-family: clarendon;
  font-weight: bold;
  cursor: pointer;
  color: #363636;
  }
</style>
