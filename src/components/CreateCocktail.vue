<template>
    <v-container>
      <div v-show="!fullscreen">
        <h1 id="logo">WikiDrink</h1>
        <img src="../assets/ic_logo.png" height="250rem" width="240rem" class="center"/>
        <v-toolbar flat height="110%">
          <v-toolbar-title><router-link to="/">Homepage</router-link> Creating a new cocktail</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </div>
      <v-alert outlined color="#3366cc">
        <!-- Components of the detail page -->
        <!-- Titles -->
        <v-row>
            <v-col cols="12" sm="4" md="4" v-show="!fullscreen">
              <v-row>
                <v-col cols="12" sm="1" md="1">
                  <h1><v-icon>mdi-glass-tulip</v-icon></h1>
                </v-col>
                <v-col cols="12" sm="11" md="11">
                  <v-text-field
                    width="50"
                    label="Cocktail's name"
                    placeholder="Cocktail's name"
                    solo
                    ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          <v-col cols="12" sm="4" :md="ingredientSize">
              <h1 justify-md="center"><v-icon>mdi-view-list</v-icon>Ingredients</h1>
          </v-col>
          <v-col cols="12" sm="2" :md="descriptionSize">
              <h1 justify-md="center"><v-icon>mdi-comment-text-outline</v-icon>Description</h1>
          </v-col>
          <v-col cols="12" sm="1" :md="buttonSize">
            <v-btn class="ma-2" outlined small color="white" @click="saveCocktail()">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="1" :md="buttonSize">
            <div v-if="!fullscreen">
              <v-btn class="ma-2" outlined small color="white" @click="putFullscreen()">
                <v-icon>mdi-fullscreen</v-icon>
              </v-btn>
            </div>
            <div v-if="fullscreen">
              <v-btn class="ma-2" outlined small color="white" @click="putFullscreen()">
                <v-icon>mdi-fullscreen-exit</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <!-- Contents of each titles -->
        <v-row justify="space-around">
          <v-col cols="12" sm="4" md="4" v-show="!fullscreen">
              <v-img :src="this.myImage" height="500px" width="500px"></v-img>
              <input type="file" @change="onFileSelected"/>
          </v-col>
          <v-col cols="12" sm="4" :md="this.ingredientSize">
            <v-card class="mx-auto" max-width="400" tile>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-text-field
                      label="Category"
                      placeholder="Category"
                      solo
                    ></v-text-field>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-text-field
                      label="Alcool"
                      placeholder="Alcoholic"
                      solo
                    ></v-text-field>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item one-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-text-field
                      label="Glass"
                      placeholder="Glass"
                      solo
                    ></v-text-field>
                  </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card class="mx-auto" max-width="400" tile>
              <v-list one-line subheader>
                <v-subheader inset>
                  Ingredient
                  <v-btn class="ma-2" outlined small fab color="white" @click="deleteIngredient()">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <v-btn class="ma-2" outlined small fab color="white" @click="addIngredient()">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-subheader>
                  <div v-for="(i, index) in this.ingredientsList.length" :key="i.id">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-text-field
                            label="Ingredient"
                            :placeholder="`Ingredient ${index + 1}`"
                            solo
                          ></v-text-field>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-text-field
                            label="Measures"
                            :placeholder="`Measures ${index + 1}`"
                            solo
                          ></v-text-field>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" :md="this.ingredientSize">
              <DesctiptionEditor ></DesctiptionEditor>
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
import DesctiptionEditor from './DescriptionEditor.vue'
export default {
  name: 'createCocktail',
  components: {
    DesctiptionEditor
  },
  data: () => ({
    ingredientsList: [{ ingredient: { name: '', measure: '' } }],
    myImage: require('../assets/ic_add_image.png'),
    fullscreen: false,
    ingredientSize: 4,
    descriptionSize: 2,
    buttonSize: 1
  }),

  computed: {

  },

  methods: {
    saveCocktail () {

    },
    onFileSelected (event) {
      this.myImage = require(`../assets/${event.target.files[0].name}`)
    },
    addIngredient () {
      this.ingredientsList.push({ ingredient: { name: '', measure: '' } })
    },
    deleteIngredient () {
      this.ingredientsList.splice(this.ingredientsList.length - 1, 1)
    },
    putFullscreen () {
      if (this.fullscreen === false) {
        this.ingredientSize = 6
        this.descriptionSize = 4
        this.buttonSize = 1
        this.fullscreen = true
      } else if (this.fullscreen === true) {
        this.ingredientSize = 4
        this.descriptionSize = 2
        this.buttonSize = 1
        this.fullscreen = false
      }
    }
  }
}
</script>
