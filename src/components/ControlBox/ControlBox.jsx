import { Button } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form"
import './ControlBox.scss'

const ControlBox = (props) => {
    const colCountByScreen = {
        sm: 2,
        md: 3,
        lg: 15,
    };

    function screenByWidth(width) {
        if (width < 1660 && width >= 1010) return "md";
        else if (width < 1010) return "sm";
        else return "lg";
    }

    return (
        <div className="form-main">
            <div className="button">
                <Button
                    width={100}
                    height={40}
                    text="이력보기"
                    type="success"
                    stylingMode="contained"
                />
            </div>
            <div className="button">
                <Button
                    width={100}
                    height={40}
                    text="등록"
                    type="success"
                    stylingMode="contained"
                />
            </div>
            <div className="button">
                <Button
                    width={100}
                    height={40}
                    text="수정"
                    type="success"
                    stylingMode="contained"
                />
            </div>
        </div>
    )
}

export default ControlBox;