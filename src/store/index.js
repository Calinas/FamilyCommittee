import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

export default function configStore(){
  const store = createStore(rootReducer, applyMiddleware)
  return store
}