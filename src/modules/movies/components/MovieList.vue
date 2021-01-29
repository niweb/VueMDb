<template>
  <div class="p-col-12">
    <div class="product-list-item p-d-flex p-p-4">
      <Poster
        style="height: 200px"
        :path="movie.posterPath"
        :title="movie.title"
        class="p-shadow-8 p-mr-4"
      ></Poster>
      <div class="product-list-detail">
        <h3 class="p-m-0">{{ movie.title }}</h3>
        <div class="p-my-4">
          {{ movie.overview }}
        </div>
        <div class="p-d-inline-flex p-ai-center">
          <Rating
            :model-value="Math.round(movie.voteAverage / 2)"
            :readonly="true"
            :cancel="false"
          ></Rating>
          <Tag class="p-ml-4">
            <h3 class="p-m-0">{{ movie.voteAverage }}</h3>
          </Tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Rating from 'primevue/rating'
import Tag from 'primevue/tag'

import { PartialMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'

export default defineComponent({
  components: {
    Poster,
    Rating,
    Tag,
  },

  props: {
    movie: {
      type: Object as PropType<PartialMovie>,
      required: true,
    },
  },
})
</script>
