#!/usr/bin/env node
import compareObjects from '../src/comparator.js';
import parseFileToObject from '../src/parser.js';
import formatDiff from '../src/formatter/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  // Parsing
  const originalObj = parseFileToObject(filepath1);
  const modifiedObj = parseFileToObject(filepath2);

  // Create difference object
  const difference = compareObjects(originalObj, modifiedObj);

  // Formatting content
  return formatDiff(difference, formatName);
};

export default genDiff;
