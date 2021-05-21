import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { watchMasterProduct } from '../pages/Master/MasterProduct/saga'
import { masterProductReducer, MASTER_PRODUCT } from '../pages/Master/MasterProduct/slice'
import { toastReducer, TOAST } from '../common/Toast/slice'
import { masterManufactureReducer, MASTER_MANUFACTURE_PROCESS } from '../pages/Master/MasterManufactureProcess/slice'
import { watchMasterManufactureProcess } from '../pages/Master/MasterManufactureProcess/saga'


export const rootReducer = combineReducers({
    //Master
    [MASTER_PRODUCT] : masterProductReducer,
    [MASTER_MANUFACTURE_PROCESS] : masterManufactureReducer,
    //Common
    [TOAST] : toastReducer,
})

const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
    yield all([
        watchMasterProduct(),
        watchMasterManufactureProcess()
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