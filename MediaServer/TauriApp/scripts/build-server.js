import { execSync } from 'child_process';
import fs from 'fs';



const Ha = execSync('npx tsc', { cwd:__dirname+"/server", stdio:"pipe"});
const Ha2 = execSync('npx pkg .', { cwd:__dirname+"/server", stdio:"pipe"});

const ext = process.platform === 'win32' ? '.exe' : '';

const rustInfo = execSync('rustc -vV');
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
}

fs.renameSync(
  `./server/server${ext}`,
  `./src-tauri/binaries/app-${targetTriple}${ext}`
);