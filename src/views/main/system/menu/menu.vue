<template>
  <div class="menu">
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { tableContentConfig } from './config/menu.content'
export default defineComponent({
  name: 'tb-menu',
  components: { pageContent },
  setup() {
    return {
      tableContentConfig
    }
  }
})
</script>

<style scoped></style>
