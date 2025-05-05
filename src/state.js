let state = {
  username: null,
  currentDirectory: process.cwd(),
}

function getState() {
  return state;
}

function setState(newState) {
  state = { ...state, ...newState };
}

export { getState, setState };
