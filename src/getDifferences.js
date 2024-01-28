import parser from './parser.js';
import compare from './formatters/stylish.js';
import comparePlain from './formatters/getDifferencesPlain.js';
import compareJson from './formatters/getDifferencesJson.js';


export default function getDifferences(filepath1, filepath2, format = 'stylish') {
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