import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Button, ResponsiveBox, SelectBox, TextBox } from "devextreme-react";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import { Label, SimpleItem } from "devextreme-react/form";
import { masterManufactureAction, masterManufactureSelector } from "../../slice";
import { ConvertToLookUp } from "../../../../../common/Grid/lookUpUtils";

const ManufactureProcessCopyDialog = () => {
    const dispatch = useDispatch();
    const { focusRow } = useSelector(masterManufactureSelector.all);

    const [selectItem, setSelectItem] = useState("");

    const selectBoxDisplay = (item) => {
        return item && item.itemCode + " / " + item.itemName;
    };

    const confirmBtnClick = () => {
        dispatch(masterManufactureAction.copy(selectItem));
        dispatch(masterManufactureAction.setDlgCopyState(false));
    }

    return (
        <ResponsiveBox>
            <Row></Row>
            <Row></Row>
            <Col></Col>
            <Item>
                <Location
                    row={0}
                    col={0}
                ></Location>
                    <SelectBox
                        showTitle={true}
                        dataSource={ConvertToLookUp(
                            "Product",
                            ""
                        )}
                        displayExpr={selectBoxDisplay}
                        valueExpr="itemId"
                        searchEnabled={true}
                        value={selectItem}
                        placeholder={"검색어를 입력하십시오."}
                        onValueChanged={(e) => setSelectItem(e.value)}
                    ></SelectBox>
                    <Label text={"제품"}></Label>
            </Item>
            <Item>
                <Location
                    row={1}
                    col={0}
                ></Location>
                    <Button
                    // icon="search"
                    width={"100%"}
                    height={40}
                    text="확인"
                    type="success"
                    stylingMode="contained"
                    onClick={confirmBtnClick}
                  />
            </Item>
        </ResponsiveBox>
    )
}

export default ManufactureProcessCopyDialog;