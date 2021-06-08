import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getManufactureItemList, setManufactureProcessRev } from '../../../api/master';
import { toastAction } from '../../../common/Toast/slice';
import { masterManufactureAction, masterManufactureSelector } from './slice';

export function* manufactureItemListLoad() {
    const { loadSuccess, loadFail } = masterManufactureAction;

    try {
        const param = yield select(masterManufactureSelector.defaultParam);
        const result = yield call(getManufactureItemList, param);

        yield put(
            loadSuccess({
                list: result.list,
                totalCount: result.totalCount,
            })
        );
    } catch (err) {
        yield put(loadFail(err));
    }
}

export function* revisionManufactureProcess() {
    const { revisionSuccess, revisionFail } = masterManufactureAction
    const { show } = toastAction

    try {
        const param = yield select(masterManufactureSelector.focusRow)
        
        const result = yield call(setManufactureProcessRev, param)

        if (result.success) {
            yield put(show({ type: 'success', message: '제조공정정보를 개정했습니다.'}))
        } else {
            yield put(show({ type: 'error', message: result.msg }))
        }

        yield put(
            revisionSuccess({
                success: result.success,
                msg: result.code,
            })
        )
    } catch(err) {
        yield put(revisionFail(err))
    }
}

export function* watchMasterManufactureProcess() {
    const { load, revision } = masterManufactureAction;

    yield takeLatest(load, manufactureItemListLoad);
    yield takeLatest(revision, revisionManufactureProcess);
}