import React, {useEffect, useState} from 'react'
import { SelectBox } from 'devextreme-react/select-box';
import './SearchPanel.scss'
import { Accordion, Button, TextBox } from 'devextreme-react';
import ResponsiveBox, { Item, Location, Row, Col } from 'devextreme-react/responsive-box';
import Form, { GroupItem, SimpleItem, ButtonItem, Label } from 'devextreme-react/form';
import { ConvertToLookUp } from '../../common/LookUp/lookUpUtils'

const SearchPanel = (props) => {
    const [searchParam, setSearchParam] = useState({})

    useEffect(() => {
    }, [])

    const selectBoxDisplay = (item) => {
        return item && item.codeKR
      }

    const changeItem = (item, fieldName) => {
        setSearchParam({
            ...searchParam,
             [fieldName] : item.value 
        })
    }
    
    const enterKeyPress = (param) => {
        if (param.key === 'Enter') {
          searchBtnClick()
        }
      }

    const searchBtnClick = () => {
        console.log(searchParam)
        props.mainSearch(searchParam)
    }

    const colCountByScreen = {
        sm: 2,
        md: 5
      }

    function screenByWidth(width) {
        return width < 720 ? 'sm' : 'md'
    }

    const AutoPanel = (panelList) => {
        return panelList.map(
            (column, index) => (<SimpleItem key={index}>
                <form onKeyPress={enterKeyPress}>
                {column.bindType === 'CommonCode' && column.componentType === 'lookUp' && (
                    <SelectBox
                        showTitle={true}
                        dataSource={ConvertToLookUp(column.bindType, column.bindTypePCode)}
                        displayExpr={selectBoxDisplay}
                        valueExpr="code"
                        searchEnabled={true}
                        value={searchParam[column.fieldName]}
                        placeholder={'검색어를 입력하십시오.'}
                        onValueChanged={(e) => changeItem(e, column.fieldName)}
                    >
                    </SelectBox>
                )}
                {column.bindType === 'none' && (
                    <TextBox 
                        placeholder={'검색어를 입력하십시오.'}
                        value={searchParam[column.fieldName]}
                        showClearButton={true} 
                        onValueChanged={(e) => changeItem(e, column.fieldName)}
                    />
                )}
                </form>
                <Label text={column.title}></Label>
            </SimpleItem>)
        )
    }

    return (
        <div id="form-main" className="paddings">
            <div className="widget-container ">
                <div id="form">
                    <div className="widget-container">
                        <Accordion collapsible={true} multiple={true} animationDuration={300}>
                            <Item>
                                <Form
                                    id="form"
                                    readOnly={false}
                                    showColonAfterLabel={true}
                                    labelLocation={'top'}
                                    colCountByScreen={colCountByScreen}
                                    screenByWidth={screenByWidth}
                                >
                                    {AutoPanel(props.list)}                                  
                                </Form>
                                <div className='search-btn'>
                                <Button 
                                        // icon="search"
                                        width={150}
                                        height={40}
                                        text="검색"
                                        type="success"
                                        stylingMode="contained"
                                        onClick={searchBtnClick}
                                />
                                </div>
                            </Item>
                        </Accordion>
                    </div>
                </div>
            </div>
      </div>
    )
}


export default SearchPanel