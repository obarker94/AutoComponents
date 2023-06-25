const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const binPath = path.resolve(__dirname, '../bin');

const profileFilePath = path.resolve(process.env.HOME, '.bashrc'); // Modify this if you use a different shell profile file

// Modify the PATH variable in the shell profile file
fs.appendFileSync(profileFilePath, `\nexport PATH="${distPath}:$PATH"\n`);

// Create a symbolic link to the index.js file
const linkCommand = process.platform === 'win32' ? `mklink ${binPath}\\ap ${distPath}\\index.js` : `ln -s ${distPath}/index.js ${binPath}/ap`;
execSync(linkCommand, { stdio: 'ignore' });

console.log('Setup completed successfully.');
