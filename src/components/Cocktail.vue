<template>
  <v-container>
    <h1 style="color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center;">Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website</v-toolbar-title>
      <v-spacer></v-spacer>
        <div>
          <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
        </div>
        <v-btn @click="searchByName()">Search</v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <!-- Components of the detail page -->
        <!-- Titles -->
        <v-row>
          <v-col cols="12" sm="4" md="4">
              <h1 justify-md="center"><v-icon>mdi-glass-tulip</v-icon>{{this.cocktailDisplay.strDrink}}</h1>
          </v-col>
                  <v-col cols="12" sm="4" md="4">
              <h1 justify-md="center"><v-icon>mdi-view-list</v-icon>Ingredients</h1>
          </v-col>
          <v-col cols="12" sm="4" md="4">
              <h1 justify-md="center"><v-icon>mdi-comment-text-outline</v-icon> Description</h1>
          </v-col>
        </v-row>
        <!-- Contents of each titles -->
        <v-row justify="space-around">
          <v-col cols="12" sm="4" md="4">
              <v-img :src="this.cocktailDisplay.strDrinkThumb" height="500px" width="500px"></v-img>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-card class="mx-auto" max-width="400" tile>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{this.cocktailDisplay.strCategory}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{this.cocktailDisplay.strAlcoholic}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    {{this.cocktailDisplay.strGlass}}
                  </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card class="mx-auto" max-width="400" tile>
              <v-list one-line subheader>
                <v-subheader inset>Ingredient</v-subheader>
                <div v-for="(i, index) in this.getIngredients().length" :key="i.id">
                    <div v-if="getIngredients()[index] != null">
                      <v-list-item  @click="loadIngredient(getIngredients()[index])">
                        <v-list-item-content>
                          <v-list-item-title>{{getIngredients()[index]}}</v-list-item-title>
                          <v-list-item-subtitle>{{getMeasures()[index]}}</v-list-item-subtitle>
                        </v-list-item-content>
                        </v-list-item>
                    </div>
                </div>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" md="4">
              <div>{{this.cocktailDisplay.strInstructions}}</div>
          </v-col>
        </v-row>
      </v-alert>
  </v-container>
</template>

<style scoped>
h1, div {
  color: white;
}
</style>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'category',

  components: {
  },
  computed: {
    ...mapGetters('cocktails', ['getCocktailSearch']),
    ...mapGetters('cocktails', ['getCocktailsByCategory']),
    ...mapState('cocktails', ['cocktails']),
    ...mapGetters('cocktails', ['getCocktailById']),
    idCocktail () {
      return parseInt(this.$route.params.id)
    }
  },

  async mounted () {
    await this.fetchCocktailById({ id: this.idCocktail })
    this.cocktailDisplay = await this.getCocktailById({ idDrink: this.idCocktail })
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    cocktailDisplay: {}
  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktailById']),
    searchByName () {
      this.$router.push({ name: 'search', params: { value: this.search } })
    },
    getIngredients () {
      var cocktailIngredients = []
      const regexIngredient = /^strIngredient[0-9]{1,2}$/
      for (var cocktail in this.cocktailDisplay) {
        if (cocktail.match(regexIngredient) !== null) {
          cocktailIngredients.push(this.cocktailDisplay[cocktail])
        }
      }
      return cocktailIngredients
    },
    getMeasures () {
      var cocktailMeasures = []
      const regexIngredient = /^strMeasure[0-9]{1,2}$/
      for (var cocktail in this.cocktailDisplay) {
        if (cocktail.match(regexIngredient) !== null) {
          cocktailMeasures.push(this.cocktailDisplay[cocktail])
        }
      }
      return cocktailMeasures
    },
    loadIngredient (Ingredient) {
      this.$router.push({ name: 'ingredient', params: { ingredientName: Ingredient } })
    }
  }
}
</script>
