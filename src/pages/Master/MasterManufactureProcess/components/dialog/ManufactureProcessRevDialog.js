import { Card } from "@material-ui/core";
import { Form, ResponsiveBox, SelectBox } from "devextreme-react";
import { Label, SimpleItem } from "devextreme-react/form";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ConvertToLookUp } from "../../../../../common/Grid/lookUpUtils";

const ManufactureProcessRevDialog = () => {

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

    return (
        <div>
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
                        <Form
                            id="detail-info"
                            readOnly={true}
                            showColonAfterLabel={true}
                            labelLocation={"left"}
                            colCountByScreen={colCountByScreen}
                            screenByWidth={screenByWidth}
                        >
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
                                    // value={searchParam[column.fieldName]}
                                    placeholder={"검색어를 입력하십시오."}
                                    // onValueChanged={(e) => changeItem(e, column.fieldName)}
                                ></SelectBox>
                                <Label text={"제품코드"}></Label>
                            </SimpleItem>
                        </Form>
                    </Card>
                </Item>
                <Item>
                    <Location
                        row={1}
                        col={0}
                    ></Location>
                    <ResponsiveBox>
                        <Row></Row>
                        <Col></Col>
                        <Col></Col>
                        <Item>
                            <Location
                                row={0}
                                col={0}
                            ></Location>
                            <Card>
                                bb
                            </Card>
                        </Item>
                        <Item>
                            <Location
                                row={0}
                                col={1}
                            ></Location>
                            <Card>
                                cc
                            </Card>
                        </Item>
                    </ResponsiveBox>
                </Item>
            </ResponsiveBox>
        </div>
    )
}

export default ManufactureProcessRevDialog;