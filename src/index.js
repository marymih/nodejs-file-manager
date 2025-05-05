import { getState, setState } from "./state.js";

const args = process.argv.slice(2);

try {
  const parsedArg = args.find(arg => arg.startsWith('--username='));
  const username = parsedArg?.split('=')[1];
  if (!username) {
    throw new Error('Invalid input');
  }
  setState({ username });
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${getState().currentDirectory}`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
