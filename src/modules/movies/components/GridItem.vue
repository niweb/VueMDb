<script lang="ts">
import { defineComponent, PropType } from 'vue'

import Poster from '@/modules/movies/components/Poster.vue'

import { PathNames } from '@/shared/constants/path-names'
import Score from '@/modules/movies/components/Score.vue'
import { ImagePath } from '@/shared/services/movieApi'

export default defineComponent({
  components: {
    Poster,
    Score,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    detailLinkName: {
      type: String as PropType<PathNames>,
      required: true,
    },

    posterPath: {
      type: String as PropType<ImagePath>,
      required: true,
    },

    voteAverage: {
      type: Number,
      default: NaN,
    },
  },

  setup(props) {
    return {
      detailLink: {
        name: props.detailLinkName,
        params: {
          id: props.id,
        },
      },
    }
  },
})
</script>

<template>
  <div class="card p-shadow-12">
    <router-link :to="detailLink">
      <Poster :path="posterPath" :title="title" :width="500"></Poster>
    </router-link>
    <div class="content">
      <Score class="score" :percent="voteAverage * 10"></Score>
      <span class="title">{{ title }}</span>
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
