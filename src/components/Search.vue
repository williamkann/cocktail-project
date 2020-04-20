<template>
  <v-container>
    <h1>Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website</v-toolbar-title>
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
      <!-- Search field -->
      <div>
        <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
      </div>
      <v-btn @click="searchByName()"><v-icon>mdi-magnify</v-icon></v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <!-- Components of the homepage -->
        <!-- Filter number of cocktails to display -->
        <v-row>
        <v-col cols="12" md="3">
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
      <!-- Cocktails List  -->
       <v-card class="mx-auto" max-width="1200" outlined>
         <div v-if="visibleCocktails.length != 0">
          <div v-for="(cocktail) in visibleCocktails" :key="cocktail.id" :visibleCocktails="visibleCocktails" :currentPage="currentPage">

            <v-list-item three-line @click="loadCocktail(cocktail)">
              <v-list-item-avatar
                tile
                size="80"
              >
              <v-img :src="cocktail.strDrinkThumb" :src-lazy="cocktail.strDrinkThumb">
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
         </div>
         <div v-if="visibleCocktails.length == 0">
           <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Drink not found </v-list-item-title>
                <v-list-item-subtitle>This cocktail doesn't exist, create the cocktail <router-link to="/createCocktail">here</router-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
         </div>
        </v-card>
        <!-- Pagination component -->
        <Pagination :cocktailsSearched="this.cocktailsSearched"
                    v-on:page:update="updatePage"
                    :currentPage="this.currentPage"
                    :pageSize="this.pageSize"
        />
      </v-alert>
  </v-container>
</template>

<style scoped>
h1 { color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center; }

</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from './Pagination.vue'
export default {
  name: 'search',

  components: {
    Pagination
  },
  watch: {
    async $route (to, from) {
      this.search = this.value
      this.defaultCategory = this.category
      this.defaultAlcoholic = this.alcoholic
      if (this.defaultAlcoholic === 'None' && this.defaultCategory === 'None') {
        await this.fetchCocktailsByName({ strDrink: this.value })
        this.cocktailsSearched = await this.getCocktailSearch(this.value)
        console.log('2 None')
      } else if (this.defaultAlcoholic === 'None' && this.defaultCategory !== 'None') {
        await this.fetchCocktailsByCategory({ category: this.defaultCategory })
        this.cocktailsCategory = await this.getCocktailsByCategory({ strCategory: this.defaultCategory })

        await this.fetchCocktailsByName({ strDrink: this.value })
        this.cocktailsSearched = await this.getCocktailSearch(this.value)
        this.cocktailsSearched = await this.intersect(this.cocktailsCategory, this.cocktailsSearched)
      } else if (this.defaultAlcoholic !== 'None' && this.defaultCategory === 'None') {
        await this.fetchCocktailsByAlcoholic({ isAlcoholic: this.defaultAlcoholic })
        this.cocktailsAlcoholic = await this.getCocktailsByAlcoholic(this.defaultAlcoholic)

        await this.fetchCocktailsByName({ strDrink: this.value })
        this.cocktailsSearched = await this.getCocktailSearch(this.value)
        this.cocktailsSearched = await this.intersect(this.cocktailsAlcoholic, this.cocktailsSearched)
      }
      this.updateVisibleCocktails()
    },
    pageSize: function () {
      this.updateVisibleCocktails()
    }
  },
  computed: {
    ...mapGetters('cocktails', ['getCocktailSearch']),
    ...mapGetters('cocktails', ['getCocktailsByCategory']),
    ...mapGetters('cocktails', ['getCocktailsByAlcoholic']),
    value: function () {
      return this.$route.params.value
    },
    category: function () {
      return this.$route.params.filterCategory
    },
    alcoholic: function () {
      return this.$route.params.filterAlcohol
    }
  },

  async mounted () {
    if (this.alcoholic === 'None' && this.category === 'None') {
      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)
    } else if (this.alcoholic === 'None' && this.category !== 'None') {
      await this.fetchCocktailsByCategory({ category: this.category })
      this.cocktailsCategory = await this.getCocktailsByCategory({ strCategory: this.category })

      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)
      this.cocktailsSearched = await this.intersect(this.cocktailsCategory, this.cocktailsSearched)
    } else if (this.alcoholic !== 'None' && this.category === 'None') {
      await this.fetchCocktailsByAlcoholic({ isAlcoholic: this.alcoholic })
      this.cocktailsAlcoholic = await this.getCocktailsByAlcoholic(this.alcoholic)

      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)
      this.cocktailsSearched = await this.intersect(this.cocktailsAlcoholic, this.cocktailsSearched)
    }
    this.updateVisibleCocktails()
  },

  data: () => ({
    search: '',
    selectionFilter: true,
    cocktailsSearched: [],
    cocktailsCategory: [],
    cocktailsAlcoholic: [],
    defaultCategory: 'None',
    defaultAlcoholic: 'None',
    filterAlcoholicItems: ['Alcoholic', 'Non alcoholic', 'None'],
    filterCategoryItems: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other / Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drinke', 'Beer', 'Soft Drink / Soda', 'None'],
    searchRules: [s => !!s || 'search invalid'],
    currentPage: 0,
    pageSize: 10,
    visibleCocktails: []
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailsByName']),
    ...mapActions('cocktails', ['fetchCocktailsByCategory']),
    ...mapActions('cocktails', ['fetchCocktailsByAlcoholic']),
    searchByName () {
      if (!this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: 'None', filterAlcohol: this.defaultAlcoholic } })
      } else if (this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: this.defaultCategory, filterAlcohol: 'None' } })
      }
    },
    loadCocktail (cocktail) {
      this.$router.push({ name: 'cocktail', params: { id: cocktail.idDrink } })
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
    intersect: function (a, b) {
      var intersection = []

      a.filter(function (n) {
        for (var i = 0; i < b.length; i++) {
          if (n.idDrink === b[i].idDrink) {
            intersection.push(b[i])
          }
        }
      })
      return intersection
    }
  }
}
</script>
