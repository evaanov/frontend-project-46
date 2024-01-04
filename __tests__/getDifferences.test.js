import { test, expect } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../getDifferences.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => { path.join(__dirname, '..', '__fixtures__', filename); };
const getContentFile = (fixturePath) => fs.readFileSync(getFixturePath(fixturePath), 'UTF-8');

test('gendiff file1.json and file2.json', () => {
  const firstPath = getContentFile('file1.json');
  const secondPath = getContentFile('file2.json');
  const expectedDifferences = gendiff(firstPath, secondPath);
  expect(gendiff('file1.json', 'file2.json')).toEqual(expectedDifferences);
});

test('gendiff file1.yaml and file2.yaml', () => {
  const firstPath = getContentFile('file1.yaml');
  const secondPath = getContentFile('file2.yaml');
  const expectedDifferences = gendiff(firstPath, secondPath);
  expect(gendiff('file1.yaml', 'file2.yaml')).toEqual(expectedDifferences);
});