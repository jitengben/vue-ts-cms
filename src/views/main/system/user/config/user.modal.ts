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
      field: 'password',
      label: '密码',
      placeholder: '请输入密码~',
      isHidden: true
    },
    {
      type: 'input',
      field: 'cellphone',
      label: '电话号码',
      placeholder: '请电话号码~'
    },
    {
      type: 'select',
      field: 'departmentId',
      label: '选择部门',
      placeholder: '请选择部门~',
      options: []
    },
    {
      type: 'select',
      field: 'roleId',
      label: '角色',
      placeholder: '请选择角色~',
      options: []
    }
  ]
}
