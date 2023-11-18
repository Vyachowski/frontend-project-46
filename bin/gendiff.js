#!/usr/bin/env node
import { program } from 'commander';
import compareObjects from '../src/comparator.js';
import parseFileToObject from '../src/parser.js';
import formatDiff from '../src/formatter.js';

const genDiff = (filepath1, filepath2, options) => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Logic here
  const difference = compareObjects(originalObj, modifiedObj);
  // return JSON.stringify(difference, null, 2);

  // Formatting content
  const format = options.formatType;
  return formatDiff(difference, format);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the source file')
  .argument('<filepath2>', 'path to the comparing file')
  .option('-F, --format-type <formatType>', 'output format', 'stylish')
  .action((filepath1, filepath2, formatType) => {
    genDiff(filepath1, filepath2, formatType);
  })
  .parse();

export default genDiff;
