import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";
import SearchLookUp from "../../../../../../common/SearchLookUp/SearchLookUp";
import * as _ from 'lodash'
import { GetProcessNode } from "../../../../../../common/Pool/MasterPool/MasterPool";
import { ConstantLine } from "devextreme-react/chart";

const RouteGrid = () => {
    const dispatch = useDispatch();
    const { focusRow, routeSelectRowKey } = useSelector(masterManufactureSelector.all);

    const [selectedRowKeys, setSelectedRowKeys] = useState(0);

    // const onOptionChanged = (e) => {
    //     if(e.fullName == 'focusedRowIndex') {
    //         if(e.value > -1) {
    //             setSelectedRowKeys(e.value);
    //             dispatch(masterManufactureAction.setRouteSelectRowKey(e.value));
    //         }
    //     }
    // }

    const onFocusedRowChanged = (e) => {
        setSelectedRowKeys(e.row.rowIndex);
        dispatch(masterManufactureAction.setRouteSelectRowKey(e.row.rowIndex));
    }

    const onInitNewRow = (event) => {
        event.component.saveEditData();
        event.data.inQnt = 0;
        event.data.outQnt = 0;
        event.data.qntUnit = 'UNT002001';
        event.data.leadTime = 0;
        event.data.settingTime = 0;
        event.data.unitWeight = 0;
        event.data.bomList = [];
    }

    const onSaving = (event) => {
        event.cancel = true
        if(event.changes.length) {
            dispatch(masterManufactureAction.setDlgRouteList(event.changes));
            event.component.cancelEditData();
        }
    }

    return (
        <div style={{ marginTop: 20, marginRight: 10 }}>
            <Card>
                <DataGrid
                    dataSource={focusRow.routeList}
                    keyExpr="procSeq"
                    focusedRowIndex={selectedRowKeys}
                    focusedRowEnabled={true}
                    onInitNewRow={onInitNewRow}
                    // onOptionChanged={onOptionChanged}
                    onFocusedRowChanged={onFocusedRowChanged}
                    onSaving={onSaving}
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true,
                    }}
                    height={450}
                >
                    <Editing mode="batch" allowUpdating={true} allowAdding={true} allowDeleting={true} />
                    <Column dataField="procSeq" width={60} caption="순번" allowEditing={false}></Column>
                    <Column dataField="procCode" width={200} caption="공정" editCellType="Process" editCellComponent={SearchLookUp}>
                        <Lookup
                            dataSource={GetProcessNode()}
                            displayExpr="procName"
                            valueExpr="procCode"
                        />
                    </Column>
                    <Column dataField="passYN" caption="패스공정여부" dataType="boolean"></Column>
                    <Column dataField="outQnt" caption="산출장입량" format="#,##0.##"></Column>
                    <Column dataField="qntUnit" caption="장입단위">
                        <Lookup
                            dataSource={ConvertToLookUp("CommonCode", "UNT002")}
                            displayExpr="codeKR"
                            valueExpr="code"
                        ></Lookup>
                    </Column>
                    <Column dataField="leadTime" caption="리드타임" format="#,##0.##"></Column>
                    <Column dataField="settingTime" caption="기본세팅시간" format="#,##0.##"></Column>
                    <Column dataField="unitWeight" caption="단중" format="#,##0.##"></Column>
                    <Column dataField="locCode" caption="적재위치"></Column>
                </DataGrid>
            </Card>
        </div>
    )
}

export default RouteGrid;