import fs from 'fs';
import path from 'path';

function copyDirectory(sourceDir, destinationDir) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

// Usage example:
const sourceDirectory = './src/assets';
const destinationDirectory = './dist/assets';

copyDirectory(sourceDirectory, destinationDirectory);
