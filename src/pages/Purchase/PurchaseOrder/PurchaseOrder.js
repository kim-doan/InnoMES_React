import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import PurchaseOrderGrid from "./components/PurchaseOrderGrid";
import SearchRequirement from "./SearchRequirement";
import { purchaseOrderAction, purchaseOrderSelector } from "./slice";

const PurchaseOrder = () => {
  const dispatch = useDispatch();

  const {defaultParam} = useSelector(purchaseOrderSelector.all);

  useEffect( () => {
    dispatch(purchaseOrderAction.load());
  },[defaultParam]);

  const mainSearch = (searchParam) => {
    dispatch(
      purchaseOrderAction.setDefaultParam({
        ...defaultParam,
        searchParam: searchParam
      })
    )
  }

  return (
    <div>
      <SearchPanel
        mainSearch={mainSearch}
        list = {SearchRequirement.getData()}
      />
      <PurchaseOrderGrid/>
    </div>
  )
}
export default PurchaseOrder;