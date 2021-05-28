import { ResponsiveBox } from "devextreme-react";
import { Col, Item, Location, Row } from "devextreme-react/responsive-box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import ControlBox from "../../../components/ControlBox/ControlBox";
import SearchPanel from "../../../components/SearchPanel/SearchPanel";
import BomGrid from "./components/BomGrid";
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
            <ControlBox></ControlBox>
            <ResponsiveBox>
                <Row></Row>
                <Row></Row>
                <Col></Col>
                <Col></Col>
                <Item>
                    <Location
                        row={0}
                        col={0}
                    >
                    </Location>
                    <ItemGrid></ItemGrid>
                </Item>
                <Item>
                    <Location
                        row={0}
                        col={1}
                    >
                    </Location>
                    <ResponsiveBox>
                        <Row></Row>
                        <Row></Row>
                        <Col></Col>

                        <Item>
                            <Location
                                row={0}
                                col={0}
                            >
                            </Location>
                            <RouteGrid></RouteGrid>
                        </Item>
                        <Item>
                            <Location
                                row={1}
                                col={0}
                            >
                            </Location>
                            <BomGrid></BomGrid>
                        </Item>
                    </ResponsiveBox>
                </Item>

            </ResponsiveBox>
        </div>
    )
}

export default MasterManufactureProcess