import fs from 'fs';
import { access, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function moveFile(source, destination) {
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

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });

    await unlink(sourcePath);
    showCurrentDirectory();
  } catch (err) {
    console.log('Operation failed');
  }
}

export { moveFile };
