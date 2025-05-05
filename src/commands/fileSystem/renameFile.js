import { rename } from 'fs/promises';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function renameFile(fileName, newFileName) {
  try {
    const { currentDirectory } = getState();
    const filePath = path.resolve(currentDirectory, fileName);
    const newFilePath = path.resolve(currentDirectory, newFileName);

    await rename(filePath, newFilePath);
    showCurrentDirectory();
  } catch (err) {
    console.log('Operation failed');
  }
}

export { renameFile };
