import parser from './parser.js';
import compare from './stylish.js';
import comparePlain from './getDifferencesPlain.js';
import compareJson from './getDifferencesJson.js';


export default function getDifferences(filepath1, filepath2, format = 'stylish') {
  console.log(format)
  const contentOfFile1 = parser(filepath1);
  const contentOfFile2 = parser(filepath2);

  if (format.toLowerCase() === 'stylish') { 
    return  compare(contentOfFile1, contentOfFile2)
  } else if (format.toLowerCase() === 'plain') { 
    return  comparePlain(contentOfFile1, contentOfFile2)
  } else if (format.toLowerCase() === 'json') {
    return compareJson(contentOfFile1, contentOfFile2);
  }
}