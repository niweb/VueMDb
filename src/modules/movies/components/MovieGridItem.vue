<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { PartialMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'

import { PATH_NAMES } from '@/shared/constants/path-names'
import Score from '@/modules/movies/components/Score.vue'

export default defineComponent({
  components: {
    Poster,
    Score,
  },

  props: {
    movie: {
      type: Object as PropType<PartialMovie>,
      required: true,
    },
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

<template>
  <div class="card p-shadow-12">
    <router-link :to="detailLink">
      <Poster
        :path="movie.posterPath"
        :title="movie.title"
        :width="500"
      ></Poster>
    </router-link>
    <div class="content">
      <Score class="score" :percent="movie.voteAverage * 10"></Score>
      <span class="title">{{ movie.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.card
  max-width 500px
  border-radius 10px

.content
  position relative
  padding 0.8rem
  padding-top 1.8rem

.score
  position absolute
  top -1.5rem
  left 0.3rem
  width 3rem

.title
  font-weight bold
  font-size 1.1rem
</style>
