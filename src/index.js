const args = process.argv.slice(2);

try {
  const parsedArg = args.find(arg => arg.startsWith('--username='));
  const username = parsedArg?.split('=')[1];
  if (!username) {
    throw new Error('Invalid input');
  }
  console.log(`Welcome to the File Manager, ${username}!`);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
