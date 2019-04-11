import * as types from '../types/zone'
import { getStore } from 'wepy-redux'
import { getCityList, getCityInfo } from '../../api/createClass'
import { getIdentityList } from '../../api/user'

let store = getStore()

const setPublish = (data) => ({type: types.FROM_PUBLISH, data})

const saveCityList = (data) => ({type: types.GET_CITY_LIST, data})

const saveCityName = (data) => ({type: types.SAVE_CITY_NAME, data})

export const setFromPublish = (val) => {
  store.dispatch(setPublish(val))
}

export const setCityList = () => {
  getCityList().then(res => {
    const cityList = res.data.list
    store.dispatch(saveCityList(cityList))
  })
}

export const getCityName = (params) => {
  getCityInfo(params).then(res => {
    const cityName = res.data.data.regeocode.addressComponent.province
    store.dispatch(saveCityName(cityName))
  })
}

export const setCityName = (name) => {
  store.dispatch({
    type: types.SET_CITY_NAME,
    name
  })
}

export const saveLocation = (params) => {
  store.dispatch({
    type: types.SAVE_LOCATION,
    lng: params.lng,
    lat: params.lat
  })
}

export const saveIdentityList = () => {
  getIdentityList().then(res => {
    store.dispatch({
      type: types.SAVE_IDENTITY_LIST,
      list: res.data.list
    })
  })
}

export const setClassChanged = (data) => {
  store.dispatch({
    type: types.CLASS_HAS_CHANGED,
    data
  })
}

export const setPresident = (data) => {
  store.dispatch({
    type: types.SET_PRESIDENT,
    data
  })
}
