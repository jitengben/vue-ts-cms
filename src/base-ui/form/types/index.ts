export interface IFormItem {
  type: 'input' | 'password' | 'select' | 'datepicker'
  field: string
  label: string
  rule?: any[]
  placeholder?: any
  options?: option[]
  otherOptions?: otherOptions
  isHidden?: boolean
}
export interface option {
  label: string
  value: string | number
}
export interface otherOptions {
  startPlaceholder?: string
  endPlaceholder?: string
  type?: string
}
export interface IFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout: any
}
