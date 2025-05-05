import { getState } from "./state.js";

function showCurrentDirectory() {
  const { currentDirectory } = getState();
  console.log(`You are currently in ${currentDirectory}`);
}

export { showCurrentDirectory };
