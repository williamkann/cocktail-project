<template>
    <v-container>
        <v-row justify-md="center">
            <v-checkbox
                v-model="isAcoholic"
                label="Alcoholic drink"
            ></v-checkbox>
                <v-btn color="primary" @click="generateRandom()">
                    Random Generation
                </v-btn>
       </v-row>
        <v-row>
            <v-col cols="12" sm="2" md="12">
                <h1 justify-md="center">{{cocktailRandom.strDrink}}</h1>
            </v-col>
        </v-row>
        <v-row justify="space-around">
            <v-col cols="12" sm="2" md="4">
                <v-img :src="cocktailRandom.strDrinkThumb" height="500px" width="500px"></v-img>
            </v-col>
            <v-col cols="12" sm="2" md="4">
                <div>{{cocktailRandom.strCategory}}</div>
                <div>{{cocktailRandom.strAlcoholic}}</div>
                <div>{{cocktailRandom.strGlass}}</div>
                <div v-for="(i, index) in this.getIngredients().length" :key="i">
                    {{getIngredients()[index]}} {{getMeasures()[index]}}
                </div>
            </v-col>
            <v-col cols="12" sm="2" md="4">
                <div>{{cocktailRandom.strInstructions}}</div>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'randomHomepage',
  data () {
    return {
      isAcoholic: false,
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
    console.log(this.cocktailRandom)
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
    }
  }
}
</script>
