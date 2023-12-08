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
    const nodeTemplate = { key };
    let node;

    if (!has(originalObj, key)) {
      node = { ...nodeTemplate, type: 'added', modifiedValue };
    } else if (!has(modifiedObj, key)) {
      node = { ...nodeTemplate, type: 'removed', originalValue };
    } else if (isObject(originalValue) && isObject(modifiedValue)) {
      node = { ...nodeTemplate, type: 'nested', children: buildAST(originalValue, modifiedValue) };
    } else if (originalValue !== modifiedValue) {
      node = {
        ...nodeTemplate, type: 'updated', originalValue, modifiedValue,
      };
    } else {
      node = { ...nodeTemplate, type: 'unchanged', originalValue };
    }

    return node;
  });
}
