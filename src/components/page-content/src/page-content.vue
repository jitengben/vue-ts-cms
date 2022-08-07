<template>
  <div class="page-content">
    <tb-table
      :dataList="dataList"
      :listCount="count"
      v-bind="tableContentConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleAddClick"
        >
          新建用户
        </el-button>
        <el-button
          icon="el-icon-refresh"
          type="primary"
          size="medium"
        ></el-button>
      </template>
      <template #status="scope">
        <el-button
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
          size="mini"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          icon="el-icon-edit"
          type="text"
          size="mini"
          @click="editRow(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          icon="el-icon-delete"
          type="text"
          size="mini"
          @click="deleteRow(scope.row)"
        >
          删除
        </el-button>
      </template>

      <!-- 其他插槽 -->
      <template
        v-for="item in otherSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </tb-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import TbTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  props: {
    tableContentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    TbTable
  },
  emits: ['editRow', 'handleAddClick'],
  setup(prop, { emit }) {
    // 获取操作的权限
    const isCreate = usePermission(prop.pageName, 'create')
    const isUpdate = usePermission(prop.pageName, 'update')
    const isDelete = usePermission(prop.pageName, 'delete')
    const isQuery = usePermission(prop.pageName, 'query')

    //分页配置
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())
    //获取页面信息
    const store = useStore()
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: prop.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    //页面初始时调用
    getPageData()

    //从store里拿出数据和数量
    const dataList = computed(() =>
      store.getters[`system/pageListData`](prop.pageName)
    )
    const count = computed(() =>
      store.getters[`system/pageCount`](prop.pageName)
    )

    //获取到除了默认插槽外的其他插槽
    const otherSlots = prop.tableContentConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    //删除行
    const deleteRow = (rowItem: any) => {
      store.dispatch('system/deleteRow', {
        pageName: prop.pageName,
        id: rowItem.id
      })
    }

    //编辑行
    const editRow = (rowItem: any) => {
      emit('editRow', rowItem)
    }
    const handleAddClick = () => {
      emit('handleAddClick')
    }

    return {
      dataList,
      count,
      getPageData,
      pageInfo,
      otherSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      deleteRow,
      editRow,
      handleAddClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
