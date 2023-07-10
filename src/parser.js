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
  const allowedFormats = ['yml', 'yaml', 'json'];
  const fileExtension = filePath.split('.').pop().toLowerCase();
  if (allowedFormats.includes(fileExtension)) {
    const absolutePath = filePath[0] === '/' ? filePath : path.resolve(filePath);
    const fileContent = readFileSync(absolutePath, 'utf-8');
    const obj = fileExtension === 'json' ? JSON.parse(fileContent) : YAML.parse(fileContent);
    return obj;
  }
  throw new Error('Only yml/yaml/json formats are allowed.');
};

export default parseFileToObject;
