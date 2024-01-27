#!/usr/bin/env node
import { program } from 'commander';
import getDifferences from './src/getDifferences.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2> ')
  .action((filepath1, filepath12) => {
    const result = getDifferences(filepath1, filepath12)
    console.log(result)
  })

program.parse();