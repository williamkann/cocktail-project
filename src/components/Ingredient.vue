<template>
  <v-container>
    <h1 style="color:white; font-family: 'Helvetica Neue', sans-serif; font-size: 275px; letter-spacing: -1px; line-height: 2; text-align: center;">Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website</v-toolbar-title>
      <v-spacer></v-spacer>
        <div>
          <v-text-field v-model="search" label="Search" placeholder="Type some cocktail" :rules="searchRules"></v-text-field>
        </div>
        <v-btn @click="searchByName()">Search</v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <!-- Components of the ingredient page -->
        {{this.ingredientDisplay}}
        <!-- Titles -->
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
    ...mapGetters('ingredients', ['getIngredient']),
    ...mapState('ingredients', ['ingredients']),
    ingredient () {
      return this.$route.params.ingredientName
    }
  },

  async mounted () {
    await this.fetchIngredientByName({ ingredient: this.ingredient })
    this.ingredientDisplay = await this.getIngredient()
  },

  data: () => ({
    search: '',
    cocktailsSearched: [],
    searchRules: [s => !!s || 'search invalid'],
    ingredientDisplay: {}
  }),

  methods: {
    ...mapActions('ingredients', ['fetchIngredientByName']),
    searchByName () {
      this.$router.push({ name: 'search', params: { value: this.search } })
    }
  }
}
</script>
