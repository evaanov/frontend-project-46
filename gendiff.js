#!/usr/bin/env node
import { program } from 'commander';
import getDifferences from './getDifferences.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath12) => {
    console.log(getDifferences(filepath1, filepath12))
  })

program.parse();