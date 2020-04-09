<template>
  <v-container>
    <h1>Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website</v-toolbar-title>
      <v-spacer></v-spacer>
        <div>
          <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
        </div>
        <v-btn @click="searchByName()">Search</v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <!-- Components of the homepage -->
        <v-row>
          <v-col cols="12" sm="2" md="12">
            {{this.cocktailsSearched}}
            <CategoryHomepage />
          </v-col>
          <v-col cols="12" sm="2" md="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" sm="2" md="12">
            <RandomHomepage />
          </v-col>
        </v-row>
      </v-alert>
  </v-container>
</template>

<style scoped>
h1 { color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center; }

</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CategoryHomepage from './CategoryHomepage.vue'
import RandomHomepage from './RandomHomepage.vue'
export default {
  name: 'homepage',

  components: {
    CategoryHomepage,
    RandomHomepage
  },

  computed: {
    ...mapState('cocktails', ['cocktails']),
    ...mapGetters('cocktails', ['getCocktailSearch'])
  },

  async mounted () {
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid']
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailByName']),
    async searchByName () {
      await this.fetchCocktailByName({ strDrink: this.search })
      this.cocktailsSearched = await this.getCocktailSearch(this.search)
    }
  }
}
</script>
