<template>
  <template v-if="data">
    <div class="p-d-flex p-my-3 p-align-start">
      <Poster
        :width="300"
        :title="data?.title"
        :path="data?.posterPath"
      ></Poster>
      <div class="p-px-3">
        <h2>{{ data.title }}</h2>
        <pre>{{ data }}</pre>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useMovieApi } from '@/modules/movies/functions/useMovieApi'
import { FullMovie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  components: {
    Poster,
  },

  setup(props) {
    console.log('setup', props.id)

    const { data, error, loading } = useMovieApi<FullMovie>(
      `/movie/${props.id}`
    )

    return {
      data,
      error,
      loading,
    }
  },
})
</script>
