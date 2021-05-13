import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getProductList, setProductList } from '../../../api/master';
import { masterProductAction, masterProductSelector } from './slice';

export function* productListLoad() {
    const { loadSuccess, loadFail } = masterProductAction

    try {
        const param = yield select(masterProductSelector.defaultParam);
        const result = yield call(getProductList, param);

        console.log(result)
        yield put(loadSuccess({
            list : result.list,
            msg : result.msg,
            totalCount : result.totalCount
        }));
    } catch (err) {
        yield put(loadFail(err));
    }
}

export function* saveProductList() {
    const { saveSuccess, saveFail } = masterProductAction;
    try {
        const param = yield select(masterProductSelector.productList)
        const component = yield select(masterProductSelector.component)
        const result = yield call(setProductList, param);

        if(result.success) {
            component.cancelEditData()
        }

        yield put(saveSuccess({
            success : result.success,
            code : result.code,
            msg : result.msg
        }))
    } catch (err) {
        yield put(saveFail(err));
    }
}

export function* watchMasterProduct() {
    const { load, save } = masterProductAction;

    yield takeLatest(load, productListLoad);
    yield takeLatest(save, saveProductList);
}