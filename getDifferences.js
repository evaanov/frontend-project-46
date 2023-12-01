import fs from 'fs';

export default function getDifferences(filepath1, filepath2) {
  const contentOfFile1 = JSON.parse(fs.readFileSync(filepath1));
  const contentOfFile2 = JSON.parse(fs.readFileSync(filepath2));

  let resultString = '';

  Object.keys(contentOfFile1).map((key) => { 
    if (contentOfFile1[key] === contentOfFile2[key]) { 
      resultString += `    ${key}: ${contentOfFile1[key]}\n`;
    } else if (contentOfFile2[key] === undefined) { 
      resultString += `  - ${key}: ${contentOfFile1[key]}\n`;
    } else if (contentOfFile1[key] !== contentOfFile2[key]) {
      resultString += `  - ${key}: ${contentOfFile1[key]}\n`;
      resultString += `  + ${key}: ${contentOfFile2[key]}\n`;
    }
  })

  Object.keys(contentOfFile2).map((key) => { 
    if (contentOfFile1[key] === undefined) { 
      resultString += `  + ${key}: ${contentOfFile2[key]}\n`;
    }
  })

  return `{\n${resultString}}`;
}