<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { getImagePath, ImagePath } from '@/shared/services/movieApi'

export default defineComponent({
  props: {
    path: {
      type: String as PropType<ImagePath>,
      required: false,
      default: null,
    },

    fallbackColor: {
      type: String,
      required: false,
      default: '#122a42',
    },
  },

  setup(props) {
    const src = computed(() =>
      props.path ? getImagePath(props.path, { width: 500 }) : null
    )

    return {
      src,
    }
  },
})
</script>

<template>
  <div
    class="root"
    :style="{ '--image': `url(${src})`, '--color': fallbackColor }"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.root
  position relative
  color white

  &::before
    content ""
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-image var(--image)
    background-color var(--color)
    background-repeat no-repeat
    background-size cover
    background-position center
    filter blur(3px) saturate(0.5) brightness(0.5)


.content
  position relative
  width 100%
  height 100%
</style>
