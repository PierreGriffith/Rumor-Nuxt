<template>
    <div class="container">

      <div class="modal" v-bind:class="{ 'is-active': ModalUser }">
        <div class="modal-background" @click="ModalUser=false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">  {{ CurrUser._id }}  " : "  {{ CurrUser.name }}</p>
            <button @click="ModalUser=false" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">


            <div class="">

              <div class="column">
                <p class="modal-card-title"> Created at : {{ CurrUser.creation }} </p>
              </div>

              <div class="column">
                <input class="input" v-model="CurrUser.name" type="text" placeholder="Name">
              </div>

              <div class="column">
                <input class="input" v-model="CurrUser.email" type="text" placeholder="Email">
              </div>

              <div class="column">
                <input class="input" v-model="CurrUser.password" type="text" placeholder="Password">
              </div>

              <div class="column">
                <input class="input" v-model="CurrUser.birthday" type="date" placeholder="">
              </div>

              <div class="column">
                <label class="checkbox">
                  <input v-model="CurrUser.admin" type="checkbox" >
                  ADMIN
                </label>
              </div>

              <div class="column">
                <label class="checkbox">
                  <input v-model="CurrUser.newsletter" type="checkbox">
                  NewLetter
                </label>
              </div>

              <div class="column">
                <a class="button is-primary">SEND</a>
              </div>

            </div>


          </section>
          <footer class="modal-card-foot">
            <button @click="UpdateElem" class="button is-success">Save changes</button>
            <button @click="DeleteElem" class="button is-danger"> Delete</button>
            <button @click="ModalUser=false" class="button">Cancel</button>
          </footer>
        </div>        <button class="modal-close is-large" aria-label="close"></button>
      </div>

      <table class="table is-fullwidth">
        <thead>
        <tr>
          <th><abbr title="Name"> Name</abbr></th>
          <th><abbr title="Email">Email</abbr></th>
          <th><abbr title="Password">Password</abbr></th>
          <th><abbr title="Birthday">Birthday</abbr></th>
          <th><abbr title="Creation">Creation</abbr></th>
          <th><abbr title="Admin">Admin</abbr></th>
          <th><abbr title="News_letter">News_letter</abbr></th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user._id" v-on:dblclick="CurrUser=user;ModalUser=true">
          <td>{{user.name }}</td>
          <td>{{user.email }}</td>
          <td>{{user.password }}</td>
          <td>{{user.birthday }}</td>
          <td>{{user.creation }}</td>
          <td>{{user.admin }}</td>
          <td>{{user.newsletter }}</td>
        </tr>

        </tbody>
      </table>

    </div>
</template>

<script>

  import {ALL_USERS} from '~/apollo/queries'
  import { DELETE_USER, UPDATE_USER } from '~/apollo/mutation'

  export default {
        name: "ManageTableUser",

    data () {
      return {
        CurrUser: {},
        users: [],
        ModalUser: false,
        time: new Date(),
        name: '',
        email: '',
        password: '',
        birthday: '',
        admin: false,
        newsletter: true,
      }
    },
    methods: {

      DeleteElem: function (value) {
      console.log(this.CurrUser._id)
        this.$apollo.mutate({
          mutation: DELETE_USER,
          variables: {
            _id: this.CurrUser._id
          }
        }).then(({ data }) => {
          window.location.reload(true)
        })
      },
 UpdateElem: function () {

        this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            _id: this.CurrUser._id,
            name: this.CurrUser.name,
            email: this.CurrUser.email,
            password: this.CurrUser.password,
            birthday: this.CurrUser.birthday,
            creation:  this.CurrUser.creation,
            admin: this.CurrUser.admin,
            newsletter: this.CurrUser.newsletter,
          }
        }).then(({ data }) => {

          console.log(data)
        window.location.reload(true)
        })
      },




    },

      beforeCreate(){
        this.$apollo.query({
          query: ALL_USERS})
          .then(({ data }) => {
           this.users = data.users
          })
      }

    }
</script>

<style scoped>

</style>
