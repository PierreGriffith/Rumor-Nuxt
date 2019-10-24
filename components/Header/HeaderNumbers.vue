<template>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="columns is-mobile">

          <span class="column">
               <strong class="has-text-centered forum">
             <span>FORUM 🗣</span>️
                 <br>
             <span>BLOG 📰</span>️


            </strong>
          </span>

          <span class="column">
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

<style lang="scss" scoped>

  @import '~assets/scss/app.scss';

  .logo__main{
    font-size: 25px;
    font-family: $font-logo;
    font-weight: bold;
    cursor: pointer;
    color: #363636;
  }


  .forum{
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    color: #363636;
  }


  .number__color{
    color: #127749
  }

</style>
