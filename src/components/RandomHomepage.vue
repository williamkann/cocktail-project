<template>
  <v-container>
    <v-row justify-md="center">
      <v-col cols="12" sm="2" md="4">{{this.isAlcoholic}}</v-col>
      <v-col cols="12" sm="2" md="2">
        <v-checkbox v-model="isAlcoholic" label="Alcoholic drink"></v-checkbox>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-btn color="primary" @click="generateRandom()">
            Random Generation
        </v-btn>
      </v-col>
      <v-col cols="12" sm="2" md="4"></v-col>
    </v-row>
    <!-- Titles -->
    <v-row>
      <v-col cols="12" sm="2" md="4">
          <h1 justify-md="center"><v-icon>mdi-glass-tulip</v-icon>{{cocktailRandom.strDrink}}</h1>
      </v-col>
              <v-col cols="12" sm="2" md="4">
          <h1 justify-md="center"><v-icon>mdi-view-list</v-icon>Ingredients</h1>
      </v-col>
      <v-col cols="12" sm="2" md="4">
          <h1 justify-md="center"><v-icon>mdi-comment-text-outline</v-icon> Description</h1>
      </v-col>
    </v-row>
    <!-- Contents of each titles -->
    <v-row justify="space-around">
      <v-col cols="12" sm="2" md="4">
          <v-img :src="cocktailRandom.strDrinkThumb" height="500px" width="500px"></v-img>
      </v-col>
      <v-col cols="12" sm="2" md="4">
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
                  <v-list-item  @click="test()">
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
      <v-col cols="12" sm="2" md="4">
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
    test () {
      console.log('clicked')
    }
  }
}
</script>
