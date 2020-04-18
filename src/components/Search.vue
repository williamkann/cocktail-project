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
        <!-- Filter number of cocktails to display -->
        {{this.defaultAlcoholic}}
        {{this.defaultCategory}}
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
         <div v-for="(cocktail) in visibleCocktails" :key="cocktail.id" :visibleCocktails="visibleCocktails" :currentPage="currentPage">

          <v-list-item three-line @click="loadCocktail(cocktail)">
            <v-list-item-avatar
              tile
              size="80"
            >
            <v-img :src="cocktail.strDrinkThumb"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{cocktail.strDrink}}</v-list-item-title>
              <v-list-item-subtitle>{{cocktail.strInstructions}}</v-list-item-subtitle>
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
      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)
      this.updateVisibleCocktails()
    },
    pageSize: function () {
      this.updateVisibleCocktails()
    }
  },
  computed: {
    ...mapGetters('cocktails', ['getCocktailSearch']),
    ...mapGetters('cocktails', ['getCocktailsByCategory']),
    value: function () {
      return this.$route.params.value
    },
    defaultCategory: function () {
      return this.$route.params.filterCategory
    },
    defaultAlcoholic: function () {
      return this.$route.params.filterAlcohol
    }
  },

  async mounted () {
    if (this.defaultAlcoholic === 'None' && this.defaultCategory === 'None') {
      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)
      console.log('2 None')
    } else if (this.defaultAlcoholic === 'None' && this.defaultCategory !== 'None') {
      await this.fetchCocktailsByCategory({ category: this.defaultCategory })
      this.cocktailsCategory = await this.getCocktailsByCategory({ strCategory: this.defaultCategory })

      console.log('cocktail category are ', JSON.parse(JSON.stringify(this.cocktailsCategory)))

      await this.fetchCocktailsByName({ strDrink: this.value })
      this.cocktailsSearched = await this.getCocktailSearch(this.value)

      console.log('cocktail searched are ', JSON.parse(JSON.stringify(this.cocktailsSearched)))

      this.cocktailsSearched = await this.intersect(this.cocktailsCategory, this.cocktailsSearched)
      console.log('cocktail intersect are ', JSON.parse(JSON.stringify(this.cocktailsSearched)))
      console.log('Alcoholic is None')
    } else if (this.defaultAlcoholic !== 'None' && this.defaultCategory === 'None') {
      console.log('Category is None')
    }
    this.updateVisibleCocktails()
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    cocktailsCategory: [],
    ingredientsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    currentPage: 0,
    pageSize: 10,
    visibleCocktails: []
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailsByName']),
    ...mapActions('cocktails', ['fetchCocktailsByCategory']),
    searchByName () {
      this.$router.push({ name: 'search', params: { value: this.search } })
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
      console.log(a.length)
      console.log(b)
      a.forEach(function (a) {
        console.log(a.strDrink)
        b.forEach(function (b) {
          if (a.strDrink === b.strDrink) {
            console.log('Equal')
            intersection.push(a)
          }
        })
      })
      console.log(intersection)
      return intersection
    }
  }
}
</script>
