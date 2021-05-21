import { ResponsiveBox } from "devextreme-react";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import ItemGrid from "./components/ItemGrid";
import RouteGrid from "./components/RouteGrid";
import SearchRequirement from "./SearchRequirement";
import { masterManufactureAction, masterManufactureSelector } from "./slice";

const MasterManufactureProcess = () => {
    const dispatch = useDispatch();

    const { defaultParam } = useSelector(masterManufactureSelector.all);

    useEffect(() => {
        dispatch(masterManufactureAction.load());
    }, [defaultParam])

    const mainSearch = (searchParam) => {
        dispatch(
            masterManufactureAction.setDefaultParam({
                ...defaultParam,
                searchParam: searchParam,
            })
        );
    }

    return (
        <div>
            <SearchPanel
                mainSearch={mainSearch}
                list={SearchRequirement.getData()}
            >
            </SearchPanel>
            <ResponsiveBox>
                <Row ratio={1}></Row>
                <Row ratio={1}></Row>
                <Col ratio={1}></Col>
                <Col ratio={1}></Col>
                <Item>
                    <Location
                        row={0}
                        col={0}
                        // colspan={1}
                    >
                    </Location>
                    <ItemGrid></ItemGrid>
                </Item>
                <Item>
                    <Location
                        row={0}
                        col={1}
                        // colspan={1}
                    >
                    </Location>
                    <RouteGrid></RouteGrid>
                    <RouteGrid></RouteGrid>
                </Item>

            </ResponsiveBox>
        </div>
    )
}

export default MasterManufactureProcess