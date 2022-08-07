import { IFormConfig } from '@/base-ui/form'
export const searchFormConfig: IFormConfig = {
  labelWidth: '100px',
  itemLayout: { padding: '10px 40px' },
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称~'
    },
    {
      type: 'input',
      field: 'intro',
      label: '角色介绍',
      placeholder: '请输入权限介绍~'
    },
    {
      type: 'datepicker',
      field: 'createAt',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
