<template>
  <v-container>
    <h1 id="logo">WikiDrink</h1>
    <img src="../assets/ic_logo.png" height="250rem" width="240rem" class="center"/>
    <v-toolbar flat height="110%">
      <v-toolbar-title><router-link to="/">Homepage</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Filters section -->
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
        <!-- Filter number of cocktails to display -->
        <v-row>
          <v-col cols="12" md="7">
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="pageSize"
              label="Pagination length"
              max="25"
              min="1"
              step="1"
              style="width: 125px"
              type="number"
            ></v-text-field>
          </v-col>
      </v-row>
      <!-- Cocktails List -->
      <v-row>
        <v-col cols="12" md="12">
        <v-card class="mx-auto" max-width="1200" outlined>
          <div v-for="(cocktail) in visibleCocktails" :key="cocktail.id" :visibleCocktails="visibleCocktails" :currentPage="currentPage">
            <v-list-item three-line @click="loadCocktail(cocktail)">
              <v-list-item-avatar
                tile
                size="80"
              >
              <v-img :src="cocktail.strDrinkThumb" :lazy-src="cocktail.strDrinkThumb">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{cocktail.strDrink}}</v-list-item-title>
                <v-list-item-subtitle>{{cocktail.strInstructions}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- Component Pagination -->
      <v-row>
        <v-col cols="12" md="12">
          <Pagination :cocktailsSearched="this.cocktailsSearched"
                      v-on:page:update="updatePage"
                      :currentPage="this.currentPage"
                      :pageSize="this.pageSize"
          />
        </v-col>
      </v-row>
    </v-alert>
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
import { mapActions, mapGetters, mapState } from 'vuex'
import Pagination from './Pagination.vue'
export default {
  name: 'category',

  components: {
    Pagination
  },
  watch: {
    pageSize: function () {
      this.updateVisibleCocktails()
    }
  },
  computed: {
    ...mapGetters('cocktails', ['getCocktailSearch']),
    ...mapGetters('cocktails', ['getCocktailsByCategory']),
    ...mapState('cocktails', ['cocktails']),
    categoryName () {
      return this.$route.params.categoryName
    }
  },

  async mounted () {
    await this.fetchCocktailsForCategory({ category: this.categoryName })
    this.cocktailsSearched = await this.getCocktailsByCategory({ strCategory: this.categoryName })
    this.updateVisibleCocktails()
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    defaultAlcoholic: 'None',
    defaultCategory: 'None',
    searchRules: [s => !!s || 'search invalid'],
    currentPage: 0,
    pageSize: 10,
    visibleCocktails: [],
    selectionFilter: true,
    filterAlcoholicItems: ['Alcoholic', 'Non alcoholic', 'None'],
    filterCategoryItems: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other / Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drinke', 'Beer', 'Soft Drink / Soda', 'None']
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailsByName']),
    ...mapActions('cocktails', ['fetchCocktailsForCategory']),
    searchByName () {
      if (!this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: 'None', filterAlcohol: this.defaultAlcoholic } })
      } else if (this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: this.defaultCategory, filterAlcohol: 'None' } })
      }
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleCocktails()
    },
    updateVisibleCocktails () {
      const from = parseInt(this.currentPage) * parseInt(this.pageSize)
      const to = parseInt(this.currentPage * this.pageSize) + parseInt(this.pageSize)
      this.visibleCocktails = this.cocktailsSearched.slice(from, to)
      if (this.visibleCocktails.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    loadCocktail (cocktail) {
      this.$router.push({ name: 'cocktail', params: { id: cocktail.idDrink } })
    }
  }
}
</script>
