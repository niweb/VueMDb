<script lang="ts">
import {
  debouncedWatch,
  useElementSize,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { computed, defineComponent, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

export default defineComponent({
  components: {
    ProgressSpinner,
  },

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

    /**
     * Show a loading spinner below the content while new data gets fetched
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
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
          // do not fire event while new content already gets fetched
          if (!props.loading) {
            emit('end')
          }
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
  <div v-show="loading" class="p-d-flex p-ac-center p-jc-center p-py-6">
    <ProgressSpinner></ProgressSpinner>
  </div>
</template>
