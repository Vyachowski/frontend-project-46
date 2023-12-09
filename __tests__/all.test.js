import * as jest from 'jest-mock';
import parseFileToObject from '../src/parser.js';
import {
  absolutePath1,
  absolutePath2,
  fileContentRead,
  fileContentPlain1,
  fileContentNested1,
  fileContentNested2,
  astExample,
  plainFormattedDifference,
  stylishFormattedDifference,
} from '../__fixtures__/testData.js';
import { getFileExtension, readFileContent } from '../src/utils.js';
import buildAST from '../src/buildAST.js';
import formatDiff from '../src/formatter/index.js';

// Utilities test
test('File extension checker: existing file – yml, json', () => {
  expect(getFileExtension(`${absolutePath1}-plain.yml`)).toStrictEqual('.yml');
  expect(getFileExtension(`${absolutePath2}-plain.json`)).toStrictEqual('.json');
});

test('File reader: existing/non-existing file', () => {
  expect(readFileContent(`${absolutePath1}-plain.json`)).toStrictEqual(fileContentRead);
  expect(() => {
    readFileContent('__fixtures__/nonexistence-plain.yml');
  }).toThrow('ENOENT: no such file or directory');
});

// Parser tests
test('Parser: existing file, correct/non-json/yaml format', () => {
  const fileContent = readFileContent('__fixtures__/file1.yml');
  expect(() => {
    parseFileToObject(fileContentRead, '.jpeg');
  }).toThrow('Only yml/yaml/json formats are allowed. Please try again');
  expect(parseFileToObject(fileContentRead, '.json')).toStrictEqual(fileContentPlain1);
  expect(parseFileToObject(fileContent, '.yml')).toStrictEqual(fileContentNested1);
});

// AST Builder test
test('AST builder: Nested files', () => {
  expect(buildAST(fileContentNested1, fileContentNested2)).toStrictEqual(astExample);
});

// Formatter tests
test('Formatter: Formatter with plain format', () => {
  // eslint-disable-next-line
  console.log = jest.fn();
  console.log(formatDiff(astExample, 'plain'));
  expect(console.log).toHaveBeenCalledWith(plainFormattedDifference);
  console.log(formatDiff(astExample, 'stylish'));
  expect(console.log).toHaveBeenCalledWith(stylishFormattedDifference);
});
