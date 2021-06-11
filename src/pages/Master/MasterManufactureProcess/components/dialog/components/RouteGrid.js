import * as _ from 'lodash'
import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { DataGrid, Validator } from "devextreme-react";
import { Column, CustomRule, Editing, Lookup, RequiredRule } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";
import SearchLookUp from "../../../../../../common/SearchLookUp/SearchLookUp";
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

    const routeUniqueValidate = (event) => {
        var procCode = event.data.procCode;
        var procSeq = event.data.procSeq;

        var uCount = _.filter(focusRow.routeList, (n) => {
            if(procSeq === undefined) {
                //신규 라우팅일경우
                return (n.procCode === procCode);
            } else {
                //기존 라우팅 수정일 경우
                return (n.procCode === procCode && n.procSeq !== procSeq);
            }
        }).length;

        return uCount > 0 ? false : true;
    }

    return (
        <div style={{ marginTop: 20, marginRight: 10 }}>
            <Card>
                <DataGrid
                    dataSource={focusRow.routeList}
                    keyExpr="procSeq"
                    focusedRowIndex={routeSelectRowKey}
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
                        <RequiredRule/>
                        <CustomRule type="custom" validationCallback={routeUniqueValidate} message="라우팅 공정은 중복될 수 없습니다." />
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