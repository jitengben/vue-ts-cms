<template>
  <div class="goods">
    <page-content :tableContentConfig="tableContentConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
      <template #newPrice="scope"> ￥{{ scope.row.newPrice }} </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { tableContentConfig } from './config/goods.content'

export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      tableContentConfig
    }
  }
})
</script>

<style scoped></style>
