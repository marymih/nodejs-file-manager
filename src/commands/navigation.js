import path from 'path';
import { getState, setState } from '../state.js';

function goUp() {
  const { currentDirectory } = getState();
  const parentDirectory = path.dirname(currentDirectory);

  if (parentDirectory === currentDirectory) {
    console.log("You are already in the root directory.");
    return;
  }

  setState({ currentDirectory: parentDirectory });
  console.log(`You are currently in ${parentDirectory}`);
}

export { goUp };
