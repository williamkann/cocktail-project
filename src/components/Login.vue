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
                    :counter="20"
                    label="Password"
                    required
                    ></v-text-field>
                </v-col>
                </v-row>
                <div class="text-md-center">
                <v-btn text large color="primary" @click="signIn()">Sign in !</v-btn>
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
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data: () => ({
    valid: '',
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => v.length <= 50 || 'Email must be less than 20 characters'],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length <= 20 || 'Password must be less than 20 characters']
  }),

  computed: {

  },

  methods: {
    ...mapActions('user', ['login']),
    async signIn () {
      // connecter l'utilisateur
      this.login({ email: this.email, password: this.password }).then(
        this.$router.push({ name: 'homepage' }))
    }
  }
}
</script>
