<template>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="columns is-mobile">

          <span class="column">
            WATCHES : <a class="number__color"> {{ WatchNumber }} </a>
          </span>

          <span class="column">
              BRAND : <a class="number__color"> {{ WatchBrand}}</a>
          </span>

          <div class="column is-hidden-mobile">
          </div>

          <div class="column is-hidden-mobile">
          </div>

          <div class="column is-hidden-mobile">
          </div>

          <div class="column is-hidden-mobile">
          </div>

        </div>
      </div>
    </section>
</template>

<script>
    export default {
        name: "HeaderNumbers",
      data() {
        return {
          WatchNumber: 666,
          WatchBrand: 54,
        };
      },
    }
</script>

<style scoped>

  .number__color{
    color: #127749
  }

</style>
