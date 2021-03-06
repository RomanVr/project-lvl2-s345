import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const keys = _.union(_.keys(beforeObj), _.keys(afterObj));
  const reducer = (acc, key) => {
    if (_.has(beforeObj, key) && !_.has(afterObj, key)) {
      return [...acc, { nameProperty: key, typeProperty: 'deleted', oldValue: beforeObj[key] }];
    }
    if (!_.has(beforeObj, key) && _.has(afterObj, key)) {
      return [...acc, { nameProperty: key, typeProperty: 'added', newValue: afterObj[key] }];
    }
    if (_.isPlainObject(beforeObj[key]) && _.isPlainObject(afterObj[key])) {
      return [...acc, {
        nameProperty: key, typeProperty: 'nested', children: getAstDiff(beforeObj[key], afterObj[key]),
      }];
    }
    if (beforeObj[key] === afterObj[key]) {
      return [...acc, { nameProperty: key, typeProperty: 'unchanged', value: beforeObj[key] }];
    }
    return [...acc, {
      nameProperty: key, typeProperty: 'changed', oldValue: beforeObj[key], newValue: afterObj[key],
    }];
  };
  return keys.reduce(reducer, []);
};

export default getAstDiff;
