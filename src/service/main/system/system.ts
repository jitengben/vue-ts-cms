import tbRequest from '@/service'
import { IDataType } from '@/service/types'
export function getPageListData(url: string, queryInfo: any) {
  return tbRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deleteRow(url: string, id: string) {
  return tbRequest.delete<IDataType>({
    url: url,
    data: {
      id
    }
  })
}

export function addRow(url: string, formData: any) {
  return tbRequest.post<IDataType>({
    url,
    data: formData
  })
}

export function editRow(url: string, formData: any) {
  return tbRequest.patch<IDataType>({
    url,
    data: formData
  })
}
