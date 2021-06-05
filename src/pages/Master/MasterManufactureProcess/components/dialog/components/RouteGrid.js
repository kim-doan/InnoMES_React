import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { DataGrid } from "devextreme-react";
import { Column, Lookup } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";


const RouteGrid = () => {
    const dispatch = useDispatch();
    const { routeList } = useSelector(masterManufactureSelector.all);
    const [selectedRowKeys, setSelectedRowKeys] = useState(0);

    useEffect(() => {
        if(routeList.length <= 0) {
            dispatch(masterManufactureAction.setBomList([]))
        } else {
            dispatch(masterManufactureAction.setBomList(routeList[0].bomList))
        }
    }, [routeList])

    const onFocusedRowChanged = (e) => {
        if(e.rowIndex > -1) {
            dispatch(masterManufactureAction.setBomList(e.row.data.bomList))
        } 
    }

    const onOptionChanged = (e) => {
        if(e.fullName == 'focusedRowIndex') {
            if(e.value > -1)
                setSelectedRowKeys(e.value);
        }
    }

    return (
        <div style={{ marginTop: 20, marginRight: 10 }}>
            <Card>
                <DataGrid
                    dataSource={routeList}
                    keyExpr="procSeq"
                    focusedRowIndex={selectedRowKeys}
                    focusedRowEnabled={true}
                    onOptionChanged={onOptionChanged}
                    onFocusedRowChanged={onFocusedRowChanged}
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true,
                    }}
                    height={450}
                >
                    <Column dataField="procSeq" width={60} caption="순번"></Column>
                    <Column dataField="procCode" caption="공정"></Column>
                    <Column dataField="passYN" caption="패스공정여부"></Column>
                    <Column dataField="outQnt" caption="산출장입량"></Column>
                    <Column dataField="qntUnit" caption="장입단위">
                        <Lookup
                            dataSource={ConvertToLookUp("CommonCode", "UNT002")}
                            displayExpr="codeKR"
                            valueExpr="code"
                        ></Lookup>
                    </Column>
                    <Column dataField="leadTime" caption="리드타임"></Column>
                    <Column dataField="settingTime" caption="기본세팅시간"></Column>
                    <Column dataField="unitWeight" caption="단중"></Column>
                    <Column dataField="locCode" caption="적재위치"></Column>
                    {/* <Column dataField="inOutType" caption="내외작">
                        <Lookup
                            dataSource={ConvertToLookUp("CommonCode", "TPS019")}
                            displayExpr="codeKR"
                            valueExpr="code"
                        ></Lookup>
                    </Column> */}
                </DataGrid>
            </Card>
        </div>
    )
}

export default RouteGrid;