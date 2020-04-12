<template>
  <v-container>
    <div class="text-center">
        <span
            class="mr-4
            grey--text"
          >
            Page {{ currentPage + 1 }} of {{ totalPages() }}
        </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="updatePage(currentPage - 1)"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="updatePage(currentPage + 1)"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
  </v-container>
</template>

<script>

export default {
  name: 'pagination',

  props: ['cocktailsSearched', 'currentPage', 'pageSize'],

  methods: {

    updatePage (pageNumber) {
      this.$emit('page:update', pageNumber)
    },
    totalPages () {
      return Math.ceil(this.cocktailsSearched.length / this.pageSize)
    },
    showPreviousLink () {
      if (this.currentPage === 0) {
        return false
      } else {
        return true
      }
    },
    showNextLink () {
      if (this.currentPage === (this.totalPages() - 1)) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
