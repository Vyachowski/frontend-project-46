import jest from 'jest-mock';
import parseFileToObject from '../src/parser.js';
import compareObjects, { getChangeType } from '../src/comparator.js';
import formatDiff from '../src/formatter/index.js';
import stylishFormatter from '../src/formatter/formats/stylishFormatter.js';
import {
  filePlain1,
  filePlain2,
  fileNested1,
  fileNested2,
  difference,
  stylishFormattedDifference,
  plainFormattedDifference,
} from '../__fixtures__/testData.js';

// Parser tests
test('Parser: existing file, plain – yml, yaml, json', () => {
  expect(parseFileToObject('__fixtures__/file1-plain.yml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.yaml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yaml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.json')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.json')).toStrictEqual(filePlain2);
});

test('Parser: non-existing file, plain – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence-plain.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence-plain.json');
  }).toThrow('ENOENT: no such file or directory');
});

test('Parser: existing file, nested – yml, yaml, json', () => {
  expect(parseFileToObject('__fixtures__/file1.yml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.yaml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yaml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.json')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.json')).toStrictEqual(fileNested2);
});

test('Parser: existing file, plain – yml, yaml, json, absolute paths', () => {
  const absolutePathToFolder1 = `${process.cwd()}/__fixtures__/file1-plain.`;
  const absolutePathToFolder2 = `${process.cwd()}/__fixtures__/file2-plain.`;
  expect(parseFileToObject(`${absolutePathToFolder1}yml`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}yml`)).toStrictEqual(filePlain2);
  expect(parseFileToObject(`${absolutePathToFolder1}yaml`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}yaml`)).toStrictEqual(filePlain2);
  expect(parseFileToObject(`${absolutePathToFolder1}json`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}json`)).toStrictEqual(filePlain2);
});

test('Parser: non-existing file, nested – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence.json');
  }).toThrow('ENOENT: no such file or directory');
});

test('Parser: existing file, non-json/yaml format', () => {
  expect(() => {
    parseFileToObject('__fixtures__/sample.png');
  }).toThrow('Only yml/yaml/json formats are allowed. Please try again');
});

// Comparator tests
test('Comparator: Get status of key', () => {
  expect(getChangeType('value', 'value')).toStrictEqual('not changed');
  expect(getChangeType('value', 'value2')).toStrictEqual('updated');
  expect(getChangeType('value2', 'value')).toStrictEqual('updated');
  expect(getChangeType(undefined, 'value')).toStrictEqual('added');
  expect(getChangeType('undefined', undefined)).toStrictEqual('removed');
});

test('Comparator: Get difference of files', () => {
  expect(compareObjects(fileNested1, fileNested2)).toStrictEqual(difference);
});

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
