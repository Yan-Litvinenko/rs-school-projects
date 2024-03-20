const fs = require('fs');
const path = require('path');
const dirfiles = path.join(__dirname, 'secret-folder');

readDirectory(dirfiles);

async function readDirectory(directory) {
  try {
    const files = await fs.promises.readdir(directory);
    files.forEach(async (item) => {
      const filePath = path.join(dirfiles, item);
      const filename = item.slice(0, item.lastIndexOf('.'));
      const fileext = item.slice(item.lastIndexOf('.') + 1);

      const file = await fs.promises.stat(filePath);
      if (file.isFile()) {
        const size = file.size;
        console.log(`${filename} - ${fileext} - ${size} byte`);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
