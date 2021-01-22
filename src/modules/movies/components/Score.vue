<template>
  <svg viewBox="0 0 100 100" width="100%">
    <circle r="50" cx="50" cy="50" class="background" />
    <path
      class="ring"
      :stroke="color.dark"
      d="M50 15 A1 1 0 0 1 50 85 A1 1 0 0 1 50 15"
    />
    <path
      ref="path"
      class="ring scale"
      :stroke="color.light"
      :stroke-dasharray="dashArray"
      d="M50 15 A1 1 0 0 1 50 85 A1 1 0 0 1 50 15"
    />
    <text class="text" x="50" y="54">
      {{ percent || 'NR' }}
    </text>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, onMounted } from 'vue'

enum Rating {
  NONE = 'NONE',
  BAD = 'BAD',
  OK = 'OK',
  GOOD = 'GOOD',
}

const colors = {
  [Rating.BAD]: {
    dark: '#571435',
    light: '#db2360',
  },
  [Rating.OK]: {
    dark: '#423d0f',
    light: '#d2d531',
  },
  [Rating.GOOD]: {
    dark: '#204529',
    light: '#21d07a',
  },
  [Rating.NONE]: {
    dark: '#081c22',
    medium: '#666666',
    light: '#d4d4d4',
  },
}

export default defineComponent({
  props: {
    percent: {
      type: Number,
      required: false,
      default: null,
    },
  },

  setup(props) {
    const { percent } = toRefs(props)
    const path = ref<SVGPathElement | null>(null)
    const totalPathLength = ref(0)

    onMounted(() => {
      totalPathLength.value = path.value?.getTotalLength() || NaN
    })

    const rating = computed(() => {
      if (!percent.value) return Rating.NONE
      if (percent.value < 40) return Rating.BAD
      if (percent.value < 70) return Rating.OK
      return Rating.GOOD
    })

    const dashArray = computed(() => {
      const scaleLength = totalPathLength.value * (percent.value / 100)
      return `${scaleLength},${totalPathLength.value}`
    })

    return {
      min: 0,
      max: 100,
      path,
      dashArray,
      color: colors[rating.value],
    }
  },
})
</script>

<style scoped lang="stylus">
.background
  fill #081c22

.ring
  fill none
  stroke-linecap round
  stroke-width 7

.text
  font-size 2rem
  fill white
  text-anchor middle // horizontal alignment
  dominant-baseline middle // vertical alignment
</style>
