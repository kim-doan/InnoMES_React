import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getManufactureItemList, setManufactureProcessMod, setManufactureProcessRev } from '../../../api/master';
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
    const { revisionSuccess, revisionFail, setDlgState, complete } = masterManufactureAction
    const { show } = toastAction

    try {
        const param = yield select(masterManufactureSelector.focusRow)
        const result = yield call(setManufactureProcessRev, param)
        if (result.success) {
            yield put(show({ type: 'success', message: '제조공정정보를 개정했습니다.'}))
            yield put(complete({ routeList: param.routeList}))
            yield put(setDlgState(false))
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
        yield put(show({ type: 'error', displayTime: 3000, message: "제조공정정보 개정에 실패했습니다. 관리자에게 문의하세요." }))
    }
}

export function* modifyManufactureProcess() {
    const { modifySuccess, modifyFail, setDlgState, complete } = masterManufactureAction
    const { show } = toastAction

    try {
        const param = yield select(masterManufactureSelector.focusRow)
        const result = yield call(setManufactureProcessMod, param)
        if(result.success) {
            yield put(show({ type: 'success', message: '제조공정정보를 수정했습니다.'}))
            yield put(complete({ routeList: param.routeList }))
            yield put(setDlgState(false))
        } else {
            yield put(show({ type: 'error', message: result.msg}))
        }

        yield put(
            modifySuccess({
                success: result.success,
                msg: result.code,
            })
        )
    } catch(err) {
        yield put(modifyFail(err))
        yield put(show({ type: 'error', displayTime: 3000, message: "제조공정정보 수정에 실패했습니다. 관리자에게 문의하세요."}))
    }
}

export function* watchMasterManufactureProcess() {
    const { load, revision, modify } = masterManufactureAction;

    yield takeLatest(load, manufactureItemListLoad);
    yield takeLatest(revision, revisionManufactureProcess);
    yield takeLatest(modify, modifyManufactureProcess);
}