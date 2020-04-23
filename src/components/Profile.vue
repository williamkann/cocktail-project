<template>
    <v-container>
      <div>
        <h1 id="logo">WikiDrink</h1>
        <img src="../assets/ic_logo.png" height="250rem" width="240rem" class="center"/>
        <v-toolbar flat height="110%">
          <v-toolbar-title><router-link to="/">Homepage</router-link> Your Profile</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </div>
      <v-alert outlined color="#3366cc">
        <!-- Components of the detail page -->
        <!-- Titles -->
        <v-row>
          <v-col cols="12" sm="6" md="6">
              <h1 justify-md="center">Personal Informations</h1>
          </v-col>
        </v-row>
        <!-- Contents of each titles -->
        <v-row justify="space-around">
            <v-col cols="12" sm="6" md="6">
                <v-card>
                    <div>lastname: {{ getCredentials.lastname }}</div>
                    <div>firstname: {{ getCredentials.firstname }}</div>
                    <div>email: {{ getCredentials.email }}</div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6">
            <v-card class="mx-auto" max-width="400" tile>
                <v-list-item one-line>
                <v-list-item-content>
                    <v-list-item-title>
                    <v-text-field
                        v-model="formdata.lastname"
                        label="LastName"
                        placeholder="LastName"
                        solo
                    ></v-text-field>
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                <v-list-item one-line>
                <v-list-item-content>
                    <v-list-item-title>
                    <v-text-field
                        v-model="formdata.firstname"
                        label="FirstName"
                        placeholder="FirstName"
                        solo
                    ></v-text-field>
                    </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                <v-list-item one-line>
                <v-list-item-content>
                    <v-list-item-title>
                    <v-text-field
                        v-model="formdata.email"
                        label="Email"
                        placeholder="Email"
                        solo
                    ></v-text-field>
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item one-line>
                <v-list-item-content>
                    <v-list-item-title>
                    <v-btn color="green" v-on:click="handleSubmit()">Submit</v-btn>
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
            <v-card class="mx-auto" max-width="400" tile>
            </v-card>
            </v-col>
        </v-row>
      </v-alert>
    </v-container>
</template>

<style scoped>
div {
  color: white;
}

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
  name: 'profile',
  data () {
    return {
      formdata: { firstname: '', lastname: '', email: '' },
      displayData: { firstname: '', lastname: '', email: '' }
    }
  },

  computed: {
    ...mapGetters('user', ['getUser']),
    getCredentials () {
      return this.getUser
    }
  },

  methods: {
    ...mapActions('user', ['updateUser']),
    handleSubmit () {
      this.updateUser(this.formdata)
    }
  }
}
</script>
