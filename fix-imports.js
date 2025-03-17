import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const dir = './dist';

function fixImportsInFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');

  content = content.replace(
    /import (.*) from ['"](\/?\.{1,2}\/.*)['"]/g,
    (match, p1, p2) => {
      if (
        !p2.endsWith('.js') &&
        (p2.startsWith('./') || p2.startsWith('../'))
      ) {
        p2 = p2 + '.js';
      }
      return `import ${p1} from '${p2}'`;
    }
  );

  writeFileSync(filePath, content);
}

function fixImportsInDirectory(directory) {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);
    if (statSync(filePath).isDirectory()) {
      fixImportsInDirectory(filePath);
    } else if (filePath.endsWith('.js')) {
      fixImportsInFile(filePath);
    }
  });
}

fixImportsInDirectory(dir);
