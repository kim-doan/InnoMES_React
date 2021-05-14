const data = [{
    'title' : '제품카테고리',
    'bindType' : 'CommonCode',
    'bindTypePCode' : 'CTG001',
    'fieldName' : 'prdtCtg'
  }
  , {
    'title' : '제품그룹',
    'bindType' : 'CommonCode',
    'bindTypePCode' : 'GRP001',
    'fieldName' : 'prdtGroup'
  }, {
    'title' : '자재카테고리',
    'bindType' : 'CommonCode',
    'bindTypePCode' : 'CTG002',
    'fieldName' : 'matCtg'
  }
];

  export default {
      getData() {
          return data;
      }
  }