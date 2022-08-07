<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="30%"
      destroy-on-close
      center
    >
      <tb-form v-bind="modalFormConfig" v-model="formData"></tb-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import TbForm from '@/base-ui/form'
export default defineComponent({
  components: {
    TbForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newVlue) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[item.field] = newVlue[item.field]
        }
      }
    )
    const store = useStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length === 0) {
        //新建
        store.dispatch('system/submitForm', {
          pageName: props.pageName,
          formData: { ...formData.value, ...props.otherInfo }
        })
        centerDialogVisible.value = false
      } else {
        //编辑
        store.dispatch('system/editForm', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      }
    }
    return {
      centerDialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
