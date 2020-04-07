<template>
  <v-container>
    <h1>Un titre</h1>
    <v-toolbar flat height="110%">
      <v-toolbar-title>Cocktails Website</v-toolbar-title>
      <v-spacer></v-spacer>
        <div>
          <v-text-field label="Search" placeholder="Type some cocktail"></v-text-field>
        </div>
        <v-btn @click="searchByName()">Search</v-btn>
    </v-toolbar>
      <v-alert outlined color="#3366cc">
        <CategoryHomepage />
        <RandomHomepage />
      </v-alert>
  </v-container>
</template>

<script>
import { } from 'vuex'
import CategoryHomepage from './CategoryHomepage.vue'
import RandomHomepage from './RandomHomepage.vue'
export default {
  name: 'homepage',

  components: {
    CategoryHomepage,
    RandomHomepage
  },

  computed: {
  },

  async mounted () {
  },

  data: () => ({
    search: ''
  }),

  methods: {
    loadCategory: function () {
      console.log('Clicked a V-card')
    }
  }
}
</script>
