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
  const createDiffEntry = (key, originalValue, modifiedValue) => {
    const changeType = getChangeType(originalValue, modifiedValue);
    const entryValue = (changeType === 'added') ? modifiedValue : originalValue;

    return {
      changes: changeType,
      value: entryValue,
      ...(changeType === 'updated' && { updatedValue: modifiedValue }),
    };
  };

  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = sortBy(objsKeys);

  return sortedObjKeys.reduce((acc, key) => {
    if (isObject(originalObj[key]) && isObject(modifiedObj[key])) {
      return { ...acc, [key]: compareObjects(originalObj[key], modifiedObj[key]) };
    }

    return { ...acc, [key]: createDiffEntry(key, originalObj[key], modifiedObj[key]) };
  }, {});
}
