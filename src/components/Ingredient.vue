<template>
  <v-container>
    <h1 style="color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center;">Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title><router-link to="/">Cocktails Website</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
        <div>
          <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
        </div>
        <v-btn @click="searchByName()">Search</v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <!-- Components of the ingredient page -->
        <v-row>
          <v-col cols="12" sm="2" md="4">
              <h1 justify-md="center"><v-icon>mdi-food-variant</v-icon>{{this.ingredientDisplay.strIngredient}}</h1>
          </v-col>
                  <v-col cols="12" sm="2" md="4">
              <h1 justify-md="center"><v-icon>mdi-view-list</v-icon>Information</h1>
          </v-col>
          <v-col cols="12" sm="2" md="4">
              <h1 justify-md="center"><v-icon>mdi-comment-text-outline</v-icon> Description</h1>
          </v-col>
        </v-row>
        <!-- Contents of each titles -->
        <v-row justify="space-around">
          <v-col cols="12" sm="2" md="4">
              <v-img :src="this.image.strImage" :src-lazy="this.image.strImage" height="500px" width="500px">
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
          <v-col cols="12" sm="2" md="4">
            <v-card class="mx-auto" max-width="400" tile>
              <div v-if="this.ingredientDisplay.strType != null">
                <v-list-item one-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      Type
                    </v-list-item-title>
                    <v-list-item-subtitle>{{this.ingredientDisplay.strType}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-if="this.ingredientDisplay.strAlcohol != null">
                <v-list-item one-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      Alcohol
                    </v-list-item-title>
                     <v-list-item-subtitle>{{this.ingredientDisplay.strAlcohol}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <div v-if="this.ingredientDisplay.strABV != null">
                <v-list-item one-line>
                  <v-list-item-content>
                    <v-list-item-title>
                      ABV
                    </v-list-item-title>
                     <v-list-item-subtitle>{{this.ingredientDisplay.strABV}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
              </div>
            </v-card>
            <v-card class="mx-auto" max-width="400" tile>

            </v-card>
          </v-col>
          <v-col cols="12" sm="2" md="4">
              <div v-html="this.ingredientDisplay.strDescription"></div>
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
    ...mapGetters('ingredients', ['getIngredientByName']),
    ...mapGetters('ingredients', ['getIngredientImage']),
    ...mapState('ingredients', ['ingredients']),
    ingredient () {
      return this.$route.params.ingredientName
    }
  },

  async mounted () {
    await this.fetchIngredientByName({ ingredient: this.ingredient })
    this.ingredientDisplay = await this.getIngredientByName().ingredients[0]
    await this.fetchImagesForIngredient({ ingredient: this.ingredient })
    this.image = await this.getIngredientImage({ strIngredient: this.ingredient })
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    ingredientDisplay: {},
    image: ''
  }),

  methods: {
    ...mapActions('ingredients', ['fetchIngredientByName']),
    ...mapActions('ingredients', ['fetchImagesForIngredient']),
    searchByName () {
      this.$router.push({ name: 'search', params: { value: this.search } })
    }
  }
}
</script>
