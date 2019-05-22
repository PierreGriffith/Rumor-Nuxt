<template>
  <div class="container">
    <section class="hero is-small">
      <p class="title has-text-centered font__main">
        {{ title }}
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    name: "TitlePage",
    props: {
      title: {type: String, default: ""},
    },
  }
</script>
