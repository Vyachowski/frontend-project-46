#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import parseFileToObject from '../src/parser.js';
import formatDiff from '../src/formatter.js';

const genDiff = (filepath1, filepath2, flag = 'stylish') => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Logic here
  // eslint-disable-next-line no-use-before-define
  const difference = compareObjects(originalObj, modifiedObj);

  // Formatting content
  return formatDiff(originalObj, modifiedObj, difference, flag);
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

  const arrayStructuredResult = sortedObjKeys.map((key) => {
    if (_.isObject(originalObj[key]) && _.isObject(modifiedObj[key])) {
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

  // eslint-disable-next-line no-use-before-define
  return convertArrayToObject(arrayStructuredResult);
}

function convertArrayToObject(arr) {
  return _.reduce(
    arr,
    (acc, [key, value]) => {
      if (_.isArray(value)) {
        acc[key] = convertArrayToObject(value);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
}
