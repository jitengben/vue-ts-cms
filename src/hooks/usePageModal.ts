import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallBackFn = (item?: any) => void
export function usePageModal(addCb?: CallBackFn, editCb?: CallBackFn) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleAddClick = () => {
    if (pageModalRef.value) {
      defaultInfo.value = {}
      pageModalRef.value.centerDialogVisible = true
    }
    addCb && addCb()
  }
  const editRow = (rowItem: any) => {
    defaultInfo.value = { ...rowItem }
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    editCb && editCb(rowItem)
  }
  return [defaultInfo, pageModalRef, handleAddClick, editRow]
}
