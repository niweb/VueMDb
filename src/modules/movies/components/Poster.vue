<template>
  <img :src="src" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { getImagePath, ImagePath } from '@/shared/services/movieApi'

export default defineComponent({
  props: {
    path: {
      type: String as PropType<ImagePath>,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    width: {
      type: Number,
      required: false,
      default: 200,
    },
  },

  setup(props) {
    return {
      src: getImagePath(props.path, { width: props.width }),
      alt: 'Poster' + (props.title && ` of ${props.title}`),
    }
  },
})
</script>
