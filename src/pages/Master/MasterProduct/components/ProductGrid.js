import { DataGrid } from 'devextreme-react'
import { Column, Editing, Lookup, RequiredRule, AsyncRule } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ConvertToLookUp } from '../../../../common/LookUp/lookUpUtils'
import { masterProductAction, masterProductSelector } from '../slice'
import { DuplicateCheck } from '../../../../common/Util/GridUtil'
const ProductGrid = () => {
  const dispatch = useDispatch()

  const { isLoading, success, productList, defaultParam } = useSelector(masterProductSelector.all)

  useEffect(() => {
    dispatch(masterProductAction.load())
  }, [defaultParam])

  useEffect(() => {
    console.log(productList)
  }, [productList])

  useEffect(() => {
    if (success) {
      dispatch(masterProductAction.load())
    }
  }, [success])

  const onSaving = (event) => {
    event.cancel = true

    if (event.changes.length) {
      dispatch(masterProductAction.setProductList(event.changes))
      dispatch(masterProductAction.save(event.component))
    }

    // console.log(success)
    // if(success) {
    //     event.component.cancelEditData();
    // }
    // console.log(event)
  }

  return (
    <div>
      <DataGrid
        dataSource={productList}
        keyExpr="itemId"
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        showColumnLines={true}
        onSaving={onSaving}
      >
        <Editing mode="batch" allowUpdating={true} allowAdding={true} />

        <Column dataField="itemCode" caption="제품코드" fixed={true}>
          <RequiredRule />
          <AsyncRule message="중복된 값이다~~~~~~~" validationCallback={DuplicateCheck} />
        </Column>
        <Column dataField="itemName" caption="제품명" fixed={true}></Column>
        <Column dataField="prdtType" caption="제품유형">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'ITM001')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="prdtCtg" caption="카테고리">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'CTG001')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="prdtGroup" caption="그룹">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'GRP001')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="attMatType" caption="재질">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'ITA001')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="attStdType" caption="규격">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'ITA002')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="attDiaType" caption="소재경">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'ITA003')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="heatSpec" caption="열처리사양">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'SPF001')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="surfaceSpec" caption="표면처리사양">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'SPF002')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="coatingSpec" caption="코팅사양">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'SPF003')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="batchSize" caption="배치사이즈" format="fixedPoint"></Column>
        <Column dataField="batchUnit" caption="배치단위">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'UNT002')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="safetyQnt" caption="안전재고기준" format="fixedPoint"></Column>
        <Column dataField="lotSize" caption="로트사이즈" format="fixedPoint"></Column>
        <Column dataField="lotUnit" caption="로트단위">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'UNT018')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
        <Column dataField="invType" caption="로트관리여부">
          <Lookup
            dataSource={ConvertToLookUp('YN', '')}
            displayExpr="name"
            valueExpr="value"
          ></Lookup>
        </Column>
        <Column dataField="matProc" caption="원소재공정">
          <Lookup
            dataSource={ConvertToLookUp('CommonCode', 'ITA004')}
            displayExpr="codeKR"
            valueExpr="code"
          ></Lookup>
        </Column>
      </DataGrid>
    </div>
  )
}

export default ProductGrid
