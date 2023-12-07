import jest from 'jest-mock';
import parseFileToObject from '../src/parser.js';
import { getChangeType } from '../src/comparator.js';
import formatDiff from '../src/formatter/index.js';
import stylishFormatter from '../src/formatter/formats/stylishFormatter.js';
import {
  absolutePath1,
  absolutePath2,
  fileContentRead,
  fileContentPlain1,
  fileContentNested1,
  difference,
  stylishFormattedDifference,
  plainFormattedDifference,
} from '../__fixtures__/testData.js';
import { getFileExtension, readFileContent } from '../src/utils.js';

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
  expect(() => {
    parseFileToObject(fileContentRead, '.jpeg');
  }).toThrow('Only yml/yaml/json formats are allowed. Please try again');
  expect(parseFileToObject(fileContentRead, '.json')).toStrictEqual(fileContentPlain1);
});

test('Parser: existing file, nested – yml, yaml, json', () => {
  const fileContent = readFileContent('__fixtures__/file1.yml');
  expect(parseFileToObject(fileContent, '.yml')).toStrictEqual(fileContentNested1);
});

// Comparator tests
test('Comparator: Get status of key', () => {
  expect(getChangeType('value', 'value')).toStrictEqual('not changed');
  expect(getChangeType('value', 'value2')).toStrictEqual('updated');
  expect(getChangeType('value2', 'value')).toStrictEqual('updated');
  expect(getChangeType(undefined, 'value')).toStrictEqual('added');
  expect(getChangeType('undefined', undefined)).toStrictEqual('removed');
});

// test('Comparator: Get difference of files', () => {
//   expect(compareObjects(fileNested1, fileNested2)).toStrictEqual(difference);
// });

// Formatter tests
test('Formatter: Stylish format separate', () => {
  expect(stylishFormatter(difference)).toStrictEqual(stylishFormattedDifference);
});

test('Formatter: Formatter with stylish format', () => {
  // eslint-disable-next-line
  console.log = jest.fn();
  console.log(formatDiff(difference, 'stylish'));
  expect(console.log).toHaveBeenCalledWith(stylishFormattedDifference);
});

test('Formatter: Formatter with plain format', () => {
  // eslint-disable-next-line
  console.log = jest.fn();
  console.log(formatDiff(difference, 'plain'));
  expect(console.log).toHaveBeenCalledWith(plainFormattedDifference);
});
