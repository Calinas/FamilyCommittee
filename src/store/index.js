import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

function configStore () {
  const store = createStore(rootReducer, applyMiddleware)
  return store
}

export default configStore
