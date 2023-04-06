#!/usr/bin/env node
import { program } from 'commander';

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program.parse();
