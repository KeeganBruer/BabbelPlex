import { execSync } from 'child_process';
import fs from 'fs';

const ext = process.platform === 'win32'
    ? '-win.exe'
    : process.platform === 'linux'
        ? '-linux'
        :'-macos';

const rustInfo = execSync('rustc -vV');
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
}

fs.renameSync(
  `./server/server${ext}`,
  `./src-tauri/binaries/app-${targetTriple}${ext}`
);