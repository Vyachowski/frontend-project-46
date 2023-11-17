#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import parseFileToObject from '../src/parser.js';

const genDiff = (filepath1, filepath2) => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Logic here
  // eslint-disable-next-line no-use-before-define
  const result = getObjectDiff(originalObj, modifiedObj);

  // Formatting content
  return result;
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the source file')
  .argument('<filepath2>', 'path to the comparing file')
  .option('-F, --format-type <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .parse();

export default genDiff;

function compareObjects(originalObj, modifiedObj) {
  const objsKeys = _.union(Object.keys(originalObj), Object.keys(modifiedObj));
  const sortedObjKeys = _.sortBy(objsKeys);

  // eslint-disable-next-line array-callback-return
  const diff = sortedObjKeys.map((key) => {
    if (!_.isObject(key)) {
      if (!(key in modifiedObj)) {
        return [key, 'deleted']; // deleted
      }
      if (!(key in originalObj)) {
        return [key, 'added']; // added
      }
      return originalObj[key] !== modifiedObj[key]
        ? [key, 'modified'] // modified
        : [key, 'not changed']; // not changed
    }
  });
  return diff;

  // const diffLines = sortedObjKeys.map((key) => {
  //   if (!(key in modifiedObj)) {
  //     return `  - ${key}: ${originalObj[key]}`; // deleted
  //   }
  //   if (!(key in originalObj)) {
  //     return `  + ${key}: ${modifiedObj[key]}`; // added
  //   }
  //   return originalObj[key] !== modifiedObj[key]
  //     ? `  - ${key}: ${originalObj[key]}\n  + ${key}: ${modifiedObj[key]}` // modified
  //     : `    ${key}: ${originalObj[key]}`; // not changed
  // });
  //
  // const diffContent = diffLines.join('\n');
  // return `{\n${diffContent}\n}`;
}
