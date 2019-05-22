<template>
  <section class="hero is-small header__presentation">
    <div class="">



<div class="columns is-mobile">
  <span class="column">
    &nbsp;&nbsp;{{ now | moment('h:mm:ss a')   }}
  </span>

  <span class="column has-text-centered">
    watches's values ⌚&nbsp;&nbsp;
  </span>

  <div class="column is-hidden-mobile">

  </div>

</div>





    </div>
  </section>
</template>

<script>
    export default {
        name: "HeaderPres",
      data() {
        return {
          now: new Date()
        }
      },
      created () {
        setInterval(() => this.now = new Date, 1000)
      }
    }

</script>

<style scoped>
.header__presentation {
  border-top-style: solid;
  border-bottom-style: solid;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
}


</style>
