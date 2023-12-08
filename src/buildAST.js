import isObject from 'lodash/isObject.js';
import union from 'lodash/union.js';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';

// export default function buildAST(originalObj, modifiedObj) {
//   const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
//   const sortedObjKeys = sortBy(objsKeys);
//   return sortedObjKeys.map((key) => {
//     const originalValue = originalObj[key];
//     const modifiedValue = modifiedObj[key];
//     if (!has(originalObj, key)) return { key, type: 'added', modifiedValue };
//     if (!has(modifiedObj, key)) return { key, type: 'removed', originalValue };
//     if (isObject(originalValue) && isObject(modifiedValue)) {
//       return { key, type: 'nested', children: buildAST(originalValue, modifiedValue) };
//     }
//     if (originalValue !== modifiedValue) {
//       return {
//         key, type: 'updated', originalValue, modifiedValue,
//       };
//     }
//     return {
//       key, type: 'unchanged', originalValue,
//     };
//   });
// }

// Alternative version
export default function buildAST(originalObj, modifiedObj) {
  const objsKeys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  return sortBy(objsKeys).map((key) => {
    const originalValue = originalObj[key];
    const modifiedValue = modifiedObj[key];
    const node = { key };
    let resultNode;

    if (!has(originalObj, key)) {
      resultNode = { ...node, type: 'added', modifiedValue };
    } else if (!has(modifiedObj, key)) {
      resultNode = { ...node, type: 'removed', originalValue };
    } else if (isObject(originalValue) && isObject(modifiedValue)) {
      resultNode = { ...node, type: 'nested', children: buildAST(originalValue, modifiedValue) };
    } else if (originalValue !== modifiedValue) {
      resultNode = {
        ...node, type: 'updated', originalValue, modifiedValue,
      };
    } else {
      resultNode = { ...node, type: 'unchanged', originalValue };
    }

    return resultNode;
  });
}
