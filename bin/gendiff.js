#!/usr/bin/env node
import { program } from 'commander';
import compareObjects from '../src/comparator.js';
import parseFileToObject from '../src/parser.js';
import formatDiff from '../src/formatter/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Logic here
  const difference = compareObjects(originalObj, modifiedObj);

  // Formatting content
  return formatDiff(difference, formatName);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the source file')
  .argument('<filepath2>', 'path to the comparing file')
  .option('-F, --format-type <formatName>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    genDiff(filepath1, filepath2, options.formatName);
  })
  .parse();

export default genDiff;
