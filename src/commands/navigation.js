import fs from 'fs';
import path from 'path';
import { getState, setState } from '../state.js';
import { showCurrentDirectory } from '../helper.js';

function goUp() {
  const { currentDirectory } = getState();
  const parentDirectory = path.dirname(currentDirectory);

  if (parentDirectory === currentDirectory) {
    console.log('You are already in the root directory.');
    return;
  }

  setState({ currentDirectory: parentDirectory });
  showCurrentDirectory();
}

function changeDirectory(inputPath) {
  const { currentDirectory } = getState();
  const newPath = path.resolve(currentDirectory, inputPath);

  try {
    if (fs.statSync(newPath).isDirectory()) {
      setState({ currentDirectory: newPath });
      showCurrentDirectory();
    } else {
      console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
}

export { goUp, changeDirectory };
