#!/usr/bin/env node
import { program } from 'commander';
import _ from 'lodash';
import parseFileToObject from '../src/parser.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFileToObject(filepath1);
  const obj2 = parseFileToObject(filepath2);

  const objKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedObjKeys = _.sortBy(objKeys);

  const diffLines = sortedObjKeys.map((key) => {
    if (!(key in obj2)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!(key in obj1)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    return obj1[key] !== obj2[key]
      ? `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
      : `    ${key}: ${obj1[key]}`;
  });

  const diffContent = diffLines.join('\n');
  const diff = `{\n${diffContent}\n}`;
  return diff;
};

console.log(genDiff('./__fixtures__/file1-recursive.json', './__fixtures__/file2-recursive.json'));

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
