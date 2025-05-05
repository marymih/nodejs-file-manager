import fs from 'fs';
import { access } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function copyFile(source, destination) {
  try {
    const { currentDirectory } = getState();
    const sourcePath = path.resolve(currentDirectory, source);
    const destinationPath = path.resolve(currentDirectory, destination);
    const fileName = path.basename(sourcePath);
    const filePath = path.join(destinationPath, fileName);

    await access(sourcePath, fs.constants.F_OK);
    await access(destinationPath, fs.constants.F_OK);

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(filePath);

    readStream.pipe(writeStream);
    readStream.on('end', showCurrentDirectory);
    readStream.on('error', () => {
      console.log('Operation failed');
    });
    writeStream.on('error', () => {
      console.log('Operation failed');
    });
  } catch (err) {
    console.log('Operation failed');
  }
}

export { copyFile };
