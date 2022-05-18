const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.access(path.join(__dirname, 'notes.txt'), (error) => {
  if (error) {
    fs.writeFile(path.join(__dirname, 'notes.txt'), '', (error) => {
      if (error) return console.error(error.message);
    });
  }
});

stdout.write('Hello! Wright something to your notes.\n');

stdin.setEncoding('utf-8');

stdin.on('data', (data) => {
  if (data.trim() === 'exit') {
    console.log('Bye!');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'notes.txt'), data, () => console.log('Something else?'));
  }
});

process.on('SIGINT', () => {
  console.log('Bye!');
  process.exit();
});
