import moment from 'moment';

const data = [
  {
    title: '발주일자',
    componentType: 'dateBetween',
    bindType: 'none',
    bindTypePCode: '',
    fieldName: 'orderStartDate',
    defaultValue : moment().format(),
    fieldName2: 'orderEndDate',
    defaultValue2 : moment().format()
  },
  {
    title: '납기일자',
    componentType: 'dateBetween',
    bindType: 'none',
    bindTypePCode: '',
    fieldName: 'dueStartDate',
    defaultValue : moment().format(),
    fieldName2: 'dueEndDate',
    defaultValue2 : moment().format()
  },
  {
    title: "발주번호",
    componentType: 'textField',
    bindType: 'none',
    bindTypePCode: '',
    fieldName: 'poNo'
  },
  {
    title: '발주자',
    componentType: 'lookUp',
    bindType: 'User',
    fieldName: 'orderUser'
  },
  {
    title: '거래처',
    componentType: 'lookUp',
    bindType: 'Company',
    fieldName: 'compId'
  }
]

export default {
  getData() {
    return data;
  }
}