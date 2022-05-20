const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (error) => {
  if (error) return console.error(error.message);
});

fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files
      .filter((file) => path.extname(path.join(__dirname, 'styles', file)) === '.css')
      .forEach((file) => {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), { flags: 'a' });
        readStream.pipe(writeStream);
      });
  }
});
