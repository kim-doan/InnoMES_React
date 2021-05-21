import { Card } from "@material-ui/core";
import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { useDispatch, useSelector } from "react-redux"
import { masterManufactureSelector } from "../slice";


const RouteGrid = () => {
    const dispatch = useDispatch();
    const { routeList } = useSelector(masterManufactureSelector.all);

    return(
        <div style={{padding: 20, paddingTop: 5}}>
            <Card>
                <DataGrid
                    dataSource={routeList}
                    keyExpr="procSeq"
                    selection={{ mode: 'single' }}
                    columnAutoWidth={true}
                    rowAlternationEnabled={true}
                    showColumnLines={true}
                    loadPanel={{
                        showIndicator: true,
                        enabled: true,
                    }}
                >
                    <Column dataField="procCode" caption="공정코드" fixed={true}></Column>
                    <Column dataField="procName" caption="공정명" fixed={true}></Column>
                    <Column dataField="inOutType" caption="내외작" fixed={true}></Column>
                </DataGrid>
            </Card>
        </div>
    )
}

export default RouteGrid;