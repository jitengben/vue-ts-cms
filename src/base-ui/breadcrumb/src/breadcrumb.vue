<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item.path ?? '' }"
        v-for="item in breadcrumbArr"
        :key="item.name"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbArr: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
