import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { watchMasterProduct } from '../pages/Master/MasterProduct/saga'
import { masterProductReducer, MASTER_PRODUCT } from '../pages/Master/MasterProduct/slice'
import { toastReducer, TOAST } from '../common/Toast/slice'
import { purchaseOrderReducer, PURCHASE_ORDER } from '../pages/Purchase/PurchaseOrder/slice'
import { watchPurchaseOrder } from '../pages/Purchase/PurchaseOrder/saga'


export const rootReducer = combineReducers({
    //Master
    [MASTER_PRODUCT] : masterProductReducer,
    //Common
    [TOAST] : toastReducer,
    //Purchase
    [PURCHASE_ORDER] : purchaseOrderReducer
})

const sagaMiddleware = createSagaMiddleware()

export function* rootSaga() {
    yield all([
        watchMasterProduct(),
        watchPurchaseOrder()
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