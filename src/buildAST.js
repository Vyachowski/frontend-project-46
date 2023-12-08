import isObject from 'lodash/isObject.js';
import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';

export default function buildAST(originalObj, modifiedObj) {
  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = sortBy(objsKeys);
  return sortedObjKeys.map((key) => {
    const originalValue = originalObj[key];
    const modifiedValue = modifiedObj[key];
    // unchanged, added, modified, nested, removed
    if (!has(originalObj, key)) {
      return {
        key,
        type: 'added',
        modifiedValue,
      };
    } if (!has(modifiedObj, key)) {
      return {
        key,
        type: 'removed',
        originalValue,
      };
    } if (isObject(originalValue) && isObject(modifiedValue)) {
      return {
        key,
        type: 'nested',
        children: buildAST(originalValue, modifiedValue),
      };
    } if (originalValue !== modifiedValue) {
      return {
        key,
        type: 'updated',
        originalValue,
        modifiedValue,
      };
    }
    return {
      key,
      type: 'unchanged',
      originalValue,
    };
  });
}
