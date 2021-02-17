<script lang="ts">
import {
  debouncedWatch,
  useElementSize,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    /**
     * Amount of pixels remaining when firing {@see end} event
     * When given number x, the event gets fired when the user is x pixels away from the bottom
     */
    pixelBuffer: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  emits: { end: null },

  setup(props, { emit }) {
    const el = ref(null)
    const { y } = useWindowScroll()
    const { height: windowHeight } = useWindowSize()
    const { height: documentHeight } = useElementSize(document.body)
    const scrollPosition = computed(() => y.value + windowHeight.value)

    debouncedWatch(
      [scrollPosition, documentHeight],
      () => {
        if (scrollPosition.value >= documentHeight.value - props.pixelBuffer) {
          emit('end')
        }
      },
      { debounce: 500 }
    )

    return {
      el,
    }
  },
})
</script>

<template>
  <slot></slot>
</template>
