<template>
  <v-container>
    <h1 id="logo">WikiDrink</h1>
    <img src="../assets/ic_logo.png" height="250rem" width="240rem" class="center"/>
    <v-toolbar flat height="110%">
      <v-toolbar-title><router-link to="/">Homepage</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
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
div {
  color: white;
}
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
    selectionFilter: true,
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    ingredientDisplay: {},
    image: '',
    filterAlcoholicItems: ['Alcoholic', 'Non alcoholic', 'None'],
    filterCategoryItems: ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other / Unknown', 'Cocoa', 'Shot', 'Coffee / Tea', 'Homemade Liqueur', 'Punch / Party Drinke', 'Beer', 'Soft Drink / Soda', 'None'],
    defaultAlcoholic: 'None',
    defaultCategory: 'None'
  }),

  methods: {
    ...mapActions('ingredients', ['fetchIngredientByName']),
    ...mapActions('ingredients', ['fetchImagesForIngredient']),
    searchByName () {
      if (!this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: 'None', filterAlcohol: this.defaultAlcoholic } })
      } else if (this.selectionFilter) {
        this.$router.push({ name: 'search', params: { value: this.search, filterCategory: this.defaultCategory, filterAlcohol: 'None' } })
      }
    }
  }
}
</script>
