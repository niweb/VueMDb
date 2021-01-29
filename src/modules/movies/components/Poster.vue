<template>
  <img :src="src" :alt="alt" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { getImagePath, ImagePath } from '@/shared/services/movieApi'

export default defineComponent({
  props: {
    path: {
      type: String as PropType<ImagePath>,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 200,
    },
  },

  setup(props) {
    const src = ref('')

    if (props.path) {
      src.value = getImagePath(props.path, { width: props.width })
    } else {
      const backgroundColor = '212529'
      const textColor = 'e9ecef'
      const height = props.width * 1.5
      src.value = `https://via.placeholder.com/${props.width}x${height}/${backgroundColor}/${textColor}?text=${props.title}`
    }

    return {
      src,
      alt: 'Poster' + (props.title && ` of ${props.title}`),
    }
  },
})
</script>
