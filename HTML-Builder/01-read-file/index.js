const fs = require('fs');
const path = require('path');

const file = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
file.on('data', (chunk) => console.log(chunk));
file.on('error', (error) => console.log(error));
