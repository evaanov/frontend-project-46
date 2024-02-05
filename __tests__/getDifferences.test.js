import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import getDifferences from '../src/getDifferences';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(`${filename}.txt`), 'utf-8');

const json = readFile('json');
const plain = readFile('plain');
const stylish = readFile('stylish');

test('stylish', () => {
  const expectResultStylish = getDifferences('file1.json', 'file2.json');
  expect(expectResultStylish).toBe(stylish);
});

test('plain', () => {
  const expectResultPlain = getDifferences('file1.json', 'file2.json', 'plain');
  expect(expectResultPlain).toEqual(plain);
});

test('json', () => {
  const expectResultJSON = getDifferences('file1.json', 'file2.json', 'json');
  expect(expectResultJSON).toEqual(json);
});