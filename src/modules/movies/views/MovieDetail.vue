<template>
  <template v-if="data">
    <CoverImage :path="data.backdropPath">
      <div class="p-d-flex p-my-3 p-p-6 p-align-start">
        <Poster
          class="p-mx-3 poster"
          :width="300"
          :title="data?.title"
          :path="data?.posterPath"
        ></Poster>
        <div class="p-mx-6">
          <div class="p-d-flex p-align-baseline">
            <h2>
              <span class="title p-mr-4">{{ data.title }}</span>
              <span class="year">({{ data.releaseDate.split('-')[0] }})</span>
            </h2>
          </div>
          <h3 class="p-mt-0">{{ data.tagline }}</h3>
          <p class="p-mt-5">{{ data.overview }}</p>
        </div>
      </div>
    </CoverImage>
    <pre>{{ data }}</pre>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import { FullMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'
import CoverImage from '@/modules/movies/components/CoverImage.vue'

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    CoverImage,
    Poster,
  },

  setup(props) {
    const root = ref(null)
    const { data, error, loading } = useMovieApi<FullMovie>(
      `/movie/${props.id}`
    )

    return {
      root,
      data,
      error,
      loading,
    }
  },
})
</script>

<style scoped lang="stylus">
.title
  font-weight 800
.year
  font-weight 200

.poster
  border 5px solid white
</style>
