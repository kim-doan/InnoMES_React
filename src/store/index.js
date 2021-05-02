import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { watchMasterProduct } from '../pages/Master/MasterProduct/saga'
import { masterProductReducer, MASTER_PRODUCT } from '../pages/Master/MasterProduct/slice'


export const rootReducer = combineReducers({
    //Master
    [MASTER_PRODUCT] : masterProductReducer,
})

const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
    yield all([
        watchMasterProduct(),
    ])
}

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: [sagaMiddleware]
    }) 
    sagaMiddleware.run(rootSaga)
    return store
}

export default createStore