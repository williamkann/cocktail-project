<template>
  <v-container>
    <h1>Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website<v-btn @click="createNewCocktail()"><v-icon>mdi-plus</v-icon></v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
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
h1 { color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center; }

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
    ...mapState('cocktails', ['cocktails'])
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
    }
  }
}
</script>
