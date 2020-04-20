<template>
    <v-container>
        <h1>Un titre</h1>
        <v-card
            class="mx-auto"
            max-width="500"
            outlined
        >
            <v-form v-model="valid" @submit.prevent="login">
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
                <v-btn text large color="primary">Sign in !</v-btn>
                </div>
            </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<style scoped>
h1 { color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 150px; letter-spacing: -1px; line-height: 2; text-align: center; }

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
    login: function () {
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
