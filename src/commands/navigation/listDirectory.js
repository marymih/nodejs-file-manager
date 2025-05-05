import fs from 'fs';
import { getState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

async function listDirectory() {
  const { currentDirectory } = getState();

  try {
    const entries = await fs.promises.readdir(currentDirectory, {
      withFileTypes: true,
    });
    const files = [];
    const folders = [];

    entries.forEach((entry) => {
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

export { listDirectory };
