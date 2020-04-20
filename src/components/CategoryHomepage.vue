<template>
  <v-container>
    <v-row justify-md="center">
      <!-- <draggable tag="div" v-model="modulesDatas" :animation="200" ghost-class="moving-card"> -->
        <!-- Display Categories -->
        <div v-for="(category, index) in this.categories" :key="category.id">
          <v-col cols="12" sm="2" md="12">
              <v-card height=200 width=350 @click="loadCategory(category)">
              <v-img
                  height="125"
                  class="grey darken-4"
                  :lazy-src="images[index]"
                  :src="images[index]"
                  aspect-ratio="1"
              >
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
              <v-card-title class="title">{{category.strCategory}}</v-card-title>
              </v-card>
          </v-col>
        </div>
      <!-- </draggable> -->
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.moving-card {
    @apply opacity-50;
    @apply bg-gray-100;
    @apply border;
    @apply border-blue-500;
  }

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import draggable from 'vuedraggable'
export default {

  components: {
    // draggable
  },
  name: 'categoryHomepage',
  data: () => ({
    firstCocktail: {},
    images: []
  }),
  props: {

  },

  computed: {
    ...mapState('categories', ['categories']),
    ...mapGetters('cocktails', ['getCocktailsByCategory'])
  },
  async mounted () {
    await this.fetchCategories()

    await Promise.all(
      this.categories.map(c => this.fetchCocktailsForCategory({ category: c.strCategory }))
    )
    // Use of map to get the first cocktail and push his in the array 'images'
    await Promise.all(
      this.categories.map(async category => {
        this.firstCocktail = await this.getCocktailsByCategory({ strCategory: category.strCategory })[0]
        this.images.push(this.firstCocktail.strDrinkThumb)
      })
    )
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('cocktails', ['fetchCocktailsForCategory']),
    loadCategory (category) {
      this.$router.push({ name: 'category', params: { categoryName: category.strCategory } })
    }
  }
}
</script>
