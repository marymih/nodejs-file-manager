import { createReadStream } from 'fs';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function readFile(filePath) {
  const { currentDirectory } = getState();
  const absolutePath = path.resolve(currentDirectory, filePath);

  const stream = createReadStream(absolutePath, { encoding: 'utf-8' });

  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on('end', () => {
    showCurrentDirectory();
  });

  stream.on('error', () => {
    console.log('Operation failed');
  });
}

export { readFile };
