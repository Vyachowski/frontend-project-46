/* eslint-disable max-len */
import path from 'path';
import YAML from 'yaml';
import { readFileSync } from 'fs';

const parseFileToObject = (filePath) => {
  const allowedFormats = ['.yml', '.yaml', '.json'];
  const fileExtension = path.extname(filePath);
  if (allowedFormats.includes(fileExtension)) {
    const absolutePath = filePath.startsWith('/') ? filePath : path.resolve(filePath);
    const fileContent = readFileSync(absolutePath, 'utf-8');
    return fileExtension === '.json' ? JSON.parse(fileContent) : YAML.parse(fileContent);
  }
  throw new Error('Only yml/yaml/json formats are allowed. Please try again');
};
// Коммент чисто по фану
export default parseFileToObject;
