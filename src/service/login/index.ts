import tbRequest from '../index'
import { IAccount, ILoginType } from './type'
import { IDataType } from '../types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //用法/role/id/menu
}
export function accountLoginRequest(account: IAccount) {
  return tbRequest.post<IDataType<ILoginType>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return tbRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return tbRequest.get<IDataType>({
    url: `${LoginAPI.UserMenus}/${id}/menu`,
    showLoading: false
  })
}
