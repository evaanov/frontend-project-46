import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parser.js';
import getDifferences from '../src/getDifferences.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => { path.join(__dirname, '..', '__fixtures__', filename); };

test('gendiff file1.json and file2.json', () => {
  const contentOfFile1 = parser(getFixturePath('file1.json'));
  const contentOfFile2 = parser(getFixturePath('file2.json'));
  const expectedDifferences = getDifferences(contentOfFile1, contentOfFile2);
  expect(('file1.json', 'file2.json')).toEqual(expectedDifferences);
});

test('gendiff file1.yaml and file2.yaml', () => {
  const contentOfFile1 = parser('file1.yaml');
  const contentOfFile2 = parser('file2.yaml');
  const expectedDifferences = getDifferences(contentOfFile1, contentOfFile2);
  expect(getDifferences('file1.json', 'file2.json')).toEqual(expectedDifferences);
});