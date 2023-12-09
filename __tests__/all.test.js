import parseFileToObject from '../src/parser.js';
import {
  absolutePath1,
  absolutePath2,
  fileContentRead,
  fileContentPlain1,
  fileContentNested1,
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
