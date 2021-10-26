const path = require('path');
const os = require('os');
const fs = require('fs');

// 1. 폴더 이름 받기

//인자가 세 번째에 있음.
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);
if (!folder || !fs.existsSync(workingDir)) {
  console.error('Please enter folder name in Pictures');
  return;
}

// 2. video, captured, duplicated 폴더 만듬
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

console.log(videoDir);
// 3. mp4/mov, png/aae, IMG_1234(IMG_E1234)
fs.promises
  .readdir(workingDir) //
  .then(processFiles)
  .catch(console.log);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}
function isDuplicatedFile(files, file) {
  // IMG_XXXX -> IMG_EXXX
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
    return false;
  }

  const editied = `IMG_E${file.split('_')[1]}`;
  const found = files.find((f) => f.includes(editied));
  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.bas}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);

  fs.promises
    .rename(oldPath, newPath) //
    .catch(console.error);
}
