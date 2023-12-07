import path from 'path';
import { readFileSync } from 'fs';

const getFileExtension = (filePath) => path.extname(filePath).toLowerCase();

const readFileContent = (filePath) => {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
  return readFileSync(absolutePath, 'utf-8');
};

export {
  getFileExtension,
  readFileContent,
};
