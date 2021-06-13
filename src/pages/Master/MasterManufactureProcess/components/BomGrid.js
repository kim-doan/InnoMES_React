import { useEffect, useState } from "react";
import { DataGrid } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";
import { masterManufactureAction, masterManufactureSelector } from "../slice";
import { Card } from "@material-ui/core";
import { Column, Lookup } from "devextreme-react/data-grid";
import { ConvertToLookUp } from "../../../../common/Grid/lookUpUtils";

const BomGrid = () => {
    const dispatch = useDispatch();
    const { manufactureList, itemSelectRowKey, routeSelectRowKey } = useSelector(masterManufactureSelector.all);

    return (
        <div style={{ padding: 20, paddingTop: 5}}>
            <Card>
                <DataGrid
                    dataSource={manufactureList[itemSelectRowKey] !== undefined 
                        && manufactureList[itemSelectRowKey].routeList[routeSelectRowKey] !== undefined 
                        && manufactureList[itemSelectRowKey].routeList[routeSelectRowKey].bomList}
                    keyExpr="bomSeq"
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true
                    }}
                    height={280}
                >
                    <Column dataField="bomSeq" width={60} caption="순번"></Column>
                    <Column name="itemCode" dataField="itemId" caption="투입소재">
                        <Lookup
                            dataSource={ConvertToLookUp("Item", "")}
                            displayExpr="itemCode"
                            valueExpr="itemId"
                        ></Lookup>
                    </Column>
                    <Column name="itemName" dataField="itemId" caption="투입소재명">
                        <Lookup
                            dataSource={ConvertToLookUp("Item", "")}
                            displayExpr="itemName"
                            valueExpr="itemId"
                        ></Lookup>
                    </Column>
                    <Column dataField="inQnt" caption="투입량"></Column>
                    <Column dataField="inUnit" caption="투입단위">
                        <Lookup
                            dataSource={ConvertToLookUp("CommonCode", "UNT001")}
                            displayExpr="codeKR"
                            valueExpr="code"
                        ></Lookup>
                    </Column>
                </DataGrid>
            </Card>
        </div>
    )
}

export default BomGrid;