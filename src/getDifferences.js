import parser from './parser.js';
import compare from './stylish.js';


export default function getDifferences(filepath1, filepath2, format = 'stylish') {
  const contentOfFile1 = parser(filepath1);
  const contentOfFile2 = parser(filepath2);


  return  compare(contentOfFile1, contentOfFile2)
}