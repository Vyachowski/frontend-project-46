/* eslint-disable max-len */
import path from 'path';
import YAML from 'yaml';
import { readFileSync } from 'fs';

// const getAbsolutePath = (relativePath) => (relativePath[0] === '/' ? relativePath : path.resolve(relativePath));
// const getFileExtension = (fileName) => (fileName.split('.').pop().toLowerCase()); // => 'yaml' || 'json'
// const readFileContent = (filePath) => readFileSync(getAbsolutePath(filePath), 'utf-8');
// const convertJsonToObject = (string) => JSON.parse(string);
// const convertYamlToObject = (string) => YAML.parse(string);

const parseFileToObject = (filePath) => {
  const fileExtension = filePath.split('.').pop().toLowerCase();
  const absolutePath = filePath[0] === '/' ? filePath : path.resolve(filePath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  const obj = fileExtension === 'json' ? JSON.parse(fileContent) : YAML.parse(fileContent);
  return obj;
};

export default parseFileToObject;
