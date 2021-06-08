import { Popup, ResponsiveBox, TabPanel } from "devextreme-react";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlBox from "../../../components/ControlBox/ControlBox";
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import MaterialPurchaseOrderDialog from "./components/dialog/MaterialPurchaseOrderDialog";
import MaterialPurchaseOrderGrid from "./components/MaterialPurchaseOrderGrid";
import SearchRequirement from "./SearchRequirement";
import { purchaseOrderAction, purchaseOrderSelector } from "./slice";

const PurchaseOrder = () => {

  const dispatch = useDispatch();

  const { defaultParam } = useSelector(purchaseOrderSelector.all);

  const [dlgState, setDlgState] = useState(false);
  const [dlgTitle, setDlgTitle] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    dispatch(purchaseOrderAction.load());
  }, [defaultParam]);

  const mainSearch = (searchParam) => {
    dispatch(
      purchaseOrderAction.setDefaultParam({
        ...defaultParam,
        searchParam: searchParam,
      })
    );
  };

  //등록
  const mainReg = () => {
    setDlgState(true);
    setDlgTitle("원자재 구매 발주 등록");
    console.log(dlgState);
    console.log(dlgTitle);
  };

  const tabItems = [
    {
      index: 0,
      id: "material",
      title: "자재",
    },
    {
      index: 1,
      id: "tool",
      title: "공구",
    },
    {
      index: 2,
      id: "spare",
      title: "예비품",
    },
  ];

  const itemComponent = () => {
    return <div>test</div>;
  };

  return (
    <div>
      <Popup
        visible={dlgState}
        onHiding={() => setDlgState(false)}
        container=".dx-viewport"
        closeOnOutsideClick={true}
        title={dlgTitle}
        width={1200}
        height={600}
      >
        <MaterialPurchaseOrderDialog/>
      </Popup>
      <div>
        {/* <TabPanel
          style={{ padding: 20, paddingTop: 5 }}
          dataSource={tabItems}
          selectedIndex={selectedIndex}
          onOptionChanged={onOptionChanged}
          itemComponent={itemComponent}
          loop={false}
          animationEnabled={true}
          swipeEnabled={true}
        /> */}
        <SearchPanel mainSearch={mainSearch} list={SearchRequirement.getData()} />
        <ControlBox mainReg={mainReg}></ControlBox>

        <ResponsiveBox>
          <Row></Row>
          <Col></Col>
          <Item>
            <Location row={0} col={0}></Location>
            <MaterialPurchaseOrderGrid />
          </Item>
        </ResponsiveBox>
      </div>
    </div>
  );
};
export default PurchaseOrder;
