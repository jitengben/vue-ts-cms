<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleRefreshClick="handleRefreshClick"
      @handleSearchClick="handleSearchClick"
    ></page-search>
    <page-content
      :tableContentConfig="tableContentConfig"
      ref="pageContentRef"
      pageName="role"
      @handleAddClick="handleAddClick"
      @editRow="editRow"
    ></page-content>
    <page-modal
      :modalFormConfig="modalFormConfig"
      pageName="role"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    >
      <div class="menutree">
        <el-tree
          ref="elTreeRef"
          :data="menuList"
          :props="{ children: 'children', label: 'name' }"
          node-key="id"
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { searchFormConfig } from './config/role.search'
import { tableContentConfig } from './config/role.content'
import { modalFormConfig } from './config/role.modal'
import { useStore } from '@/store'
import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const [pageContentRef, handleRefreshClick, handleSearchClick] =
      usePageSearch()
    //modal的hook
    const editCallBack = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        console.log(leafKeys)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [defaultInfo, pageModalRef, handleAddClick, editRow] = usePageModal(
      undefined,
      editCallBack
    )
    const store = useStore()
    const menuList = computed(() => store.state.entireMenu)
    const otherInfo = ref({})

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const checkedMenu = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { checkedMenu }
    }
    return {
      searchFormConfig,
      pageContentRef,
      handleRefreshClick,
      handleSearchClick,
      tableContentConfig,
      defaultInfo,
      pageModalRef,
      handleAddClick,
      editRow,
      modalFormConfig,
      menuList,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menutree {
  margin-left: 25px;
}
</style>
