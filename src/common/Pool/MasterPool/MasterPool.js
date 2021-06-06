import * as _ from 'lodash'
import {
  getItemPool,
  getProductPool,
  getMaterialPool,
  getToolPool,
  getPartPool,
  getProcessPool,
  getUserPool,
  getCompanyPool,
} from "../../../api/pool";

const BindItemNode = () => {
  getItemPool().then((response) => {
    localStorage.setItem("ItemPool", JSON.stringify(response));
  });
};

const BindProductNode = () => {
  getProductPool().then((response) => {
    localStorage.setItem("ProductPool", JSON.stringify(response));
  });
};

const BindMaterialNode = () => {
  getMaterialPool().then((response) => {
    localStorage.setItem("MaterialPool", JSON.stringify(response));
  });
};

const BindToolNode = () => {
  getToolPool().then((response) => {
    localStorage.setItem("ToolPool", JSON.stringify(response));
  });
};

const BindPartNode = () => {
  getPartPool().then((response) => {
    localStorage.setItem("PartPool", JSON.stringify(response));
  });
};

const BindProcessNode = () => {
  getProcessPool().then((response) => {
    localStorage.setItem("ProcessPool", JSON.stringify(response));
  });
};

const BindUserNode = () => {
  getUserPool().then((response) => {
    localStorage.setItem("UserPool", JSON.stringify(response));
  });
};

const BindCompanyNode = () => {
  getCompanyPool().then((response) => {
    localStorage.setItem("CompanyPool", JSON.stringify(response));
  });
};


const GetBomNode = () => {
  var itemPool = _.values(JSON.parse(localStorage.getItem("ItemPool")));
  var productPool = _.values(JSON.parse(localStorage.getItem("ProductPool")));

  var semiProduct = _.filter(productPool, { prdtType : "ITM001002"});
  var material = _.filter(itemPool, { itemType : "ITM002"});
  
  return _.merge(semiProduct, material);
}

const GetItemNode = () => {
  return _.values(JSON.parse(localStorage.getItem("ItemPool")));
};

const GetProductNode = () => {
  return _.values(JSON.parse(localStorage.getItem("ProductPool")));
};

const GetMaterialNode = () => {
  return _.values(JSON.parse(localStorage.getItem("MaterialPool")));
};

const GetToolNode = () => {
  return _.values(JSON.parse(localStorage.getItem("ToolPool")));
};

const GetPartNode = () => {
  return _.values(JSON.parse(localStorage.getItem("PartPool")));
};

const GetProcessNode = () => {
  return _.values(JSON.parse(localStorage.getItem("ProcessPool")));
};

const GetUserNode = () => {
  return _.values(JSON.parse(localStorage.getItem("UserPool")));
};

const GetCompanyNode = () => {
  return _.values(JSON.parse(localStorage.getItem("CompanyPool")));
};

export {
  BindItemNode,
  BindProductNode,
  BindMaterialNode,
  BindToolNode,
  BindPartNode,
  BindProcessNode,
  BindUserNode,
  BindCompanyNode,
  GetBomNode,
  GetItemNode,
  GetProductNode,
  GetMaterialNode,
  GetToolNode,
  GetPartNode,
  GetProcessNode,
  GetUserNode,
  GetCompanyNode,
};
