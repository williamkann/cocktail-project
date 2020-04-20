<template>
    <v-container>
        <h1>Un titre</h1>
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
                        label="name"
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
                <v-btn text large color="primary" @click="register()">Register new account</v-btn>
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
    register: function () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
