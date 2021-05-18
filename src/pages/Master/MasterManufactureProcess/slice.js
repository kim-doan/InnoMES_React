import { createSelector, createSlice } from '@reduxjs/toolkit'
import * as _ from 'lodash'
import { Component, createElement } from 'react'

export const initialState = {
    isLoading : false,
    error: null,
    success : undefined,
    msg: null,
    manufactureList: [],
    defaultParam: {
        pageablee: { size: 10, page: 0 }
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
    selectMsgState,
    selectManufactureListState,
    selectDefaultParamState,
    selectTotalCountState,
    (isLoading, error, success, msg, manufactureList, defaultParam, totalCount) => {
        return {
            isLoading,
            error,
            success,
            msg,
            manufactureList,
            defaultParam,
            totalCount
        }
    }
)

export const masterManufactureProcessSelector = {
    isLoading: (state) => selectLoadingState(state[MASTER_MANUFACTURE_PROCESS]),
    error: (state) => selectErrorState(state[MASTER_MANUFACTURE_PROCESS]),
    success: (state) => selectSuccessState(state[MASTER_MANUFACTURE_PROCESS]),
    msg: (state) => selectMsgState(state[MASTER_MANUFACTURE_PROCESS]),
    manufactureList: (state) => selectManufactureListState(state[MASTER_MANUFACTURE_PROCESS]),
    defaultParam: (state) => selectDefaultParamState(state[MASTER_MANUFACTURE_PROCESS]),
    totalCount: (state) => selectTotalCountState(state[MASTER_MANUFACTURE_PROCESS]),
    all: (state) => selectAllState(state[MASTER_MANUFACTURE_PROCESS])
}

export const MASTER_MANUFACTURE_PROCESS = slice.name
export const masterManufactureReducer = slice.reducer
export const masterManufactureAction = slice.actions