<template>
  <v-container>
    Hello
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'cocktail',

  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('ingredients', ['ingredients'])
  },

  async mounted () {
    await this.fetchCategories()
    await this.fetchIngredients()
    await Promise.all(
      this.categories.map(c => this.fetchCocktailsForCategory({ category: c.strCategory }))
    )
  },

  data: () => ({

  }),

  methods: {
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('cocktails', ['fetchCocktailsForCategory']),
    ...mapActions('ingredients', ['fetchIngredients'])
  }
}
</script>
