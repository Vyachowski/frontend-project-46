#!/usr/bin/env node
import { program } from 'commander';
import genDiff from './gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the source file')
  .argument('<filepath2>', 'path to the comparing file')
  .option('-F, --format <formatName>', 'output format (default: "stylish")', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    console.log(genDiff(filepath1, filepath2, format));
  })
  .parse(process.argv);
