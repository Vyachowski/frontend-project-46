import isObject from 'lodash/isObject.js';
import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';

export default function buildAST(originalObj, modifiedObj) {
  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  return sortBy(objsKeys).map((key) => {
    const originalValue = originalObj[key];
    const modifiedValue = modifiedObj[key];
    const nodeTemplate = { key };

    if (!has(originalObj, key)) {
      return { ...nodeTemplate, type: 'added', modifiedValue };
    } if (!has(modifiedObj, key)) {
      return { ...nodeTemplate, type: 'removed', originalValue };
    } if (isObject(originalValue) && isObject(modifiedValue)) {
      return { ...nodeTemplate, type: 'nested', children: buildAST(originalValue, modifiedValue) };
    } if (originalValue !== modifiedValue) {
      return {
        ...nodeTemplate, type: 'updated', originalValue, modifiedValue,
      };
    }
    return { ...nodeTemplate, type: 'unchanged', originalValue };
  });
}
