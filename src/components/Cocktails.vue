<template>
  <v-container>
    {{this.ingredients}}
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'cocktails',

  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('ingredients', ['ingredients'])
  },

  async mounted () {
    await this.fetchCocktails()
    await this.fetchCategories()
    await this.fetchIngredients()
    await Promise.all(
      this.categories.map(c => this.fetchCocktailsForCategory({ category: c.strCategory }))
    )
  },

  data: () => ({

  }),

  methods: {
    ...mapActions('cocktails', ['fetchCocktails']),
    ...mapActions('categories', ['fetchCategories']),
    ...mapActions('cocktails', ['fetchCocktailsForCategory']),
    ...mapActions('ingredients', ['fetchIngredients'])
  }
}
</script>
