import React from "react";
import DataGrid, {
  Column,
    FilterRow,
  Paging,
  Scrolling,
  Selection
} from "devextreme-react/data-grid";
import DropDownBox from "devextreme-react/drop-down-box";

const dropDownOptions = { width: 500 };

export default class SearchLookUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.data.value
    };
    this.dropDownBoxRef = React.createRef();
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.productRender = this.productRender.bind(this);
    this.processRender = this.processRender.bind(this);
    this.bomRender = this.bomRender.bind(this);
  }

  //제품
  productRender() {
    return (
      <DataGrid
          dataSource={this.props.data.column.lookup.dataSource}
          remoteOperations={true}
          keyExpr="itemId"
          height={250}
          selectedRowKeys={[this.state.currentValue]}
          hoverStateEnabled={true}
          onSelectionChanged={this.onSelectionChanged}
          focusedRowEnabled={true}
          defaultFocusedRowKey={this.state.currentValue}
      >
          <FilterRow visible={true}></FilterRow>
          <Column dataField="itemCode" caption="제품코드"/>
          <Column dataField="itemName" caption="제품명"/>
          <Paging enabled={true} defaultPageSize={10} />
          <Scrolling mode="virtual" />
          <Selection mode="single" />
      </DataGrid>
    )
  }

  //공정
  processRender() {
    return (
      <DataGrid
        dataSource={this.props.data.column.lookup.dataSource}
        remoteOperations={true}
        keyExpr="procCode"
        height={250}
        selectedRowKeys={[this.state.currentValue]}
        hoverStateEnabled={true}
        onSelectionChanged={this.onSelectionChanged}
        focusedRowEnabled={true}
        defaultFocusedRowKey={this.state.currentValue}
      >
        <FilterRow visible={true}></FilterRow>
        <Column dataField="procCode" caption="공정코드"/>
        <Column dataField="procName" caption="공정명"/>
        <Paging enabled={true} defaultPageSize={10} />
        <Scrolling mode="virtual" />
        <Selection mode="single" />
      </DataGrid>
    );
  }

  //투입소재 (반제품 + 원자재)
  bomRender() {
    return (
      <DataGrid
          dataSource={this.props.data.column.lookup.dataSource}
          remoteOperations={true}
          keyExpr="itemId"
          height={250}
          selectedRowKeys={[this.state.currentValue]}
          hoverStateEnabled={true}
          onSelectionChanged={this.onSelectionChanged}
          focusedRowEnabled={true}
          defaultFocusedRowKey={this.state.currentValue}
      >
          <FilterRow visible={true}></FilterRow>
          <Column dataField="itemCode" caption="소재코드"/>
          <Column dataField="itemName" caption="소재명"/>
          <Column dataField="itemType" caption="유형">
            
          </Column>
          <Paging enabled={true} defaultPageSize={10} />
          <Scrolling mode="virtual" />
          <Selection mode="single" />
      </DataGrid>
    )
  }

  renderHandler() {
      switch(this.props.data.column.editCellType) {
          case "Process":
            return this.processRender;
          case "Product":
            return this.productRender;
          case "Bom":
            return this.bomRender;
      }
  }

  onSelectionChanged(selectionChangedArgs) {
    this.setState({ currentValue: selectionChangedArgs.selectedRowKeys[0] });
    this.props.data.setValue(this.state.currentValue);
    if (selectionChangedArgs.selectedRowKeys.length > 0) {
      this.dropDownBoxRef.current.instance.close();
    }
  }

  render() {
    return (
      <DropDownBox
        ref={this.dropDownBoxRef}
        dropDownOptions={dropDownOptions}
        dataSource={this.props.data.column.lookup.dataSource}
        value={this.state.currentValue}
        displayExpr={this.props.data.column.lookup.displayExpr}
        valueExpr={this.props.data.column.lookup.valueExpr}
        contentRender={this.renderHandler()}
      ></DropDownBox>
    );
  }
}
