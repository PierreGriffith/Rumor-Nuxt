<template>
  <div>
    <div class="container">


      <p class="has-text-centered title">
        CREATE AN USER
      </p>
      <p class="has-text-centered title">
      {{time = time | formatDate}}
      </p>

      <div class="columns">

        <div class="column">
          <input class="input" v-model="name" type="text" placeholder="Name">
        </div>

        <div class="column">
          <input class="input" v-model="email" type="text" placeholder="Email">
        </div>

        <div class="column">
          <input class="input" v-model="password" type="text" placeholder="Password">
        </div>

        <div class="column">
          <input class="input" v-model="birthday" type="date" placeholder="">
        </div>

        <div class="column">
          <label class="checkbox">
            <input v-model="admin" type="checkbox" >
            ADMIN
          </label>
        </div>

        <div class="column">
          <label class="checkbox">
            <input v-model="newsletter" type="checkbox">
            NewLetter
          </label>
        </div>

        <div class="column">
          <a @click="createUser" class="button is-primary">SEND</a>
        </div>

      </div>

      <div class="columns">
        <div class="column">

        </div>
      </div>

    </div>
  </div>
</template>

<script>

  import moment from 'moment'
  import { CREATE_USER } from '~/apollo/mutation'


  export default {
        name: "ManageUser",
      data () {
        return {
          time: new Date(),
          name: '',
          email: '',
          password: '',
          birthday: '',
          admin: false,
          newsletter: true,
        }
      },

    filters: {
      formatDate: function(value) {
      if (!value)
          return ''
       return moment(String(value)).format('MM/DD/YYYY hh:mm')

      }
    },
    methods: {
          createUser: function(){

            this.$apollo.mutate({
              mutation:  CREATE_USER,
              variables: {
                name: this.name,
                email: this.email,
                password: this.password,
                birthday: this.birthday,
                creation:  moment(String(this.time)).format('MM/DD/YYYY hh:mm'),
                admin: this.admin,
                newsletter: this.newsletter,
              }
            })   .then(({ data }) => {
              console.log(data)
            })

            window.location.reload(true)

          },
    }

  }
</script>

<style scoped>

</style>
