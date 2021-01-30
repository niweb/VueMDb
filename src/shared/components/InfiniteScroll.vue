<script lang="ts">
import {
  debouncedWatch,
  useElementSize,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  emits: { infiniteScroll: null },

  setup(props, { emit }) {
    const el = ref(null)
    const { y } = useWindowScroll()
    const { height: windowHeight } = useWindowSize()
    const { height: documentHeight } = useElementSize(document.body)
    const scrollPosition = computed(() => y.value + windowHeight.value)

    debouncedWatch(
      [scrollPosition, documentHeight],
      () => {
        if (scrollPosition.value >= documentHeight.value) {
          emit('infiniteScroll')
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
