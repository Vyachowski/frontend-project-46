#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import parseFileToObject from '../src/parser.js';

const genDiff = (filepath1, filepath2) => {
  // Parsing
  const obj1 = parseFileToObject(filepath1);
  const obj2 = parseFileToObject(filepath2);

  // Logic here
  // eslint-disable-next-line no-use-before-define
  const result = getObjectDiff(obj1, obj2);

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

function getObjectDiff(obj1, obj2) {
  const objKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedObjKeys = _.sortBy(objKeys);

  const diffLines = sortedObjKeys.map((key) => {
    if (!(key in obj2)) {
      return `  - ${key}: ${obj1[key]}`; // deleted
    }
    if (!(key in obj1)) {
      return `  + ${key}: ${obj2[key]}`; // added
    }
    return obj1[key] !== obj2[key]
      ? `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}` // modified
      : `    ${key}: ${obj1[key]}`; // not changed
  });

  const diffContent = diffLines.join('\n');
  return `{\n${diffContent}\n}`;
}
