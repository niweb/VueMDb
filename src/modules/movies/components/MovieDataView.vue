<template>
  <DataView :value="movies" :layout="layout">
    <template #header>
      <div class="p-grid p-nogutter">
        <div class="p-col-6 p-text-left">
          <span>Yo, those are some movies</span>
        </div>
        <div class="p-col-6 p-text-right">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </div>
    </template>
    <template #list="{data}">
      <div class="p-col-12">
        <div class="product-list-item p-d-flex p-p-4">
          <Poster
            style="height: 200px;"
            :path="data.posterPath"
            :title="data.title"
            class="p-shadow-8 p-mr-4"
          ></Poster>
          <div class="product-list-detail">
            <h3 class="p-m-0">{{ data.title }}</h3>
            <div class="p-my-4">
              {{ data.overview }}
            </div>
            <div class="p-d-inline-flex p-ai-center">
              <Rating
                :modelValue="Math.round(data.voteAverage / 2)"
                :readonly="true"
                :cancel="false"
              ></Rating>
              <Tag class="p-ml-4">
                <h3 class="p-m-0">{{ data.voteAverage }}</h3>
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #grid="{ data }">
      <div class="p-col-12 p-md-3 p-my-4 p-text-center">
        <HoverOverlay>
          <Poster :path="data.posterPath" :title="data.title"></Poster>
          <template #overlay>
            <div
              class="p-py-4 p-px-1 p-d-flex p-flex-column"
              style="height: 100%;"
            >
              <h3 class="p-m-0">{{ data.title }}</h3>
              <div class="p-my-4 p-overflow-hidden">
                {{ data.overview }}
              </div>
              <div class="p-mt-auto p-d-inline-flex p-ai-center">
                <Rating
                  :modelValue="Math.round(data.voteAverage / 2)"
                  :readonly="true"
                  :cancel="false"
                ></Rating>
                <Tag class="p-ml-4">
                  <h3 class="p-m-0">{{ data.voteAverage }}</h3>
                </Tag>
              </div>
            </div>
          </template>
        </HoverOverlay>
      </div>
    </template>
  </DataView>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'

import { Movie } from '@/modules/movies/types'
import Poster from '@/modules/movies/components/Poster.vue'

import HoverOverlay from '@/shared/components/HoverOverlay.vue'

export default defineComponent({
  props: {
    movies: {
      type: Object as PropType<Movie[]>,
      required: false,
      default: [],
    },
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    totalPages: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  components: {
    DataView,
    DataViewLayoutOptions,
    Poster,
    Rating,
    Tag,
    HoverOverlay,
  },
  setup() {
    const layout = ref('grid')
    return {
      layout,
    }
  },
})
</script>
