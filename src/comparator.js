import isObject from 'lodash/isObject.js';
import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';

export function getChangeType(originalValue, modifiedValue) {
  if (originalValue === undefined) {
    return 'added';
  } if (modifiedValue === undefined) {
    return 'removed';
  } if (originalValue !== modifiedValue) {
    return 'updated';
  }
  return 'not changed';
}

export default function compareObjects(originalObj, modifiedObj) {
  const diff = {};

  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = sortBy(objsKeys);

  sortedObjKeys.forEach((key) => {
    if (isObject(originalObj[key]) && isObject(modifiedObj[key])) {
      diff[key] = compareObjects(originalObj[key], modifiedObj[key]);
    } else {
      const changeType = getChangeType(originalObj[key], modifiedObj[key]);
      diff[key] = {
        changes: changeType,
        value: originalObj[key],
      };
      if (changeType === 'added') {
        diff[key].value = modifiedObj[key];
      }
      if (changeType === 'updated') {
        diff[key].updatedValue = modifiedObj[key];
      }
    }
  });

  return diff;
}
