<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  emits: { foo: null },

  setup(props, { emit }) {
    return {
      onScroll(e: Event) {
        console.log('onScroll', e)
        emit('foo')
      },
    }
  },
})
</script>

<template>
  <div @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<style scoped lang="stylus"></style>
