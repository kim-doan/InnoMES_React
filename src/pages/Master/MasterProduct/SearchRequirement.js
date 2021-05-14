const data = [
  {
    title: "제품코드",
    componentType: '',
    bindType: 'none',
    bindTypePCode: '',
    fieldName: 'itemCode'
  },
  {
    title: "제품명",
    componentType: '',
    bindType: 'none',
    bindTypePCode: '',
    fieldName: 'itemName'
  },
  {
    title: '제품카테고리',
    componentType: 'lookUp',
    bindType: 'CommonCode',
    bindTypePCode: 'CTG001',
    fieldName: 'prdtCtg'
  },
  {
    title: '제품그룹',
    componentType: 'lookUp',
    bindType: 'CommonCode',
    bindTypePCode: 'GRP001',
    fieldName: 'prdtGroup'
  }
];

export default {
  getData() {
    return data;
  }
}