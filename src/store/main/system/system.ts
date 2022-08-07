import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  deleteRow,
  getPageListData,
  addRow,
  editRow
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, goodsList: any[]) {
      state.menuList = goodsList
    },
    changeMenuCount(state, goodsCount: number) {
      state.menuCount = goodsCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      switch (pageName) {
        case 'users':
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
        case 'goods':
          commit(`changeGoodsList`, list)
          commit(`changeGoodsCount`, totalCount)
          break
        case 'menu':
          commit(`changeMenuList`, list)
          commit(`changeMenuCount`, totalCount)
          break
      }
    },
    async deleteRow({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      await deleteRow(url, id)
      dispatch('getPageListAction', {
        pageName,
        offset: 0,
        pageSize: 10
      })
    },
    async submitForm({ dispatch }, payload: any) {
      const { pageName, formData } = payload
      const pageUrl = `/${pageName}`
      await addRow(pageUrl, formData)
      dispatch('getPageListAction', {
        pageName,
        offset: 0,
        pageSize: 10
      })
    },
    async editForm({ dispatch }, payload: any) {
      const { pageName, formData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      console.log(payload)
      await editRow(pageUrl, formData)
      dispatch('getPageListAction', {
        pageName,
        offset: 0,
        pageSize: 10
      })
    }
  }
}

export default systemModule
