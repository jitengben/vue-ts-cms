import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleRefreshClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchClick = (queryInfo: any) => {
    console.log(queryInfo)
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleRefreshClick, handleSearchClick]
}
