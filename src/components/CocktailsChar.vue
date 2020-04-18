<template>
  <v-container>
    <v-row justify-md="center">
        <div v-for="letter in this.characters" :key="letter.id">
            <v-btn class="ma-2" outlined small fab color="white" @click="loadCocktailsByChar(letter)">
                {{letter}}
            </v-btn>
        </div>
    </v-row>
    <v-row justify-md="center">
      <div v-for="(cocktail) in visibleCocktails" :key="cocktail.id" :visibleCocktails="visibleCocktails" :currentPage="currentPage">
        <v-col cols="12" md="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              color="grey lighten-4"
              width="400"
            >
              <v-img
                :aspect-ratio="16/9"
                :src="cocktail.strDrinkThumb"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal display-1 white--text"
                    style="height: 100%;"
                  >
                    {{cocktail.strInstructions | truncate(75, '...')}}
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text
                class="pt-6"
                style="position: relative;"
              >
                <div class="font-weight-light grey--text title mb-2"></div>
                <h3 class="display-1 font-weight-light blue--text mb-2">{{cocktail.strDrink | truncate(20, '...')}}</h3>
                <div class="font-weight-light blue--text title mb-2">
                  {{cocktail.strAlcoholic}}<br>
                  Glass: {{cocktail.strGlass}}<br>
                  Category: {{cocktail.strCategory}}
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </div>
    </v-row>
    <!-- Component Pagination -->
    <v-row>
      <v-col cols="12" md="12">
        <Pagination :cocktailsSearched="this.cocktailsChar"
                    v-on:page:update="updatePage"
                    :currentPage="this.currentPage"
                    :pageSize="this.pageSize"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  font-size: 1rem;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from './Pagination.vue'
// import draggable from 'vuedraggable'
export default {

  components: {
    Pagination
  },
  name: 'cocktailsChar',
  watch: {
    letter: async function (newLetter) {
      console.log(newLetter)
      await this.fetchCocktailsByLetter({ letter: newLetter })
      this.cocktailsChar = await this.getCocktailsByLetter({ letter: newLetter })
      this.updateVisibleCocktails()
    }
  },

  data: () => ({
    range: (function () {
      var data = []
      while (data.length < 128) data.push(String.fromCharCode(data.length))
      return function (start, stop) {
        start = start.charCodeAt(0)
        stop = stop.charCodeAt(0)
        return (start < 0 || start > 127 || stop < 0 || stop > 127) ? null : data.slice(start, stop + 1)
      }
    })(),
    characters: [],
    cocktailsChar: [],
    letter: 'A',
    currentPage: 0,
    pageSize: 4,
    visibleCocktails: []
  }),
  props: {

  },

  computed: {
    ...mapGetters('cocktails', ['getCocktailsByLetter'])
  },
  async mounted () {
    this.characters = this.range('A', 'Z')
    await this.fetchCocktailsByLetter({ letter: this.characters[0] })
    this.cocktailsChar = await this.getCocktailsByLetter({ letter: this.characters[0] })
    this.updateVisibleCocktails()
  },
  methods: {
    ...mapActions('cocktails', ['fetchCocktailsByLetter']),
    async loadCocktailsByChar (letter) {
      this.letter = letter
    },
    updatePage (pageNumber) {
      this.currentPage = pageNumber
      this.updateVisibleCocktails()
    },
    updateVisibleCocktails () {
      const from = parseInt(this.currentPage) * parseInt(this.pageSize)
      const to = parseInt(this.currentPage * this.pageSize) + parseInt(this.pageSize)
      this.visibleCocktails = this.cocktailsChar.slice(from, to)
      if (this.visibleCocktails.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    }
  }
}
</script>
