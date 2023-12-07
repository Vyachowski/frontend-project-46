import path from 'path';
import { readFileSync } from 'fs';

const getFileExtension = (filePath) => path.extname(filePath);

const readFileContent = (filePath) => {
  const absolutePath = filePath.startsWith('/') ? filePath : path.resolve(filePath);
  return readFileSync(absolutePath, 'utf-8');
};

export {
  getFileExtension,
  readFileContent,
};
