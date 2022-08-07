<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleRefreshClick="handleRefreshClick"
      @handleSearchClick="handleSearchClick"
    ></page-search>
    <page-content
      :tableContentConfig="tableContentConfig"
      ref="pageContentRef"
      pageName="users"
      @handleAddClick="handleAddClick"
      @editRow="editRow"
    ></page-content>
    <page-modal
      :modalFormConfig="modalConfigRef"
      pageName="users"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/user.search'
import { tableContentConfig } from './config/user.content'
import { modalFormConfig } from './config/user.modal'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    //查询的hook
    const [pageContentRef, handleRefreshClick, handleSearchClick] =
      usePageSearch()
    //添加和编辑的不同处理传给hook执行
    const addUserCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editUserCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    //modal的hook
    const [defaultInfo, pageModalRef, handleAddClick, editRow] = usePageModal(
      addUserCallBack,
      editUserCallBack
    )
    const store = useStore()
    //动态获取部门和角色的下拉列表
    const modalConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })
      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })
      return modalFormConfig
    })

    return {
      searchFormConfig,
      tableContentConfig,
      modalFormConfig,
      handleRefreshClick,
      handleSearchClick,
      pageContentRef,
      pageModalRef,
      handleAddClick,
      editRow,
      defaultInfo,
      modalConfigRef
    }
  }
})
</script>

<style scoped></style>
