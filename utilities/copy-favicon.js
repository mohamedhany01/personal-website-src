import fs from 'fs';
import path from 'path';

function copyFilesFromDirectory(sourceDir, destinationDir, excludeFileName) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    if (file === excludeFileName) {
      return; // Skip copying the excluded file
    }

    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);

    if (!fs.lstatSync(sourcePath).isDirectory()) {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

// Usage example:
const sourceDirectory = './src/';
const destinationDirectory = './dist/';
const excludeFileName = 'index.html';

copyFilesFromDirectory(sourceDirectory, destinationDirectory, excludeFileName);

