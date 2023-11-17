import {
  isObject, isArray, union, sortBy, reduce,
} from 'lodash';

function convertArrayToObject(arr) {
  return reduce(
    arr,
    (acc, [key, value]) => {
      if (isArray(value)) {
        acc[key] = convertArrayToObject(value);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
}

export default function compareObjects(originalObj, modifiedObj) {
  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = sortBy(objsKeys);

  const arrayStructuredResult = sortedObjKeys.map((key) => {
    if (isObject(originalObj[key]) && isObject(modifiedObj[key])) {
      const nestedDiff = compareObjects(originalObj[key], modifiedObj[key]);
      return [key, nestedDiff];
    }

    if (!(key in modifiedObj)) {
      return [key, 'deleted']; // deleted
    }

    if (!(key in originalObj)) {
      return [key, 'added']; // added
    }

    return originalObj[key] !== modifiedObj[key]
      ? [key, 'modified'] // modified
      : [key, 'not changed']; // not changed
  });
  return convertArrayToObject(arrayStructuredResult);
}
