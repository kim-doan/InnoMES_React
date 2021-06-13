import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { DataGrid } from "devextreme-react";
import { Column, Lookup } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../slice";


const RouteGrid = () => {
    const dispatch = useDispatch();
    const { routeList, routeSelectRowKey, manufactureList, itemSelectRowKey } = useSelector(masterManufactureSelector.all);
    const [selectedRowKeys, setSelectedRowKeys] = useState(0);

    // useEffect(() => {
    //     if(routeList.length <= 0) {
    //         dispatch(masterManufactureAction.setBomList([]))
    //     } else {
    //         dispatch(masterManufactureAction.setBomList(routeList[0].bomList))
    //     }
    // }, [routeList])

    const onFocusedRowChanged = (e) => {
        if(e.rowIndex > -1) {
            dispatch(masterManufactureAction.setRouteSelectRowKey(e.row.rowIndex))
        } 
    }

    // const onOptionChanged = (e) => {
    //     if(e.fullName == 'focusedRowIndex') {
    //         if(e.value > -1)
    //             // setSelectedRowKeys(e.value);
    //             dispatch(masterManufactureAction.setRouteSelectRowKey(e.value))
    //     }
    // }

    return (
        <div style={{ padding: 20, paddingTop: 5 }}>
            <Card>
                <DataGrid
                    dataSource={manufactureList[itemSelectRowKey] !== undefined && manufactureList[itemSelectRowKey].routeList}
                    keyExpr="procSeq"
                    focusedRowIndex={routeSelectRowKey}
                    focusedRowEnabled={true}
                    // onOptionChanged={onOptionChanged}
                    onFocusedRowChanged={onFocusedRowChanged}
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true,
                    }}
                    height={280}
                >
                    <Column dataField="procSeq" width={60} caption="순번"></Column>
                    <Column dataField="procCode" caption="공정코드"></Column>
                    <Column name="procName" dataField="procCode" caption="공정명">
                        <Lookup
                            dataSource={ConvertToLookUp("Process", "")}
                            displayExpr="procName"
                            valueExpr="procCode"
                        ></Lookup>
                    </Column>
                    <Column dataField="inOutType" caption="내외작">
                        <Lookup
                            dataSource={ConvertToLookUp("CommonCode", "TPS019")}
                            displayExpr="codeKR"
                            valueExpr="code"
                        ></Lookup>
                    </Column>
                </DataGrid>
            </Card>
        </div>
    )
}

export default RouteGrid;