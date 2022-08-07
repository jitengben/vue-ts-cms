import { IFormConfig } from '@/base-ui/form'
export const searchFormConfig: IFormConfig = {
  labelWidth: '100px',
  itemLayout: { padding: '10px 40px' },
  formItems: [
    {
      type: 'input',
      field: 'id',
      label: 'id',
      placeholder: '请输入id~'
    },
    {
      type: 'input',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名~'
    },
    {
      type: 'input',
      field: 'realname',
      label: '真实姓名',
      placeholder: '请输入真实姓名~'
    },
    {
      type: 'input',
      field: 'cellphone',
      label: '电话号码',
      placeholder: '请输入真电话号码~'
    },
    {
      type: 'select',
      field: 'enable',
      label: '用户状态',
      placeholder: '请选择用户的状态~',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
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
