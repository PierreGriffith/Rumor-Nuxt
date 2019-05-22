<template>
  <footer class="footer main__color">
    <div class="columns">
      <div class="column  has-text-centered">
        <br>
        <p>Proudly made in <strong>France</strong> </p>
        <p>Find the real values of your watches ⌚</p>
        <strong class="link__footer"> <a>Twitter</a> ⚫ <a>Terms & Conditions</a> - <a>Contact us</a> </strong>
      </div>
    </div>
  </footer>
</template>

<script>


    export default {
        name: "Footer",
    }
</script>

<style lang="scss">
  @import '~assets/scss/app.scss';

  .main__color{
    background-color: $background-main;
  }


.link__footer a{
  color: saddlebrown;
}

</style>

