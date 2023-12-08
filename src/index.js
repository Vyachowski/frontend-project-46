#!/usr/bin/env node
import buildAST from './buildAST.js';
import parseFileToObject from './parser.js';
import formatDiff from './formatter/index.js';
import { getFileExtension, readFileContent } from './utils.js';

const genDiff = (filepath1, filepath2, formatName) => {
  // Parsing
  const fileFormat1 = getFileExtension(filepath1);
  const fileFormat2 = getFileExtension(filepath1);
  const fileContent1 = readFileContent(filepath1);
  const fileContent2 = readFileContent(filepath2);
  const originalObj = parseFileToObject(fileContent1, fileFormat1);
  const modifiedObj = parseFileToObject(fileContent2, fileFormat2);

  // Create difference object
  const difference = buildAST(originalObj, modifiedObj);

  // Formatting content
  return formatDiff(difference, formatName);
};

export default genDiff;
