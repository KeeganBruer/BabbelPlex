import { execSync } from 'child_process';
import fs from 'fs';



console.log("SERVER DIR", process.cwd() + "/server")

console.log("npm install")
const Ha = execSync('npm install', { cwd: process.cwd() + "/server" });

console.log("npx tsc")
try {

    const Ha1 = execSync('npx tsc', { cwd: process.cwd() + "/server" });
    console.log("Ha1", Ha1.toString());
} catch (e) {
    console.log("Ha1 err",e)
}

const Ha2 = execSync('npx pkg .', { cwd: process.cwd() + "/server" });

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