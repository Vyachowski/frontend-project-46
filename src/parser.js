import path from 'path';
import YAML from 'yaml';
import { readFileSync } from 'fs';

const getAbsolutePath = (relativePath) => (relativePath[0] === '/' ? relativePath : path.resolve(relativePath));
const getFileExtension = (fileName) => (fileName.split('.').pop().toLowerCase()); // => 'yaml' || 'json'
const readFileContent = (filePath) => readFileSync(getAbsolutePath(filePath), 'utf-8');
const convertJsonToObject = (string) => JSON.parse(string);
const convertYamlToObject = (string) => YAML.parse(string);

const parseFileToObject = (filepath) => {
  const fileContent1 = readFileContent(getAbsolutePath(filepath));
  const obj = getFileExtension(filepath) === 'json' ? convertJsonToObject(fileContent1) : convertYamlToObject(fileContent1);
  return obj;
};

export default parseFileToObject;
