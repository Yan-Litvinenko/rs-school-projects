const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'project-dist');

(async () => {
  await createDist(dist);
  await createFileHtml();
  await createBundleCss();
  await createAssets(dist);
  await transferAssets('assets');
})();

async function createDist(directory) {
  try {
    await fs.promises.access(directory, fs.constants.F_OK);
  } catch {
    await fs.promises.mkdir(directory, { recursive: true });
  }
}

async function createFileHtml() {
  const content = await processComponents();
  await fs.promises.writeFile(path.join(dist, 'index.html'), content);
}

async function createBundleCss() {
  const data = await collectionCss();
  await fs.promises.writeFile(path.join(dist, 'style.css'), data);
}

async function createAssets(directory) {
  try {
    await fs.promises.access(path.join(directory, 'assets'), fs.constants.F_OK);
    const files = await fs.promises.readdir(path.join(directory, 'assets'));

    if (files.length) {
      await Promise.all(files.map(async item => {
        const itemPath = path.join(directory, 'assets', item);
        const stats = await fs.promises.lstat(itemPath);
        if (stats.isDirectory()) {
          await fs.promises.rm(itemPath, { recursive: true });
        } else {
          await fs.promises.unlink(itemPath);
        }
      }));
    }
  } catch {
    await fs.promises.mkdir(path.join(directory, 'assets'), {
      recursive: true,
    });
  }
}

async function searchComponents() {
  try {
    const filename = await fs.promises.readdir(
      path.join(__dirname, 'components'),
    );
    const names = filename.map(
      (item) => `{{${item.slice(0, item.lastIndexOf('.'))}}}`,
    );

    return names;
  } catch (error) {
    throw new Error(error);
  }
}

async function readTemplate() {
  try {
    return (
      await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8')
    ).toString();
  } catch (error) {
    throw new Error(error);
  }
}

async function changeComponent(templatefile, newcontent) {
  try {
    const componentName = newcontent.replace(/(\{\{|\}\})/g, '');
    const componentContent = await fs.promises.readFile(
      path.join(__dirname, 'components', componentName + '.html'),
      'utf-8',
    );

    return templatefile.replace(new RegExp(`{{${componentName}}}`), componentContent);
  } catch (error) {
    throw new Error(error);
  }
}

async function processComponents() {
  try {
    const components = await searchComponents();
    let templateWithComponent = await readTemplate();
    let indexHtml = templateWithComponent;

    for (let component of components) {
      indexHtml = await changeComponent(indexHtml, component);
    }

    return indexHtml;
  } catch (error) {
    throw new Error(error);
  }
}

async function collectionCss() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'styles'));
    const promises = files.map(async (item) => {
      if (item.slice(item.lastIndexOf('.') + 1) === 'css') {
        return fs.promises.readFile(
          path.join(__dirname, 'styles', item),
          'utf-8',
        );
      }
      return '';
    });
    const results = await Promise.all(promises);

    return results.join('');
  } catch (error) {
    throw new Error(error);
  }
}

async function transferAssets(directory) {
  try {
    const assets = await fs.promises.readdir(path.join(__dirname, directory));
    const promises = assets.map(async (item) => {
      const file = await fs.promises.stat(
        path.join(__dirname, directory, item),
      );

      try {
        await fs.promises.access(
          path.join(dist, directory, item),
          fs.constants.F_OK,
        );
      } catch (error) {
        if (file.isDirectory()) {
          await fs.promises.mkdir(path.join(dist, directory, item));
          transferAssets(path.join(directory, item));
        } else {
          await fs.promises.copyFile(
            path.join(__dirname, directory, item),
            path.join(dist, directory, item),
          );
        }
      }
    });
    await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
}
