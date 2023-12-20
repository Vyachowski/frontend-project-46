import _ from 'lodash';

export default function buildAST(originalObj, modifiedObj) {
  const objsKeys = _.union(Object.keys(originalObj), Object.keys(modifiedObj));
  return _.sortBy(objsKeys).map((key) => {
    const originalValue = originalObj[key];
    const modifiedValue = modifiedObj[key];
    const nodeTemplate = { key };

    if (!_.has(originalObj, key)) {
      return { ...nodeTemplate, type: 'added', modifiedValue };
    } if (!_.has(modifiedObj, key)) {
      return { ...nodeTemplate, type: 'removed', originalValue };
    } if (_.isObject(originalValue) && _.isObject(modifiedValue)) {
      return { ...nodeTemplate, type: 'nested', children: buildAST(originalValue, modifiedValue) };
    } if (originalValue !== modifiedValue) {
      return {
        ...nodeTemplate, type: 'updated', originalValue, modifiedValue,
      };
    }
    return { ...nodeTemplate, type: 'unchanged', originalValue };
  });
}
