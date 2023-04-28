#!/usr/bin/env node
import { program } from 'commander';

import { readFileSync } from 'fs';
import path from 'path';

const pathToAbsolute = (filePath) => (filePath[0] === '/' ? filePath : path.resolve(filePath));
const readJsonFile = (filePath) => {
  const absolutePath = pathToAbsolute(filePath);
  return JSON.parse(readFileSync(absolutePath, 'utf-8'));
};
const genDiff = (filepath1, filepath2) => {
  console.log(readJsonFile(filepath1), readJsonFile(filepath2));
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f', '--format-type <type>', 'output format')
  .action(genDiff)
  .parse();

// Temporary data
// const absolutePath1 = '/Users/vyachowski/Sites/Educational Projects/JavaScript/Hexlet/frontend-project-46/src/assets/file1.json';
// const relativePath1 = 'file1.json'; // PWD + / +  filename
// const relativePath2 = './file1.json'; // PWD + / - . + filename
// const rightRelativePath = 'src/assets/file1.json'; // PWD + / + filename
// const relativePath4 = '../examples/file1.json'; // PWD - last folder + PWD
// const relativePath5 = '../../src/assets/file1.json'; // PWD - two folders + PWD

// Functions

// console.log(pathToAbsolute(absolutePath1));
// console.log(pathToAbsolute(relativePath1));
// console.log(pathToAbsolute(relativePath2));
// console.log(pathToAbsolute(rightRelativePath));
// console.log(pathToAbsolute(relativePath4));
// console.log(pathToAbsolute(relativePath5));

// Export
export default genDiff;
