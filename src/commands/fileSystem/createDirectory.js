import { mkdir } from 'fs/promises';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function createDirectory(dirName) {
  try {
    const { currentDirectory } = getState();
    const fullPath = path.resolve(currentDirectory, dirName);

    await mkdir(fullPath, { recursive: false });
    showCurrentDirectory();
  } catch (err) {
    console.log('Operation failed');
  }
}

export { createDirectory };
