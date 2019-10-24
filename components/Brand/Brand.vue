<template>
  <div class="container">

    <hr class="hr__cote">
    <article class="media">
      <figure class="image is-64x64">
          <img :src=this.image>
      </figure>
      <div class="media-content">
        <div class="content has-text-centered">
          <p>
            <strong><a class="number__color">{{ this.nom  | capitalize }}</a></strong>  <small> - </small>
            <br>
            {{ this.description}}
          </p>
        </div>
      </div>
    </article>
    <hr class="hr__cote">

  </div>
</template>

<script>


  export default {
    name: "Brand",
    props: {
      image: {type:  String , default: "/preload/logo_watch.png"},
      nom: { type: String, default: ""},
      description: { type: String, default: ""}
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style scoped>

  .number__color{
    color: #127749
  }


  .hr__cote{
    background-color: #e6e6e6;
    border: none;
    display: block;
    height: 2px;
    margin: 0.5rem 0;
  }

</style>
