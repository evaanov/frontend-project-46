import path from "path";
import fs from 'fs';
import yaml from 'js-yaml'
import getFixturePath from "./getFixturePath.js";


export default function parser(filepath1) { 
    const extension = path.extname(filepath1);
    let contentOfFile;
    if (extension === '.json') {
        contentOfFile = JSON.parse(fs.readFileSync(getFixturePath(filepath1)));
    } else if (extension === '.yaml' || extension === '.yml') {
        contentOfFile = yaml.load(fs.readFileSync(getFixturePath(filepath1)));
    }

    return contentOfFile
}