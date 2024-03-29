import { Card } from "@material-ui/core";
import { Button, Form, Popup, ResponsiveBox, SelectBox, TextBox } from "devextreme-react";
import { Label, RequiredRule, SimpleItem } from "devextreme-react/form";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../common/Grid/lookUpUtils";
import { masterManufactureAction, masterManufactureSelector } from "../../slice";
import BomGrid from "./components/BomGrid"
import RouteGrid from "./components/RouteGrid"
import ManufactureProcessCopyDialog from "./ManufactureProcessCopyDialog";

const ManufactureProcessRevDialog = () => {
    const dispatch = useDispatch();
    const { focusRow, dlgType, isLoading, dlgCopyState } = useSelector(masterManufactureSelector.all);

    const colCountByScreen = {
        sm: 2,
        md: 3,
        lg: 5,
    };

    function screenByWidth(width) {
        if (width < 1660 && width >= 1010) return "md";
        else if (width < 1010) return "sm";
        else return "lg";
    }

    const selectBoxDisplay = (item) => {
        return item && item.codeKR;
    };

    const selectUserBoxDisplay = (item) => {
        return item && item.userName;
    }

    const changeItem = (item, fieldName) => {
        var _focusRow = _.cloneDeep(focusRow);

        _focusRow[fieldName] = item.value;

        dispatch(masterManufactureAction.setFocusRow(_focusRow));
    };

    return (
        <div>
            <Popup
                visible={dlgCopyState}
                onHiding={() => dispatch(masterManufactureAction.setDlgCopyState(false))}
                container=".dx-viewport"
                closeOnOutsideClick={true}
                title={"불러오기"}
                width={500}
                height={250}
            >
                <ManufactureProcessCopyDialog></ManufactureProcessCopyDialog>
            </Popup>
            <ResponsiveBox>
                <Row></Row>
                <Row></Row>
                <Col></Col>
                <Item>
                    <Location
                        row={0}
                        col={0}
                    ></Location>
                    <Card>
                        <div style={{ padding: 20, paddingTop: 5 }}>
                            <Form
                                id="detail-info"
                                readOnly={true}
                                showColonAfterLabel={true}
                                labelLocation={"left"}
                                colCountByScreen={colCountByScreen}
                                screenByWidth={screenByWidth}
                            >
                                <SimpleItem>
                                    <TextBox
                                        placeholder={"검색어를 입력하십시오."}
                                        value={focusRow.itemCode}
                                    />
                                    <Label text={"제품코드"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <TextBox
                                        placeholder={"검색어를 입력하십시오."}
                                        value={focusRow.itemName}
                                    />
                                    <Label text={"제품명"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "ITM001"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.prdtType}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"제품유형"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "CTG001"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.prdtCtg}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"카테고리"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "GRP001"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.prdtGroup}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"그룹"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "ITA001"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.attMatType}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"재질"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "ITA002"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.attStdType}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"규격"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "ITA003"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.attDiaType}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"소재경"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "SPF001"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.heatSpec}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"열처리사양"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "SPF002"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.surfaceSpec}
                                        placeholder={"검색어를 입력하십시오."}
                                    ></SelectBox>
                                    <Label text={"표면처리사양"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "CommonCode",
                                            "PRS"
                                        )}
                                        displayExpr={selectBoxDisplay}
                                        valueExpr="code"
                                        searchEnabled={true}
                                        value={focusRow.prdtStatus}
                                        placeholder={"제품상태"}
                                        onValueChanged={(e) => changeItem(e, "prdtStatus")}
                                    >
                                    </SelectBox>
                                    <Label text={"*제품상태"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <SelectBox
                                        showTitle={true}
                                        dataSource={ConvertToLookUp(
                                            "User",
                                            ""
                                        )}
                                        displayExpr={selectUserBoxDisplay}
                                        valueExpr="userNo"
                                        searchEnabled={true}
                                        value={focusRow.revUser}
                                        placeholder={"개정자"}
                                        onValueChanged={(e) => changeItem(e, "revUser")}
                                    ></SelectBox>
                                    <Label text={"*개정자"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <TextBox
                                        placeholder={"개정사유"}
                                        value={focusRow.revCause}
                                        showClearButton={true}
                                        onValueChanged={(e) => changeItem(e, "revCause")}
                                    />
                                    <Label text={"개정사유"}></Label>
                                </SimpleItem>
                                <SimpleItem>
                                    <TextBox
                                        placeholder={"비고"}
                                        value={focusRow.description}
                                        showClearButton={true}
                                        onValueChanged={(e) => changeItem(e, "description")}
                                    />
                                    <Label text={"비고"}></Label>
                                </SimpleItem>
                            </Form>
                        </div>
                    </Card>
                </Item>
                <Item>
                    <Location
                        row={1}
                        col={0}
                    ></Location>
                    <ResponsiveBox>
                        <Row></Row>
                        <Row></Row>
                        <Col></Col>
                        <Col></Col>
                        <Item>
                            <Location
                                row={0}
                                col={0}
                            ></Location>
                            <RouteGrid></RouteGrid>
                        </Item>
                        <Item>
                            <Location
                                row={0}
                                col={1}
                            ></Location>
                            <BomGrid></BomGrid>
                        </Item>
                        <Item>
                            <Location
                                row={1}
                                col={1}
                            ></Location>
                            <div>
                                <Button
                                    width={200}
                                    height={45}
                                    text="확인"
                                    type="success"
                                    stylingMode="contained"
                                    style={{ float: "right", marginTop: 20 }}
                                    disabled={isLoading}
                                    onClick={() => {
                                        switch (dlgType) {
                                            case "REV":
                                                dispatch(masterManufactureAction.revision())
                                                break;
                                            case "MOD":
                                                dispatch(masterManufactureAction.modify())
                                                break;
                                        }
                                    }}
                                />
                            </div>
                        </Item>
                    </ResponsiveBox>
                </Item>
            </ResponsiveBox>
        </div>
    )
}

export default ManufactureProcessRevDialog;