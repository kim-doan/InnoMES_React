import { useEffect, useState } from "react";
import { DataGrid } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";
import { Card } from "@material-ui/core";
import { Column, Editing, Lookup } from "devextreme-react/data-grid";
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import SearchLookUp from "../../../../../../common/SearchLookUp/SearchLookUp";
import { GetBomNode } from "../../../../../../common/Pool/MasterPool/MasterPool";

const BomGrid = () => {
    const dispatch = useDispatch();
    const { focusRow, routeSelectRowKey } = useSelector(masterManufactureSelector.all);

    const onSaving = (event) => {
        event.cancel = true
        if(event.changes.length) {
            dispatch(masterManufactureAction.setDlgBomList(event));
            event.component.cancelEditData();
        }
    }

    return (
        <div style={{ marginTop: 20, marginLeft: 10}}>
            <Card>
                <DataGrid
                    dataSource={focusRow.routeList !== undefined && focusRow.routeList[routeSelectRowKey].bomList}
                    keyExpr="bomSeq"
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    onSaving={onSaving}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true
                    }}
                    height={450}
                >
                    <Editing mode="batch" allowUpdating={true} allowAdding={true} allowDeleting={true} />
                    <Column dataField="bomSeq" width={60} caption="순번"></Column>
                    <Column dataField="itemId" caption="투입소재" editCellType="Bom" editCellComponent={SearchLookUp}>
                        <Lookup
                            dataSource={GetBomNode()}
                            displayExpr="itemName"
                            valueExpr="itemId"
                        />
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