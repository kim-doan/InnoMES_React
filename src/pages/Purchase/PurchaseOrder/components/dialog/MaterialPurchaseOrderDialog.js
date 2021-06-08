import { Card } from '@material-ui/core';
import { ResponsiveBox } from 'devextreme-react';
import { Popup } from 'devextreme-react/data-grid';
import { Col, Item, Location, Row } from 'devextreme-react/responsive-box';
import React from 'react';

const MaterialPurchaseOrderDialog = () => {
  return (
    <div>
      <ResponsiveBox>
        <Row></Row>
        <Row></Row>
        <Col></Col>
        <Item>
          <Location row={0} col={0} />
          <Card>
            <div style={{ padding: 20, paddingTop: 5}}>

            </div>
          </Card>
        </Item>
      </ResponsiveBox>
    </div>
  )
};

export default MaterialPurchaseOrderDialog;