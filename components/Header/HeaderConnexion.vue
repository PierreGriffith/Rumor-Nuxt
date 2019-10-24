<template>
  <div>
    <div class="modal"  v-bind:class="{ 'is-active': modalValue }">
      <div  @click="CloseModal()" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">👐 WELCOME 👐<br>(ADMIN ONLY)</p>
          <button @click="CloseModal()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <label for="email">email:</label>
              <input v-model="email"  id="email" class="input is-primary" type="text">
            </div>
          </div>
          <div class="field">
          <div class="control">
            <label for="pass">Password (8 characters minimum):</label>
            <input v-model="password"   id="pass" type="password" class="input is-primary">
          </div>
        </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="Login()" class="button is-success">Login</button>
          <button class="button">Register</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import { ApolloClient } from 'apollo-client';
  import { createHttpLink } from 'apollo-link-http';
  import { setContext } from 'apollo-link-context';
  import { InMemoryCache } from 'apollo-cache-inmemory';

  import {LOGIN} from '~/apollo/mutation'

  import {mapState} from 'vuex'
    export default {
        name: "HeaderConnexion",
      computed: {
          ...mapState({
          modalValue: state => state.modal_connexion
        })
      },
      data () {
        return {
          email: "",
          password: "",
          logged: false,
        }
      },
      methods : {
       CloseModal : function(){
         this.$store.commit('set_modal_connexion', false)

       },
       Login: function(val) {

         this.$apollo.mutate({
           mutation: LOGIN,
           variables: {
             email: this.email,
             password: this.password,
           }
         }).then(({ data }) => {

           let token = data.login;
           this.$cookies.set("cookie-id", token, {
             path: "/",
             maxAge: 60 * 60 * 24 * 7
           });
           this.CloseModal()
           window.location.reload()

         })
       }
      },

      beforeCreate(){
        const cookieRes = this.$cookies.get("cookie-id");


      }


    }
</script>

<style scoped>

  .modal-card-head, .modal-card-foot {
    background-color: #fdffd9;
  }

  .modal-card-title {
    color: #000000;
    font-family: clarendon;
  }

  .is-primary.input, .is-primary.textarea {
    border-color: #0a0a0a;
  }


  .button.is-success {
    background-color: #127749;
    border-color: transparent;
    color: #fff;
  }

  .modal-card {
    background-color: #fdffd9;
  }

</style>
