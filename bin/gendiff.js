#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import YAML from 'yaml';

const getAbsolutePath = (relativePath) => (relativePath[0] === '/' ? relativePath : path.resolve(relativePath));
const getFileExtension = (fileName) => (fileName.split('.').pop().toLowerCase()); // => 'yaml' || 'json'
const readFileContent = (filePath) => readFileSync(getAbsolutePath(filePath), 'utf-8');
const convertJsonToObject = (string) => JSON.parse(string);
const convertYamlToObject = (string) => YAML.parse(string);

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = readFileContent(getAbsolutePath(filepath1));
  const fileContent2 = readFileContent(getAbsolutePath(filepath2));
  const obj1 = getFileExtension(filepath1) === 'json' ? convertJsonToObject(fileContent1) : convertYamlToObject(fileContent1);
  const obj2 = getFileExtension(filepath1) === 'json' ? convertJsonToObject(fileContent2) : convertYamlToObject(fileContent2);

  let diff = '{\n';
  const objKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedObjKeys = _.sortBy(objKeys);

  // eslint-disable-next-line no-restricted-syntax
  for (const key of sortedObjKeys) {
    if (!(key in obj2)) {
      diff += `  - ${key}: ${obj1[key]}\n`;
    }
    if (!(key in obj1)) {
      diff += `  + ${key}: ${obj2[key]}\n`;
    }
    if (key in obj1 && key in obj2) {
      diff += obj1[key] !== obj2[key]
        ? `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`
        : `    ${key}: ${obj1[key]}\n`;
    }
  }

  diff += '}';
  return diff;
};

console.log(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml'));

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
