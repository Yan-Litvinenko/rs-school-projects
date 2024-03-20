const fs = require('fs');
const path = require('path');

async function copyFiles(direction, copyDirection) {
  try {
    await fs.promises.access(direction, fs.constants.F_OK);
  } catch (err) {
    throw new Error('Direction is not defined');
  }

  try {
    await fs.promises.access(copyDirection, fs.constants.F_OK);
  } catch (err) {
    await fs.promises.mkdir(copyDirection);
  }

  try {
    const copyFiles = await fs.promises.readdir(copyDirection);

    if (copyFiles.length) {
      await Promise.all(copyFiles.map(item => fs.promises.unlink(path.join(copyDirection, item))));
    }
  } catch (error) {
    console.log(error)
  }

  try {
    const files = await fs.promises.readdir(direction);

    files.forEach(async (item) => {
      const filePath = path.join(direction, item);
      const copyFilePath = path.join(copyDirection, item);
      const file = await fs.promises.stat(filePath);

      if (file.isFile()) await fs.promises.copyFile(filePath, copyFilePath);
    });
  } catch (err) {
    console.error(err);
  }
}

copyFiles(path.join(__dirname, 'files'), path.join(__dirname, 'copy-files'));
