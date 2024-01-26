import comparePlain from './getDifferencesPlain.js';
import parser from './parser.js';
// import compare from './stylish.js';


export default function getDifferences(filepath1, filepath2) {
  const contentOfFile1 = parser(filepath1);
  const contentOfFile2 = parser(filepath2);


  return  comparePlain(contentOfFile1, contentOfFile2)
}