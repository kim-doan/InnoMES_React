import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Paging } from 'devextreme-react/data-grid'
import * as _ from 'lodash'
import { Component, createElement } from 'react'

export const initialState = {
    //API 응답
    isLoading : false,
    error: null,
    success : undefined,
    msg: null,
    totalCount: 0,
    //API 요청
    defaultParam: {
        pageable: { size: 10, page: 0 }
    },
    //메인그리드
    manufactureList: [], //전체
    itemSelectRowKey: 0, // 포커스 품목 index
    routeSelectRowKey: 0, // 포커스 라우팅 index
    //다이얼로그 (개정, 수정)
    dlgState: false, // 팝업상태 false: 닫음, true: 열음
    dlgType: "REV", // 다이얼 유형 REV: 개정, MOD: 수정 
    focusRow: {}, // 포커스된 요소정보 
    dlgRouteSelectRowKey: 0,
    //다이얼로그 (불러오기)
    dlgCopyState: false, //팝업상태 false: 닫음, true 열음
}

const reducers = {
    load: (state, payload) => {
        state.isLoading = true
    },
    loadSuccess: (state, { payload: { list, totalCount }}) => {
        state.isLoading = false
        state.manufactureList = list
        state.totalCount = totalCount
    },
    loadFail: (state, { payload: error}) => {
        state.isLoading = false
        state.error = error
    },
    revision: (state, payload) => {
        state.isLoading = true
        state.success = undefined
        state.focusRow.createUser = "1"
        state.focusRow.updateUser = "1"
        state.focusRow.used = 1
    },
    revisionSuccess: (state, {payload: { success, msg }}) => {
        state.isLoading = false
        state.success = success;
        state.msg = msg;
    },
    revisionFail: (state, { payload: error }) => {
        state.isLoading = false
        state.error = error
    },
    modify: (state, payload) => {
        state.isLoading = true
        state.success = undefined
        state.focusRow.createUser = "1"
        state.focusRow.updateUser = "1"
        state.focusRow.used = 1
    },
    modifySuccess: (state, { payload: { success, msg }}) => {
        state.isLoading = false
        state.success = success
        state.msg = msg;
    },
    modifyFail: (state, { payload: error }) => {
        state.isLoading = false
        state.error = error
    },
    complete: (state, {payload: { focusRow }}) => {
        state.manufactureList[state.itemSelectRowKey].prdtStatus = focusRow.prdtStatus;
        state.manufactureList[state.itemSelectRowKey].revCause = focusRow.revCause;
        state.manufactureList[state.itemSelectRowKey].description = focusRow.description;
        state.manufactureList[state.itemSelectRowKey].routeList = focusRow.routeList;
    },
    copy: (state, payload) => {
        var target = _.filter(state.manufactureList, { 'prdtId' : payload.payload });

        if(target.length <= 0) {
            return;
        }
        
        state.focusRow.routeList = target[0].routeList;
    },
    addDlgRouteList: (state, payload) => {
        state.focusRow.routeList.push({
            procSeq : state.focusRow.routeList.length + 1, 
            routingSeq : state.focusRow.routeList.length + 1,
            inQnt : 0,
            outQnt : 0,
            qntUnit : 'UNT002001',
            leadTime : 0,
            settingTime : 0,
            unitWeight : 0,
            bomList : []
        })
    },
    addDlgBomList: (state, payload) => {
        state.focusRow.routeList[state.dlgRouteSelectRowKey].bomList.push({
            bomSeq : state.focusRow.routeList[state.dlgRouteSelectRowKey].bomList.length + 1,
            swapSeq: 0,
            procCode : state.focusRow.routeList[state.dlgRouteSelectRowKey].procCode,
            prdtId : state.focusRow.prdtId,
            inQnt : 0,
            inUnit : 'UNT001001',
            createUser : "1",
            updateUser : "1",
            used : 1,
        })
    },
    setItemSelectRowKey: (state, payload) => {
        state.itemSelectRowKey = payload.payload
    },
    setRouteSelectRowKey: (state, payload) => {
        state.routeSelectRowKey = payload.payload
    },
    setDlgState: (state, payload) => {
        state.dlgState = payload.payload

        if(payload.payload === false) {
            state.focusRow = state.manufactureList[state.itemSelectRowKey]
        }
    },
    setDlgCopyState: (state, payload) => {
        state.dlgCopyState = payload.payload  
    },
    setDlgType: (state, payload) => {
        state.dlgType = payload.payload
    },
    setDefaultParam: (state, payload) => {
        state.defaultParam = payload.payload;
    },
    setFocusRow: (state, payload) => {
        state.focusRow = payload.payload;
    },
    setDlgRouteSelectRowKey: (state, payload) => {
        state.dlgRouteSelectRowKey = payload.payload;
    },
    setDlgRouteList: (state, payload) => {
        payload.payload.forEach((value) => {
            var procSeq = value.key
            var data = value.data
            var type = value.type

            var editRow = _.find(state.focusRow.routeList, { procSeq: procSeq })

            switch (type) {
                case "update":
                    for(var key in data) {
                        if(editRow[key] != data[key]) {
                            editRow[key] = data[key]
                        }
                    }
                    break;
                case 'remove':
                    _.remove(state.focusRow.routeList, { 'procSeq': procSeq });

                    state.focusRow.routeList.forEach((v, index) => {
                        v.procSeq = (index + 1)
                    })
                    break;
            }

            //패스공정일 경우 해당 공정 routingSeq 0
            var count = 0;
            state.focusRow.routeList.forEach((value, index) => {
                var passYN = value["passYN"];

                if(passYN === true) {
                    value["routingSeq"] = 0;
                } else {
                    value["routingSeq"] = count++;
                }
            })
        })
    },
    setDlgBomList: (state, payload) => {
        var bomList = state.focusRow.routeList[state.dlgRouteSelectRowKey].bomList;
        var changes = payload.payload.changes;

        changes.forEach((value) => {
            var bomSeq = value.key
            var data = value.data
            var type = value.type

            switch(type) {
                case "insert":
                    data["bomSeq"] = bomList.length + 1;
                    bomList.push(data);
                    break;
                case "update":
                    var editRow = _.find(bomList, { bomSeq : bomSeq });

                    for(var key in data) {
                        if(editRow[key] != data[key]) {
                            editRow[key] = data[key]
                        }
                    }
                    break;
                case "remove":
                    _.remove(bomList, { 'bomSeq' : bomSeq })
                    bomList.forEach((v, index) => {
                        v.bomSeq = (index + 1);
                    })
                    break;
            }
        })

        state.focusRow.routeList[state.dlgRouteSelectRowKey].bomList = bomList;
    }
}

const name = "MASTER_MANUFACTURE_PROCESS"

const slice = createSlice({
    name,
    initialState,
    reducers
})

const selectLoadingState = createSelector(
    (state) => state.isLoading,
    (isLoading) => isLoading
)

const selectErrorState = createSelector(
    (state) => state.error,
    (error) => error
)

const selectSuccessState = createSelector(
    (state) => state.success,
    (success) => success
)

const selectDlgState = createSelector(
    (state) => state.dlgState,
    (dlgState) => dlgState
)

const selectDlgCopyState = createSelector(
    (state) => state.dlgCopyState,
    (dlgCopyState) => dlgCopyState
)

const selectDlgType = createSelector(
    (state) => state.dlgType,
    (dlgType) => dlgType
)

const selectMsgState = createSelector(
    (state) => state.msg,
    (msg) => msg
)

const selectManufactureListState = createSelector(
    (state) => state.manufactureList,
    (manufactureList) => manufactureList
)

const selectFocusRowState = createSelector(
    (state) => state.focusRow,
    (focusRow) => focusRow
)

const selectItemSelectRowKey = createSelector(
    (state) => state.itemSelectRowKey,
    (itemSelectRowKey) => itemSelectRowKey
)

const selectRouteSelectRowKey = createSelector(
    (state) => state.routeSelectRowKey,
    (routeSelectRowKey) => routeSelectRowKey
)

const selectDlgRouteSelectRowKey = createSelector(
    (state) => state.dlgRouteSelectRowKey,
    (dlgRouteSelectRowKey) => dlgRouteSelectRowKey
)

const selectDefaultParamState = createSelector(
    (state) => state.defaultParam,
    (defaultParam) => defaultParam
)

const selectTotalCountState = createSelector(
    (state) => state.totalCount,
    (totalCount) => totalCount
)

const selectAllState = createSelector(
    selectLoadingState,
    selectErrorState,
    selectSuccessState,
    selectDlgState,
    selectDlgCopyState,
    selectDlgType,
    selectMsgState,
    selectItemSelectRowKey,
    selectRouteSelectRowKey,
    selectDlgRouteSelectRowKey,
    selectManufactureListState,
    selectFocusRowState,
    selectDefaultParamState,
    selectTotalCountState,
    (isLoading, error, success, dlgState, dlgCopyState, dlgType, msg, itemSelectRowKey, routeSelectRowKey, dlgRouteSelectRowKey, manufactureList, focusRow, defaultParam, totalCount) => {
        return {
            isLoading,
            error,
            success,
            dlgState,
            dlgCopyState,
            dlgType,
            msg,
            itemSelectRowKey,
            routeSelectRowKey,
            dlgRouteSelectRowKey,
            manufactureList,
            focusRow,
            defaultParam,
            totalCount
        }
    }
)

export const masterManufactureSelector = {
    isLoading: (state) => selectLoadingState(state[MASTER_MANUFACTURE_PROCESS]),
    error: (state) => selectErrorState(state[MASTER_MANUFACTURE_PROCESS]),
    success: (state) => selectSuccessState(state[MASTER_MANUFACTURE_PROCESS]),
    dlgState: (state) => selectDlgState(state[MASTER_MANUFACTURE_PROCESS]),
    dlgCopyState: (state) => selectDlgCopyState(state[MASTER_MANUFACTURE_PROCESS]),
    dlgType: (state) => selectDlgType(state[MASTER_MANUFACTURE_PROCESS]),
    msg: (state) => selectMsgState(state[MASTER_MANUFACTURE_PROCESS]),
    itemSelectRowKey: (state) => selectItemSelectRowKey(state[MASTER_MANUFACTURE_PROCESS]),
    routeSelectRowKey: (state) => selectRouteSelectRowKey(state[MASTER_MANUFACTURE_PROCESS]),
    dlgRouteSelectRowKey: (state) => selectDlgRouteSelectRowKey(state[MASTER_MANUFACTURE_PROCESS]),
    manufactureList: (state) => selectManufactureListState(state[MASTER_MANUFACTURE_PROCESS]),
    focusRow: (state) => selectFocusRowState(state[MASTER_MANUFACTURE_PROCESS]),
    defaultParam: (state) => selectDefaultParamState(state[MASTER_MANUFACTURE_PROCESS]),
    totalCount: (state) => selectTotalCountState(state[MASTER_MANUFACTURE_PROCESS]),
    all: (state) => selectAllState(state[MASTER_MANUFACTURE_PROCESS])
}

export const MASTER_MANUFACTURE_PROCESS = slice.name
export const masterManufactureReducer = slice.reducer
export const masterManufactureAction = slice.actions