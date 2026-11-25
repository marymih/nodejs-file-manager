# Node.js File Manager

A command-line file manager written in plain Node.js (no dependencies), built as a learning task in the RS School Node.js course. It uses the Node.js `fs` and `path` modules, streams for reading, copying and moving files, and `readline` for the interactive prompt.

**Status:** navigation and basic file operations are implemented. The OS info, hash and compression commands from the original assignment are not implemented.

## Requirements

Node.js 18 or newer.

## Run

```bash
git clone https://github.com/marymih/nodejs-file-manager.git
cd nodejs-file-manager
npm run start -- --username=your_name
```

The file manager starts in the current working directory (the project folder when started with `npm run start`). To start it somewhere else, run `node /path/to/nodejs-file-manager/src/index.js --username=your_name` from that folder. Type `.exit` or press `Ctrl+C` to quit.

## Commands

| Command | Description |
| --- | --- |
| `up` | Go to the parent directory |
| `cd <path>` | Go to a directory (relative or absolute path) |
| `ls` | List the current directory: folders first, then files, sorted by name |
| `cat <file>` | Print a file's contents (read with a stream) |
| `add <file>` | Create an empty file |
| `mkdir <dir>` | Create a directory |
| `rn <file> <new_name>` | Rename a file |
| `cp <file> <dir>` | Copy a file into a directory (streams) |
| `mv <file> <dir>` | Move a file into a directory (copy with streams, then delete the source) |
| `rm <file>` | Delete a file |
| `.exit` | Quit |

Unknown commands print `Invalid input`; failed operations print `Operation failed`. Paths with spaces are not supported.

## Example session

```text
$ npm run start -- --username=Masha
Welcome to the File Manager, Masha!
You are currently in /home/masha/demo
add notes.txt
You are currently in /home/masha/demo
mkdir docs
You are currently in /home/masha/demo
rn notes.txt todo.txt
You are currently in /home/masha/demo
cp todo.txt docs
You are currently in /home/masha/demo
ls
┌─────────┬────────────┬─────────────┐
│ (index) │ Name       │ Type        │
├─────────┼────────────┼─────────────┤
│ 0       │ 'docs'     │ 'directory' │
│ 1       │ 'todo.txt' │ 'file'      │
└─────────┴────────────┴─────────────┘
You are currently in /home/masha/demo
cd docs
You are currently in /home/masha/demo/docs
up
You are currently in /home/masha/demo
.exit
Thank you for using File Manager, Masha, goodbye!
```
