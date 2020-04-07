<template>
  <v-container>
    <h1>Cocktail DB{{this.cocktails}}</h1>
    <v-app-bar color="#3366cc" dense dark>
      </v-app-bar>
      <v-alert outlined color="#3366cc">
        <v-row justify-md="center">
          <div v-for="category in this.categories" :key="category.id">
            <v-col cols="12" sm="2" md="12">
              <v-card height=200 width=350 @click="loadCategory()">
                <v-img
                  height="125"
                  class="grey darken-4"
                ></v-img>
                <v-card-title class="title">{{category.strCategory}}</v-card-title>
              </v-card>
            </v-col>
          </div>
        </v-row>
        <v-row>
          <v-col cols="12" sm="2" md="12">
            <div class="my-2">
              <v-btn medium @click="getRandomCocktail()">Random</v-btn>
            </div>
          </v-col>
        </v-row>

      </v-alert>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'homepage',

  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('cocktails', ['cocktails']),
    ...mapGetters('cocktails', ['getCocktailById'])
  },

  async mounted () {
    await this.fetchCategories()
  },

  data: () => ({
  }),

  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('cocktails', ['fetchFirstCocktailsForCategory']),
    ...mapActions('cocktails', ['fetchRandomCocktail']),
    ...mapActions('cocktails', ['fetchCocktail']),
    loadCategory: function () {
      console.log('Clicked a V-card')
    },
    async getRandomCocktail () {
      await this.fetchRandomCocktail()
      console.log(this.getCocktailById(this.cocktails))
    }
  }
}
</script>
