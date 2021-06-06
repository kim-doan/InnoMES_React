import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Paging } from 'devextreme-react/data-grid'
import * as _ from 'lodash'
import { Component, createElement } from 'react'

export const initialState = {
    isLoading : false,
    error: null,
    success : undefined,
    msg: null,
    routeSelectRowKey: 0,
    manufactureList: [],
    routeList: [],
    bomList: [],
    focusRow: {},
    defaultParam: {
        pageable: { size: 10, page: 0 }
    },
    totalCount: 0
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
    setDefaultParam: (state, payload) => {
        state.defaultParam = payload.payload;
    },
    setRouteList: (state, payload) => {
        state.routeList = payload.payload;
    },
    setBomList: (state, payload) => {
        state.bomList = payload.payload;
    },
    setFocusRow: (state, payload) => {
        state.focusRow = payload.payload;
    },
    setRouteSelectRowKey: (state, payload) => {
        state.routeSelectRowKey = payload.payload;
    },
    setDlgRouteList: (state, payload) => {
        payload.payload.forEach((value) => {
            var procSeq = value.key
            var data = value.data
            var type = value.type

            var editRow = _.find(state.focusRow.routeList, { procSeq: procSeq })

            switch (type) {
                case "insert":
                    state.focusRow.routeList.push(data);
                    break;
                case "update":
                    for(var key in data) {
                        if(editRow[key] != data[key]) {
                            editRow[key] = data[key]
                        }
                    }
                    break;
            }
        })
    },
    setDlgBomList: (state, payload) => {
        var bomList = _.cloneDeep(payload.payload.component.getDataSource()._items);
        var changes = payload.payload.changes;

        if(bomList.length > 0) {
            changes.forEach((value) => {
                var bomSeq = value.key
                var data = value.data
                var type = value.type

                var editRow = _.find(bomList, { bomSeq : bomSeq });

                switch(type) {
                    case "insert":
                        bomList.push(data);
                        break;
                    case "update":
                        for(var key in data) {
                            if(editRow[key] != data[key]) {
                                editRow[key] = data[key]
                            }
                        }
                        break;
                }
            })

            state.focusRow.routeList[state.routeSelectRowKey].bomList = bomList;
        }
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

const selectRouteSelectRowKey = createSelector(
    (state) => state.routeSelectRowKey,
    (routeSelectRowKey) => routeSelectRowKey
)

const selectDefaultParamState = createSelector(
    (state) => state.defaultParam,
    (defaultParam) => defaultParam
)

const selectTotalCountState = createSelector(
    (state) => state.totalCount,
    (totalCount) => totalCount
)

const selectRouteListState = createSelector(
    (state) => state.routeList,
    (routeList) => routeList
)

const selectBomListState = createSelector(
    (state) => state.bomList,
    (bomList) => bomList
)

const selectAllState = createSelector(
    selectLoadingState,
    selectErrorState,
    selectSuccessState,
    selectMsgState,
    selectRouteSelectRowKey,
    selectManufactureListState,
    selectRouteListState,
    selectBomListState,
    selectFocusRowState,
    selectDefaultParamState,
    selectTotalCountState,
    (isLoading, error, success, msg, routeSelectRowKey, manufactureList, routeList, bomList, focusRow, defaultParam, totalCount) => {
        return {
            isLoading,
            error,
            success,
            msg,
            routeSelectRowKey,
            manufactureList,
            routeList,
            bomList,
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
    msg: (state) => selectMsgState(state[MASTER_MANUFACTURE_PROCESS]),
    routeSelectRowKey: (state) => selectRouteSelectRowKey(state[MASTER_MANUFACTURE_PROCESS]),
    manufactureList: (state) => selectManufactureListState(state[MASTER_MANUFACTURE_PROCESS]),
    routeList: (state) => selectRouteListState(state[MASTER_MANUFACTURE_PROCESS]),
    bomList: (state) => selectBomListState(state[MASTER_MANUFACTURE_PROCESS]),
    focusRow: (state) => selectFocusRowState(state[MASTER_MANUFACTURE_PROCESS]),
    defaultParam: (state) => selectDefaultParamState(state[MASTER_MANUFACTURE_PROCESS]),
    totalCount: (state) => selectTotalCountState(state[MASTER_MANUFACTURE_PROCESS]),
    all: (state) => selectAllState(state[MASTER_MANUFACTURE_PROCESS])
}

export const MASTER_MANUFACTURE_PROCESS = slice.name
export const masterManufactureReducer = slice.reducer
export const masterManufactureAction = slice.actions