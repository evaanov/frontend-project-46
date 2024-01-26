import parser from './src/parser.js';
import _ from 'lodash';


function compare(contentOfFile1, contentOfFile2, iterator = 0){ 
  let resultString = '';
  let i = iterator + 2;

  const keys1 = Object.keys(contentOfFile1);
  const keys2 = Object.keys(contentOfFile2);
  const keys = _.union(keys1, keys2)
  console.log(keys1, keys2)
  
  keys.sort().map((key) => {
    if (key in contentOfFile1 && key in contentOfFile2) { 
      if (contentOfFile1[key] instanceof Object && contentOfFile2[key] instanceof Object) { 
        resultString += `${'  '.repeat(i)}  ${key}: ${compare(contentOfFile1[key], contentOfFile2[key], i)}\n`
      } else if (contentOfFile1[key] instanceof Object && !(contentOfFile2[key] instanceof Object)) { 
        resultString += `${'  '.repeat(i)}- ${key}: ${compare(contentOfFile1[key], {}, i)}\n`
        resultString += `${'  '.repeat(i)}+ ${key}: ${contentOfFile2[key]}\n`;
      } else if (!(contentOfFile1[key] instanceof Object) && contentOfFile2[key] instanceof Object) {
        resultString += `${'  '.repeat(i)}- ${key}: ${contentOfFile1[key]}\n`;
        resultString += `${'  '.repeat(i)}+ ${key}: ${compare(contentOfFile2[key], {}, i)}\n`
      } else if (!(contentOfFile1[key] instanceof Object) && !(contentOfFile2[key] instanceof Object)) { 
        if (contentOfFile1[key] === contentOfFile2[key]) { 
          resultString += `${'  '.repeat(i)}  ${key}: ${contentOfFile1[key]}\n`;
        } else { 
          resultString += `${'  '.repeat(i)}- ${key}: ${contentOfFile1[key]}\n`;
          resultString += `${'  '.repeat(i)}+ ${key}: ${contentOfFile2[key]}\n`;
        }
      }
    } else if (key in contentOfFile1 && !(key in contentOfFile2)) { 
      if (contentOfFile1[key] instanceof Object) { 
        resultString += `${'  '.repeat(i)}  ${key}: ${compare(contentOfFile1[key], {}, i)}\n`
      } else {
        resultString += `${'  '.repeat(i)}  ${key}: ${contentOfFile1[key]}\n`;
      }
    } else if (!(key in contentOfFile1) && key in contentOfFile2) { 
      if (contentOfFile2[key] instanceof Object) { 
        resultString += `${'  '.repeat(i)}+ ${key}: ${compare(contentOfFile2[key], {}, i)}\n`
      } else { 
        resultString += `${'  '.repeat(i)}+ ${key}: ${contentOfFile2[key]}\n`;
      }
    }
  })

  

  return `{\n${resultString}${'  '.repeat(i === 2 ? (i - 2) : (i - 1))}}`
}

export default function getDifferences(filepath1, filepath2) {
  const contentOfFile1 = parser(filepath1);
  const contentOfFile2 = parser(filepath2);


  return  compare(contentOfFile1, contentOfFile2)
}