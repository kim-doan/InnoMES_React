import * as _ from 'lodash'
import { useEffect, useState } from "react";
import { DataGrid } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";
import { Card } from "@material-ui/core";
import { Column, CustomRule, Editing, Lookup, RequiredRule, RowDragging } from "devextreme-react/data-grid";
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import SearchLookUp from "../../../../../../common/SearchLookUp/SearchLookUp";
import { GetBomNode } from "../../../../../../common/Pool/MasterPool/MasterPool";
import ResponsiveBox, { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import ControlBox from '../../../../../../components/ControlBox/ControlBox';

const BomGrid = () => {
    const dispatch = useDispatch();
    const { focusRow, dlgRouteSelectRowKey } = useSelector(masterManufactureSelector.all);

    const onInitNewRow = (event) => {
        event.component.saveEditData();
        event.data.procCode = focusRow.routeList[dlgRouteSelectRowKey].procCode;
        event.data.prdtId = focusRow.prdtId;
        event.data.inQnt = 0;
        event.data.inUnit = "UNT001001";
        event.data.createUser = "1";
        event.data.updateUser = "1";
        event.data.used = 1;
        event.data.swapSeq = 0;
    }

    const onReorder = (e) => {
        var copy = _.cloneDeep(focusRow);
        var temp = copy.routeList[dlgRouteSelectRowKey].bomList[e.toIndex];

        copy.routeList[dlgRouteSelectRowKey].bomList[e.toIndex] = copy.routeList[dlgRouteSelectRowKey].bomList[e.fromIndex];
        copy.routeList[dlgRouteSelectRowKey].bomList[e.fromIndex] = temp;

        copy.routeList[dlgRouteSelectRowKey].bomList.forEach((v, index) =>{
            v.bomSeq = (index + 1)
        })
        
        dispatch(masterManufactureAction.setFocusRow(copy))
    }

    const onSaving = (event) => {
        event.cancel = true
        if (event.changes.length) {
            dispatch(masterManufactureAction.setDlgBomList(event));
            event.component.cancelEditData();
        }
    }

    const mainAdd = () => {
        dispatch(masterManufactureAction.addDlgBomList());
    }

    return (
        <div style={{ marginTop: 20, marginLeft: 10 }}>
            <ResponsiveBox>
                <Row></Row>
                <Row></Row>
                <Col></Col>
                <Item>
                    <Location
                        row={0}
                        col={0}
                    ></Location>
                    <ControlBox mainAdd={mainAdd}></ControlBox>
                </Item>
                <Item>
                    <Location
                        row={1}
                        col={0}
                    ></Location>
                    <Card>
                        <DataGrid
                            dataSource={focusRow.routeList !== undefined && focusRow.routeList[dlgRouteSelectRowKey] !== undefined && focusRow.routeList[dlgRouteSelectRowKey].bomList}
                            keyExpr="bomSeq"
                            columnAutoWidth={true}
                            rowAlternationEnabled={true}
                            onInitNewRow={onInitNewRow}
                            showColumnLines={true}
                            onSaving={onSaving}
                            loadPanel={{
                                showIndicator: true,
                                enabled: true
                            }}
                            height={400}
                        >
                            <RowDragging
                                allowReordering={true}
                                onReorder={onReorder}
                                showDragIcons={true}
                            />
                            <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} />
                            <Column dataField="bomSeq" width={60} caption="순번" allowEditing={false}></Column>
                            <Column dataField="itemId" caption="투입소재" editCellType="Bom" editCellComponent={SearchLookUp}>
                                <Lookup
                                    dataSource={GetBomNode()}
                                    displayExpr="itemName"
                                    valueExpr="itemId"
                                />
                                <RequiredRule />
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
                </Item>
            </ResponsiveBox>
        </div>
    )
}

export default BomGrid;