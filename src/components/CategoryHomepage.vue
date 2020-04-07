<template>
  <v-container>
    <v-row justify-md="center">
      <!-- <draggable tag="div" v-model="modulesDatas" :animation="200" ghost-class="moving-card"> -->
        <!-- Display Categories -->
        <div v-for="(category) in this.categories" :key="category.id">
        <v-col cols="12" sm="2" md="12">
            <v-card height=200 width=350 @click="loadCategory()">
            <v-img
                height="125"
                class="grey darken-4"
                src="../assets/ic_cocktails.jpg"
            ></v-img>
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
</style>

<script>
import { mapState, mapActions } from 'vuex'
// import draggable from 'vuedraggable'
export default {

  components: {
    // draggable
  },
  name: 'categoryHomepage',
  data: () => ({
  }),
  props: {

  },

  computed: {
    ...mapState('categories', ['categories'])
  },
  async mounted () {
    await this.fetchCategories()
  },
  methods: {
    ...mapActions('categories', ['fetchCategories'])
  }
}
</script>
