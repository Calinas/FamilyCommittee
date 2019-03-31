import { handleActions } from 'redux-actions'
import * as types from '../types/zone'

export default handleActions({
  [types.FROM_PUBLISH] (state, action) {
    return {
      ...state,
      from_publish: action.data
    }
  },
  [types.SAVE_LOCATION] (state, action) {
    return {
      ...state,
      lat: action.lat,
      lng: action.lng
    }
  },
  [types.SAVE_CITY_NAME] (state, action) {
    return {
      ...state,
      city_name: action.data
    }
  },
  [types.SET_CITY_NAME] (state, action) {
    return {
      ...state,
      city_name: action.name
    }
  },
  [types.GET_CITY_LIST] (state, action) {
    return {
      ...state,
      city_list: action.data
    }
  },
  [types.SAVE_IDENTITY_LIST](state, action) {
    return {
      ...state,
      relationship: action.list
    }
  }
}, {
  city_name: '正在定位中...',
  city_list: [],
  from_publish: false,
  relationship: []
})
