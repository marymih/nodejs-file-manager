import path from 'path';
import { getState, setState } from '../../state.js';
import { showCurrentDirectory } from '../../helper.js';

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

export { goUp };
