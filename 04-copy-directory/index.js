const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
  if (error) {
    console.error(error.message);
  }
});

fs.readdir(path.join(__dirname, 'files'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach((file) =>
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (error) => {
        if (error) {
          console.log(error);
        }
      })
    );
    console.log('Copy files done');
  }
});
