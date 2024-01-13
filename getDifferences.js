import parser from './src/parser.js';
import _ from 'lodash';


function compare(contentOfFile1, contentOfFile2, iterator = 1){ 
  let resultString = '';
  let i = iterator + 1;

  const keys1 = Object.keys(contentOfFile1).flat(Infinity);
  console.log(keys1)
  const keys2 = Object.keys(contentOfFile2).flat(Infinity);
  const keys = _.union(keys1, keys2)
  console.log(keys)
  
  keys.map((key) => { 
    if (contentOfFile1[key] instanceof Object) {
      if (key in contentOfFile1 && key in contentOfFile2) { 
        resultString += `${'  '.repeat(i - 1)}  ${key}: ${compare(contentOfFile1[key], contentOfFile2[key], )}\n`
      } else if (key in contentOfFile1 && !(key in contentOfFile2)) { 
        resultString += `${'  '.repeat(i - 1)}- ${key}: ${compare(contentOfFile1[key], {})}\n`
      }
      else if (!(key in contentOfFile1) && key in contentOfFile2) { 
        resultString += `${'  '.repeat(i - 1)}+ ${key}: ${compare({}, contentOfFile2[key])}\n`
      } else if (JSON.stringify(contentOfFile1[key]) !== JSON.stringify(contentOfFile2[key])) {
        resultString += `${'  '.repeat(i - 1)}- ${key}: ${compare(contentOfFile1[key], contentOfFile2[key])}\n`
        resultString += `${'  '.repeat(i - 1)}+ ${key}: ${compare(contentOfFile1[key], contentOfFile2[key])}\n`
      }
    } else {
      if (contentOfFile1[key] === contentOfFile2[key]) { 
        resultString += `${'  '.repeat(i)}  ${key}: ${contentOfFile1[key]}\n`;
      } else if (contentOfFile2[key] === undefined) { 
        resultString += `${'  '.repeat(i)}- ${key}: ${contentOfFile1[key]}\n`;
      } else if (contentOfFile1[key] === undefined) { 
        resultString += `${'  '.repeat(i)}+ ${key}: ${contentOfFile2[key]}\n`;
      } else if (contentOfFile1[key] !== contentOfFile2[key]) {
        resultString += `${'  '.repeat(i)}- ${key}: ${contentOfFile1[key]}\n`;
        resultString += `${'  '.repeat(i)}+ ${key}: ${contentOfFile2[key]}\n`;
      }
    }
  })

  

  return `{\n${resultString}${'  '.repeat(i - 1)}}`
}

export default function getDifferences(filepath1, filepath2) {
  const contentOfFile1 = parser(filepath1);
  const contentOfFile2 = parser(filepath2);


  return  compare(contentOfFile1, contentOfFile2)
}