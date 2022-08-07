import { IFormConfig } from '@/base-ui/form'
export const modalFormConfig: IFormConfig = {
  labelWidth: '80px',
  itemLayout: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '角色名',
      placeholder: '请输入角色名~'
    },
    {
      type: 'input',
      field: 'intro',
      label: '角色介绍',
      placeholder: '请输入角色介绍~'
    }
  ]
}
