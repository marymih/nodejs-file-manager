import { writeFile } from 'fs/promises';
import path from 'path';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function addFile(fileName) {
  try {
    const { currentDirectory } = getState();
    const fullPath = path.resolve(currentDirectory, fileName);

    await writeFile(fullPath, '', { flag: 'wx' });
    showCurrentDirectory();
  } catch (err) {
    console.log('Operation failed');
  }
}

export { addFile };
