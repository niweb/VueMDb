<template>
  <div class="container">
    <div class="backdrop"></div>
    <div class="content">
      <slot name="default"></slot>
    </div>
    <div class="overlay">
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  position relative
  width 90%
  max-width 400px
  margin auto
  overflow hidden

  .backdrop
    background rgba(0,0,0,0.7)
    position absolute
    height 99%
    width 100%
    left 0
    top 0
    bottom 0
    right 0
    opacity 0
    transition all 0.4s ease-in-out 0s

  .overlay
    color #efefef
    position absolute
    text-align center
    padding-left 1em
    padding-right 1em
    height 100%
    width 100%
    top 80%
    left 50%
    opacity 0
    transform translate(-50%, -50%)
    transition all 0.3s ease-in-out 0s

  &:hover
    .backdrop
      opacity 1
    .overlay
      top 50%
      left 50%
      opacity 1
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HoverOverlay',
})
</script>
