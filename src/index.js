import readline from 'readline';
import { getState, setState } from './state.js';
import { goUp } from './commands/navigation/goUp.js';
import { changeDirectory } from './commands/navigation/changeDirectory.js';
import { listDirectory } from './commands/navigation/listDirectory.js';
import { showCurrentDirectory } from './helper.js';

const args = process.argv.slice(2);

try {
  const parsedArg = args.find((arg) => arg.startsWith('--username='));
  const username = parsedArg?.split('=')[1];
  if (!username) {
    throw new Error('Invalid input');
  }
  setState({ username });
  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentDirectory();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async (input) => {
  const trimmedInput = input.trim();

  if (!trimmedInput) return;

  const [command, ...args] = trimmedInput.split(' ');
  const argument = args.join(' ');

  try {
    switch (command) {
      case 'up':
        goUp();
        break;
      case 'cd':
        changeDirectory(argument);
        break;
      case 'ls':
        await listDirectory();
        break;
      case '.exit':
        rl.close();
        break;
      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  }
});

rl.on('close', () => {
  const { username } = getState();
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

rl.on('SIGINT', () => {
  rl.close();
});
