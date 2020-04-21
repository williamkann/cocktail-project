<template>
    <v-container>
        <h1 id="logo">WikiDrink</h1>
        <img src="../assets/ic_logo.png" height="250rem" width="240rem" class="center"/>
        <v-card
            class="mx-auto"
            max-width="500"
            outlined
        >
            <v-form v-model="valid">
            <v-container>
                <v-row justify-md="center">
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :counter="50"
                        label="Name"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        :counter="50"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="password"
                        type="password"
                        :rules="passwordRules"
                        :counter="50"
                        label="Password"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="passwordConfirmation"
                        :rules="passwordRules"
                        type="password"
                        :counter="50"
                        label="Password Confirmation"
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <div class="text-md-center">
                <v-btn text large color="primary" @click="registerNewAccount()">Register new account</v-btn>
                </div>
            </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#logo {
  position: absolute;
  text-align: center;
  font-family: 'Helvetica Neue', 'Open Sans', sans-serif;
  color: #3366cc;
  text-decoration: none;
  text-transform: none;
  font-size: 150px;
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1.5;
  text-shadow: rgb(255, 255, 255) 3px 2px 0;
  position: relative;
}
#logo:after {
  content:"dreamdealer";
  position: absolute;
  left: 8px;
  top: 32px;
}
#logo:after {
  background-image: -webkit-linear-gradient(left top, transparent 0%, transparent 25%, #555 25%, #555 50%, transparent 50%, transparent 75%, #555 75%);
  background-size: 4px 4px;
  -webkit-text-fill-color: transparent;
  z-index: -5;
  display: block;
  text-shadow: none;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'register',
  data: () => ({
    valid: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 50 || 'Name must be less than 50 characters'],
    emailRules: [
      v => !!v || 'Email is required',
      v => v.length <= 50 || 'Email must be less than 50 characters'],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length <= 20 || 'Password must be less than 20 characters']
  }),

  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },

  methods: {
    ...mapActions('user', ['register']),
    registerNewAccount: function () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.register({ user: data }).then(
        this.$router.push({ name: 'login' })
      )
    }
  }
}
</script>
