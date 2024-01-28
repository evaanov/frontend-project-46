import _ from 'lodash';

export default function compareJson(contentOfFile1, contentOfFile2) {
  let resultString = '';

  const keys1 = Object.keys(contentOfFile1);
  const keys2 = Object.keys(contentOfFile2);
  const keys = _.union(keys1, keys2);

  keys.sort().forEach((key) => {
    if (key in contentOfFile1 && key in contentOfFile2) {
      if (contentOfFile1[key] instanceof Object && contentOfFile2[key] instanceof Object) {
        resultString += `{"key":"${key}","type":"nested","children":${compareJson(contentOfFile1[key], contentOfFile2[key])}}`;
      } else if (contentOfFile1[key] instanceof Object && !(contentOfFile2[key] instanceof Object)) {
        resultString += `{"key":"${key}","type":"changed","value1":${JSON.stringify(contentOfFile1[key])},"value2":"${contentOfFile2[key]}"}`;
      } else if (!(contentOfFile1[key] instanceof Object) && contentOfFile2[key] instanceof Object) {
        resultString += `{"key":"${key}", type":"changed","value1":"${contentOfFile2[key]}","value2":${JSON.stringify(contentOfFile1[key])}}`;
      } else if (!(contentOfFile1[key] instanceof Object) && !(contentOfFile2[key] instanceof Object)) {
        if (contentOfFile1[key] === contentOfFile2[key]) {
          resultString += `{"key":"${key}","type":"unchanged","value":"${contentOfFile1[key]}"}`
        } else {
          resultString += `{"key":"${key}","type":"changed","value1":"${contentOfFile1[key]}","value2":"${contentOfFile2[key]}"}`;
        }
      }
    } else if (key in contentOfFile1 && !(key in contentOfFile2)) {
      if (contentOfFile1[key] instanceof Object) {
        resultString += `{"key":"${key}","type":"removed","value":${JSON.stringify(contentOfFile1[key])}}`;
      } else {
        resultString += `{"key":"${key}","type":"removed","value":"${contentOfFile1[key]}"}`;
      }
    } else if (!(key in contentOfFile1) && key in contentOfFile2) {
      if (contentOfFile2[key] instanceof Object) {
        resultString += `{"key":"${key}","type":"added","value":${JSON.stringify(contentOfFile2[key])}}`;
      } else {
        resultString += `{"key":"${key}","type":"added","value":"${contentOfFile2[key]}"}`;
      }
    }

    if (keys.indexOf(key) !== keys.length - 1) {
      resultString += ',';
    }
  });

  return `[${resultString}]`;
}