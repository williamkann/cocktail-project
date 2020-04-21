<template>
  <v-container>
    <v-row justify-md="center">
      <v-col cols="12" sm="5" md="5"></v-col>
      <v-col cols="12" sm="2" md="2">
        <v-btn color="primary" @click="generateRandom()">
            Random cocktail
        </v-btn>
      </v-col>
      <v-col cols="12" sm="5" md="5"></v-col>
    </v-row>
    <!-- Titles -->
    <v-row>
      <v-col cols="12" sm="4" md="4">
          <h1 justify-md="center"><v-icon>mdi-glass-tulip</v-icon>{{cocktailRandom.strDrink}}</h1>
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
          <v-img :src="cocktailRandom.strDrinkThumb" :lazy-src="cocktailRandom.strDrinkThumb" height="500px" width="500px">
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
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title>
                {{cocktailRandom.strCategory}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title>
                {{cocktailRandom.strAlcoholic}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item one-line>
            <v-list-item-content>
              <v-list-item-title>
                {{cocktailRandom.strGlass}}
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
          <div>{{cocktailRandom.strInstructions}}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1, div {
  color: white;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'randomHomepage',
  data () {
    return {
      isAlcoholic: false,
      cocktailRandom: {}
    }
  },
  props: {
  },

  computed: {
  },
  async mounted () {
    await this.fetchRandomCocktail()
    this.cocktailRandom = await this.getCocktailRandom().drinks[0]
    if (this.cocktailRandom.strAlcoholic === 'Non alcoholic') {
      console.log(this.isAlcoholic)
    }
  },
  methods: {
    ...mapActions('cocktails', ['fetchRandomCocktail']),
    ...mapGetters('cocktails', ['getCocktailRandom']),
    async generateRandom () {
      await this.fetchRandomCocktail()
      this.cocktailRandom = await this.getCocktailRandom().drinks[0]
    },
    getIngredients () {
      var cocktailRandomIngredients = []
      const regexIngredient = /^strIngredient[0-9]{1,2}$/
      for (var cocktail in this.cocktailRandom) {
        if (cocktail.match(regexIngredient) !== null) {
          cocktailRandomIngredients.push(this.cocktailRandom[cocktail])
        }
      }
      return cocktailRandomIngredients
    },
    getMeasures () {
      var cocktailRandomMeasures = []
      const regexIngredient = /^strMeasure[0-9]{1,2}$/
      for (var cocktail in this.cocktailRandom) {
        if (cocktail.match(regexIngredient) !== null) {
          cocktailRandomMeasures.push(this.cocktailRandom[cocktail])
        }
      }
      return cocktailRandomMeasures
    },
    loadIngredient (Ingredient) {
      this.$router.push({ name: 'ingredient', params: { ingredientName: Ingredient } })
    }
  }
}
</script>
