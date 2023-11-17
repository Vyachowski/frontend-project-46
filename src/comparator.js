import isObject from 'lodash/isObject.js';
import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';

export default function compareObjects(originalObj, modifiedObj) {
  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = sortBy(objsKeys);

  return sortedObjKeys.map((key) => {
    if (isObject(originalObj[key]) && isObject(modifiedObj[key])) {
      const nestedDiff = compareObjects(originalObj[key], modifiedObj[key]);
      return { key: nestedDiff };
    }

    if (!(key in modifiedObj)) {
      return {
        key,
        changes: 'deleted',
        value: originalObj[key],
      }; // deleted
    }

    if (!(key in originalObj)) {
      return {
        key,
        changes: 'added',
        value: modifiedObj[key],
      }; // added
    }

    return originalObj[key] !== modifiedObj[key]
      ? {
        key,
        changes: 'modified',
        value: originalObj[key],
        modifiedValue: modifiedObj[key],
      } // modified
      : {
        key,
        changes: 'not changed',
        value: modifiedObj[key],
      }; // not changed
  });
}