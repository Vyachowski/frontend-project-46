#!/usr/bin/env node
import { program } from 'commander';
import compareObjects from '../src/comparator.js';
import parseFileToObject from '../src/parser.js';
import formatDiff from '../src/formatter.js';

const genDiff = (filepath1, filepath2, flag = 'stylish') => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Logic here
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
  .option('-F, --format-type <formatType>', 'output format')
  .action((filepath1, filepath2, formatType) => {
    console.log(genDiff(filepath1, filepath2, formatType));
  })
  .parse();

export default genDiff;
