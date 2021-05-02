import { DataGrid } from 'devextreme-react'
import { Column, Editing, Lookup } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ConvertToLookUp } from '../../../common/LookUp/lookUpUtils'
import ProductGrid from './components/ProductGrid'
import { masterProductAction, masterProductSelector } from './slice'

const MasterProduct = () => {
    const dispatch = useDispatch()

    const { isLoading, success, productList, defaultParam } = useSelector(masterProductSelector.all);

    useEffect(() => {
        dispatch(masterProductAction.load());
    }, [defaultParam])

    return (
        <div>
            <ProductGrid></ProductGrid>
        </div>
    )
}

export default MasterProduct