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

async function listDirectory() {
  const { currentDirectory } = getState();

  try {
    const entries = await fs.promises.readdir(currentDirectory, { withFileTypes: true });
    const files = [];
    const folders = [];

    entries.forEach(entry => {
      const item = {
        Name: entry.name,
        Type: entry.isDirectory() ? 'directory' : 'file',
      };

      if (entry.isDirectory()) {
        folders.push(item);
      } else {
        files.push(item);
      }
    });

      folders.sort((a, b) => a.Name.localeCompare(b.Name));
      files.sort((a, b) => a.Name.localeCompare(b.Name));

      const sortedEntries = [...folders, ...files];
      console.table(sortedEntries);
      showCurrentDirectory();
    } catch (err) {
    console.log('Operation failed');
    }
  }

export { goUp, changeDirectory, listDirectory };
