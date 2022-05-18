const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  console.log('\nIn this folder files are:');
  if (err) console.log(err);
  else {
    files
      .filter((file) => file.isFile())
      .forEach((file) => {
        const name = path.basename(file.name, path.extname(file.name));
        const extName = path.extname(file.name).slice(1);
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          if (err) {
            console.log('File does not exist.');
          } else {
            const size = (stats.size / 1024).toFixed(3) + 'kb';
            console.log(`${name} - ${extName} - ${size}`);
          }
        });
      });
  }
});
