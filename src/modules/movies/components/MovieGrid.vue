<template>
  <div class="p-col-12 p-md-3 p-my-4 p-text-center">
    <router-link :to="detailLink">
      <HoverOverlay>
        <Poster :path="movie.posterPath" :title="movie.title"></Poster>
        <template #overlay>
          <div
            class="p-py-4 p-px-1 p-d-flex p-flex-column"
            style="height: 100%;"
          >
            <h3 class="p-m-0">{{ movie.title }}</h3>
            <div class="p-my-4 p-overflow-hidden">
              {{ movie.overview }}
            </div>
            <div class="p-mt-auto p-d-inline-flex p-ai-center">
              <Rating
                :modelValue="Math.round(movie.voteAverage / 2)"
                :readonly="true"
                :cancel="false"
              ></Rating>
              <Tag class="p-ml-4">
                <h3 class="p-m-0">{{ movie.voteAverage }}</h3>
              </Tag>
            </div>
          </div>
        </template>
      </HoverOverlay>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Rating from 'primevue/rating'
import Tag from 'primevue/tag'

import { PartialMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'

import HoverOverlay from '@/shared/components/HoverOverlay.vue'
import { PATH_NAMES } from '@/shared/constants/path-names'

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<PartialMovie>,
      required: true,
    },
  },

  components: {
    Poster,
    Rating,
    Tag,
    HoverOverlay,
  },

  setup(props) {
    return {
      detailLink: {
        name: PATH_NAMES.MOVIE,
        params: {
          id: props.movie.id,
        },
      },
    }
  },
})
</script>
