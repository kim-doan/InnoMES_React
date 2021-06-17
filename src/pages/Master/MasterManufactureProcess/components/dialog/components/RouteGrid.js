import * as _ from 'lodash'
import { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { DataGrid, Validator } from "devextreme-react";
import { Column, CustomRule, Editing, Lookup, RequiredRule, RowDragging } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../../../slice";
import SearchLookUp from "../../../../../../common/SearchLookUp/SearchLookUp";
import { GetProcessNode } from "../../../../../../common/Pool/MasterPool/MasterPool";
import { ConstantLine } from "devextreme-react/chart";
import ControlBox from '../../../../../../components/ControlBox/ControlBox';
import ResponsiveBox, { Col, Item, Location, Row } from "devextreme-react/responsive-box";

const RouteGrid = () => {
    const dispatch = useDispatch();
    const { focusRow, dlgRouteSelectRowKey } = useSelector(masterManufactureSelector.all);

    // const [tasks, setTasks] = useState(focusRow);


    const onReorder = (e) => {
        var copy = _.cloneDeep(focusRow);
        var temp = copy.routeList[e.toIndex];

        copy.routeList[e.toIndex] = copy.routeList[e.fromIndex];
        copy.routeList[e.fromIndex] = temp;

        copy.routeList.forEach((v, index) =>{
            v.procSeq = (index + 1)

            if(v.passYN == true) {
                v.routingSeq = 0;
            } else {
                v.routingSeq = (index + 1);
            }
        })
        
        dispatch(masterManufactureAction.setFocusRow(copy))
    }

    const onFocusedRowChanged = (e) => {
        dispatch(masterManufactureAction.setDlgRouteSelectRowKey(e.row.rowIndex));
    }

    const onSaving = (event) => {
        event.cancel = true
        if (event.changes.length) {
            dispatch(masterManufactureAction.setDlgRouteList(event.changes));
            event.component.cancelEditData();
        }
    }

    const routeUniqueValidate = (event) => {
        var procCode = event.data.procCode;
        var procSeq = event.data.procSeq;

        var uCount = _.filter(focusRow.routeList, (n) => {
            if (procSeq === undefined) {
                //신규 라우팅일경우
                return (n.procCode === procCode);
            } else {
                //기존 라우팅 수정일 경우
                return (n.procCode === procCode && n.procSeq !== procSeq);
            }
        }).length;

        return uCount > 0 ? false : true;
    }

    const mainAdd = () => {
        dispatch(masterManufactureAction.addDlgRouteList())
    }

    return (
        <div style={{ marginTop: 20, marginRight: 10 }}>
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
                            dataSource={focusRow.routeList}
                            keyExpr="procSeq"
                            focusedRowIndex={dlgRouteSelectRowKey}
                            focusedRowEnabled={true}
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
                            height={400}
                        >
                            <RowDragging
                                allowReordering={true}
                                onReorder={onReorder}
                                showDragIcons={true}
                            />
                            <Editing mode="cell" allowUpdating={true} allowAdding={false} allowDeleting={true} />
                            <Column dataField="procSeq" width={60} caption="순번" allowEditing={false}></Column>
                            <Column dataField="procCode" width={200} caption="공정" editCellType="Process" editCellComponent={SearchLookUp}>
                                <Lookup
                                    dataSource={GetProcessNode()}
                                    displayExpr="procName"
                                    valueExpr="procCode"
                                />
                                <RequiredRule />
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
                </Item>
            </ResponsiveBox>
        </div>
    )
}

export default RouteGrid;