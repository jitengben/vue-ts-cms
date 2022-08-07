<template>
  <div class="page-search">
    <tb-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button
            type="primary"
            icon="el-icon-refresh"
            @click="handleRefreshClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </tb-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TbForm from '@/base-ui/form'
export default defineComponent({
  components: {
    TbForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['handleRefreshClick', 'handleSearchClick'],
  setup(props, { emit }) {
    //根据配置生成formdata
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //重置按钮点击
    const handleRefreshClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[key] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('handleRefreshClick')
    }

    //搜索按钮点击
    const handleSearchClick = () => {
      emit('handleSearchClick', formData.value)
    }
    return {
      formData,
      handleRefreshClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
