const fs = require('fs');
const path = require('path');

async function bundleCss(directory) {
  try {
    await fs.promises.access(directory, fs.constants.F_OK);
    const dir = await fs.promises.stat(directory);
    if (!dir.isDirectory()) throw new Error('Это не папка');
  } catch (error) {
    throw new Error('Неверный путь/имя папки');
  }

  const cssFiles = [];
  const bundle = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    'utf-8',
  );

  try {
    (await fs.promises.readdir(directory)).forEach((item) => {
      if (item.slice(item.lastIndexOf('.') + 1) === 'css') cssFiles.push(item);
    });
  } catch (error) {
    throw new Error(error);
  }

  const processFile = (index) => {
    if (index >= cssFiles.length) {
      bundle.end();
      return;
    }

    const readCss = fs.createReadStream(path.join(directory, cssFiles[index]));
    readCss.on('data', (data) => {
      bundle.write(data.toString());
    });

    readCss.on('end', () => {
      processFile(index + 1);
    });
  };

  processFile(0);
}

bundleCss(path.join(__dirname, 'styles'));
