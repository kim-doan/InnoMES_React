import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getProductList } from '../../../api/master';
import { masterProductAction, masterProductSelector } from './slice';

export function* productListLoad() {
    const { loadSuccess, loadFail } = masterProductAction

    try {
        const param = yield select(masterProductSelector.defaultParam);
        const result = yield call(getProductList, param);

        yield put(loadSuccess({
            list : result.list,
        }));
    } catch (err) {
        yield put(loadFail(err));
    }
}

export function* watchMasterProduct() {
    const { load } = masterProductAction;

    yield takeLatest(load, productListLoad);
}