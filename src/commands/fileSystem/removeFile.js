import fs from 'fs';
import { access, unlink } from 'fs/promises';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function removeFile(fileName) {
  try {
    const { currentDirectory } = getState();
    const filePath = path.resolve(currentDirectory, fileName);

    await access(filePath, fs.constants.F_OK);
    await unlink(filePath);
    showCurrentDirectory();
  } catch (err) {
    console.log('Operation failed');
  }
}

export { removeFile };
