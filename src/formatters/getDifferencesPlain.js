import _ from 'lodash';

export default function comparePlain(contentOfFile1, contentOfFile2, parentLine = '') {
  let resultString = '';

  const keys1 = Object.keys(contentOfFile1);
  const keys2 = Object.keys(contentOfFile2);
  const keys = _.union(keys1, keys2);
  
  keys.sort().map((key) => {
    const currentParentLine = parentLine ? `${parentLine}.${key}` : key;

    if (key in contentOfFile1 && key in contentOfFile2) {
      if (contentOfFile1[key] instanceof Object && contentOfFile2[key] instanceof Object) {
        resultString += comparePlain(contentOfFile1[key], contentOfFile2[key], currentParentLine);
      } else if (contentOfFile1[key] instanceof Object && !(contentOfFile2[key] instanceof Object)) {
        resultString += `Property '${currentParentLine}' was updated. From [complex value] to '${contentOfFile2[key]}'\n`;
      } else if (!(contentOfFile1[key] instanceof Object) && contentOfFile2[key] instanceof Object) {
        resultString += `Property '${currentParentLine}' was updated. From '${contentOfFile1[key]}' to [complex value]\n`;
      } else if (!(contentOfFile1[key] instanceof Object) && !(contentOfFile2[key] instanceof Object)) {
        if (contentOfFile1[key] === contentOfFile2[key]) {
          resultString += '';
        } else {
          resultString += `Property '${currentParentLine}' was updated. From '${contentOfFile1[key]}' to '${contentOfFile2[key]}'\n`;
        }
      }
    } else if (key in contentOfFile1 && !(key in contentOfFile2)) {
      resultString += `Property '${currentParentLine}' was removed\n`;
    } else if (!(key in contentOfFile1) && key in contentOfFile2) {
      const valueString = contentOfFile2[key] instanceof Object ? `[complex value]`: `'${contentOfFile2[key]}'`;
      resultString += `Property '${currentParentLine}' was added with value: ${valueString}\n`;
    }
  });

  return resultString;
}