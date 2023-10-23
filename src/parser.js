/* eslint-disable max-len */
import path from 'path';
import YAML from 'yaml';
import { readFileSync } from 'fs';

const parseFileToObject = (filePath) => {
  const allowedFormats = ['yml', 'yaml', 'json'];
  const fileExtension = filePath.split('.').pop().toLowerCase();
  if (allowedFormats.includes(fileExtension)) {
    const absolutePath = filePath[0] === '/' ? filePath : path.resolve(filePath);
    const fileContent = readFileSync(absolutePath, 'utf-8');
    return fileExtension === 'json' ? JSON.parse(fileContent) : YAML.parse(fileContent);
  }
  throw new Error('Only yml/yaml/json formats are allowed.');
};

export default parseFileToObject;
