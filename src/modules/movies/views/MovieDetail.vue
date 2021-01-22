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
          <h3 v-if="data.tagline" class="tagline p-mt-0 p-mb-2">
            “{{ data.tagline }}”
          </h3>
          <div>
            <Score class="score" :percent="score"></Score>
          </div>
          <p class="p-mt-3">{{ data.overview }}</p>
        </div>
      </div>
    </CoverImage>
    <pre>{{ data }}</pre>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import { FullMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'
import CoverImage from '@/modules/movies/components/CoverImage.vue'
import Score from '@/modules/movies/components/Score.vue'

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
    Score,
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
      score: computed(() => (data.value ? data.value.voteAverage * 10 : 0)),
    }
  },
})
</script>

<style scoped lang="stylus">
.title
  font-weight 800
  font-size 3rem

.year
  font-weight 200

.tagline
  font-weight 200
  font-size 1.5rem

.poster
  border 5px solid white

.score
  width 60px
</style>
