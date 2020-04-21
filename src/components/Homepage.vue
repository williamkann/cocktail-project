<template>
  <v-container>
    <h1 id="logo">WikiDrink</h1>
    <v-img src="../assets/ic_logo.png" height="10rem" width="10rem"/>
    <v-toolbar flat height="110%">
      <v-toolbar-title><router-link to="/">Homepage</router-link><v-btn @click="createNewCocktail()"><v-icon>mdi-plus</v-icon></v-btn></v-toolbar-title>
      <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
      <span v-else><router-link to="/login">Login</router-link> | <router-link to="/register">Register</router-link> </span>
      <v-spacer></v-spacer>
      <!-- Filter section -->
      <v-col class="d-flex" cols="12" sm="6" md="1">
          <v-switch v-model="selectionFilter" label="Select your filter"></v-switch>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" md="2">
        <v-select
          :items="filterAlcoholicItems"
          v-model="defaultAlcoholic"
          label="Filter Alcohol"
          :disabled="selectionFilter"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" md="2">
        <v-select
          :items="filterCategoryItems"
          v-model="defaultCategory"
          label="Filter Category"
          :disabled="!selectionFilter"
          dense
          outlined
        ></v-select>
      </v-col>
      <!-- Search section -->
      <div>
        <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
      </div>
      <v-btn @click="searchByName()"><v-icon>mdi-magnify</v-icon></v-btn>
    </v-toolbar>
    <v-alert outlined color="#3366cc">
      <!-- Components of the homepage -->
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <CategoryHomepage />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <RandomHomepage />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <CocktailsChar />
        </v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>

<style scoped>
v-img {
  position: right 35% bottom 45%;
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
import { mapState } from 'vuex'
import CategoryHomepage from './CategoryHomepage.vue'
import RandomHomepage from './RandomHomepage.vue'
import CocktailsChar from './CocktailsChar.vue'
export default {
  name: 'homepage',

  components: {
    CategoryHomepage,
    RandomHomepage,
    CocktailsChar
  },

  computed: {
    ...mapState('cocktails', ['cocktails']),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },

  async mounted () {
  },

  data: () => ({
    search: '',
    selectionFilter: true,
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    filterAlcoholicItems: ['Alcoholic', 'Non alcoholic', 'None'],
    filterCategoryItems: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other / Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drinke', 'Beer', 'Soft Drink / Soda', 'None'],
    defaultAlcoholic: 'None',
    defaultCategory: 'None'
  }),

  methods: {
    searchByName () {
      if (!this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: 'None', filterAlcohol: this.defaultAlcoholic } })
      } else if (this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: this.defaultCategory, filterAlcohol: 'None' } })
      }
    },
    login () {
      this.$router.push({ name: 'login' })
    },
    createNewCocktail () {
      this.$router.push({ name: 'createCocktail' })
    },
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
