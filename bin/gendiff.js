#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import parseFileToObject from '../src/parser.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFileToObject(filepath1);
  const obj2 = parseFileToObject(filepath2);

  let diff = '{\n';
  const objKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedObjKeys = _.sortBy(objKeys);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedObjKeys) {
    if (!(key in obj2)) {
      diff += `  - ${key}: ${obj1[key]}\n`;
    }
    if (!(key in obj1)) {
      diff += `  + ${key}: ${obj2[key]}\n`;
    }
    if (key in obj1 && key in obj2) {
      diff += obj1[key] !== obj2[key]
        ? `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`
        : `    ${key}: ${obj1[key]}\n`;
    }
  }

  diff += '}';
  return diff;
};

console.log(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml'));
console.log(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml'));
console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json'));

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-F, --format-type', 'output format')
  .action(genDiff)
  .parse();

export default genDiff;
