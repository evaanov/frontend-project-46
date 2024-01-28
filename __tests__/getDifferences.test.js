import { expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDifferences from '../src/getDifferences';


const getFixturePath = (filename) => path.join('..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(`${filename}.txt`), 'utf-8');

const json = readFile('json');
const plain = readFile('plain');
const stylish = readFile('stylish');

test('stylish', () => {
  const expectResultJSON = getDifferences('__fixtures__/file1.json', '__fixtures__/file2.json');
  const expectResultYML = getDifferences('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');
  expect(expectResultJSON).toEqual(stylish);
  expect(expectResultYML).toEqual(stylish);
});

test('plain', () => {
  const expectResultJSON = getDifferences('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
  const expectResultYML = getDifferences('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain');
  expect(expectResultJSON).toEqual(plain);
  expect(expectResultYML).toEqual(plain);
});

test('json', () => {
  const expectResultJSON = getDifferences('__fixtures__/file1.json', '__fixtures__/file2.json', 'json');
  const expectResultYML = getDifferences('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json');
  expect(expectResultJSON).toEqual(json);
  expect(expectResultYML).toEqual(json);
});