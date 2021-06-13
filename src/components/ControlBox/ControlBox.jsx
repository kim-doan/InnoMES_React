import { Button } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form"
import './ControlBox.scss'

const ControlBox = (props) => {

    return (
        <div>
            <div className="form-main">
                {props.mainRev !== undefined && (
                    <div className="button">
                        <Button
                            width={100}
                            height={35}
                            text="개정"
                            type="default"
                            stylingMode="contained"
                            onClick={props.mainRev}
                        />
                    </div>
                )}
                {props.mainMod !== undefined && (
                    <div className="button">
                        <Button
                            width={100}
                            height={35}
                            text="수정"
                            type="default"
                            stylingMode="contained"
                            onClick={props.mainMod}
                        />
                    </div>
                )}
                {props.mainRevLog !== undefined && (
                    <div className="button">
                        <Button
                            width={100}
                            height={35}
                            text="이력보기"
                            type="default"
                            stylingMode="contained"
                            onClick={props.mainRevLog}
                        />
                    </div>
                )}
                {props.mainReg !== undefined && (
                    <div className="button">
                        <Button
                            width={100}
                            height={35}
                            text="등록"
                            type="default"
                            stylingMode="contained"
                            onClick={props.mainReg}
                        />
                    </div>
                )}
            </div>
            <div className="form-main-2">
                {props.mainAdd !== undefined && (
                    <div className="button-left">
                        <Button
                            icon="add"
                            width={105}
                            height={35}
                            text="행추가"
                            type="default"
                            stylingMode="contained"
                            onClick={props.mainAdd}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ControlBox;