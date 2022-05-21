const path = require('path');
const fs = require('fs');

// creating project-dist and merging styles
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
  if (error) {
    console.error(error.message);
  }
});

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (error) => {
  if (error) {
    console.log(error);
  }
});

fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files
      .filter((file) => path.extname(path.join(__dirname, 'styles', file)) === '.css')
      .forEach((file) => {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), { flags: 'a' });
        readStream.pipe(writeStream);
      });
  }
});

// copy assets to project-dist
const copyDir = (folderName) => {
  fs.mkdir(path.join(__dirname, 'project-dist', folderName), { recursive: true }, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  fs.readdir(path.join(__dirname, folderName), { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach((file) => {
        if (file.isDirectory()) {
          copyDir(path.join(folderName, file.name));
        } else {
          fs.copyFile(path.join(__dirname, folderName, file.name), path.join(__dirname, 'project-dist', folderName, file.name), (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
      });
    }
  });
};
copyDir('assets');

// making html
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, htmlData) => {
  let html = htmlData;
  if (error) {
    console.log(error);
  } else {
    fs.readdir(path.join(__dirname, 'components'), (error, files) => {
      if (error) {
        console.log(error);
      } else {
        files
          .filter((file) => path.extname(path.join(__dirname, 'components', file)) === '.html')
          .forEach((file) => {
            const name = file.split('.')[0];
            fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (error, fileData) => {
              if (error) {
                console.log(error);
              } else {
                html = html.replace(`{{${name}}}`, fileData);
                const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                writeStream.write(html);
              }
            });
          });
      }
    });
  }
});
