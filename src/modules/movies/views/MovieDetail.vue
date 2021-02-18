<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'

import { useMovieApi } from '@/shared/services/useMovieApi'
import { FullMovie } from '@/modules/movies/types/movies'
import Poster from '@/modules/movies/components/Poster.vue'
import CoverImage from '@/modules/movies/components/CoverImage.vue'
import Score from '@/modules/movies/components/Score.vue'
import { WatchableType } from '@/modules/movies/types'

export default defineComponent({
  components: {
    CoverImage,
    Poster,
    Score,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },

    itemType: {
      type: String as PropType<WatchableType>,
      required: true,
    },
  },

  setup(props) {
    const root = ref(null)

    const isMovie = computed(() => props.itemType === WatchableType.Movie)
    const isShow = computed(() => props.itemType === WatchableType.Show)

    const endpoint = computed(() => {
      if (isMovie.value) return 'movie'
      if (isShow.value) return 'tv'
      return 'unknown'
    })

    const { data, error, loading } = useMovieApi<FullMovie>(
      `/${endpoint.value}/${props.id}`
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

<template>
  <template v-if="data">
    <CoverImage :path="data.backdropPath">
      <div class="p-d-flex p-my-3 p-p-6 p-align-start">
        <Poster
          class="p-mx-3 poster"
          :width="300"
          :title="data.title || data.name"
          :path="data?.posterPath"
        ></Poster>
        <div class="p-mx-6">
          <div class="p-d-flex p-align-baseline">
            <h2>
              <span class="title p-mr-4">{{ data.title || data.name }}</span>
              <span class="year"
                >({{
                  (data.releaseDate || data.firstAirDate)?.split('-')[0]
                }})</span
              >
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
