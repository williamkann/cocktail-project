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
        <v-card width="1300" class="mx-auto">
          <v-list three-line>
            <template v-for="(cocktail, index) in visibleCocktails" :visibleCocktails="visibleCocktails" :currentPage="currentPage">
              <v-subheader
                v-if="cocktail.header"
                :key="cocktail.header"
                v-text="cocktail.strDrink"
              ></v-subheader>

              <v-divider
                v-else-if="cocktail.divider"
                :key="index"
                :inset="cocktail.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="cocktail.id"
                @click="test()"
              >
                <v-list-item-avatar>
                  <v-img :src="cocktail.strDrinkThumb"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="cocktail.strDrink"></v-list-item-title>
                  <v-list-item-subtitle v-html="cocktail.strInstructions"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <!-- Component Pagination -->
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
import { mapActions, mapGetters, mapState } from 'vuex'
import Pagination from './Pagination.vue'
export default {
  name: 'category',

  components: {
    Pagination
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
    searchRules: [s => !!s || 'search invalid'],
    currentPage: 0,
    pageSize: 10,
    visibleCocktails: []
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailsByName']),
    ...mapActions('cocktails', ['fetchCocktailsForCategory']),
    searchByName () {
      this.$router.push({ name: 'search', params: { value: this.search } })
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleCocktails()
    },
    updateVisibleCocktails () {
      this.visibleCocktails = this.cocktailsSearched.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)

      if (this.visibleCocktails.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  }
}
</script>
