import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

export default function getFixturePath(filename) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.join(__dirname, '..', '__fixtures__', filename);
}