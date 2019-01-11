
import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT} from '../types/count'

export default handleActions({
  [INCREMENT] (state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [DECREMENT] (state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
}, {
  count: 0   //  数据count的默认值为0
})
