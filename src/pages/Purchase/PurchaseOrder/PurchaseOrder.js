import { TabPanel } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlBox from "../../../components/ControlBox/ControlBox";
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import PurchaseOrderGrid from "./components/PurchaseOrderGrid";
import SearchRequirement from "./SearchRequirement";
import { purchaseOrderAction, purchaseOrderSelector } from "./slice";

const PurchaseOrder = () => {
  const dispatch = useDispatch();

  const { defaultParam } = useSelector(purchaseOrderSelector.all);

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

  const onSelectedIndexChange = (index) => {
    switch (index) {
      case 0:
        console.log('자재');
        break;
      case 1:
        console.log('공구');
        break;
      case 2:
        console.log('예비품');
        break;
    }
  };

  return (
    <div>
      <TabPanel
        style={{ padding: 20, paddingTop: 5 }}
        dataSource={[{ title: "자재" }, { title: "공구" }, { title: "예비품" }]}
        onSelectedIndexChange={onSelectedIndexChange}
      />
      <SearchPanel mainSearch={mainSearch} list={SearchRequirement.getData()} />
      <PurchaseOrderGrid />
    </div>
  );
};
export default PurchaseOrder;
