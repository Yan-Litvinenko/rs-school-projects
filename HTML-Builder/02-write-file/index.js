const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  flags: 'a',
});
const writeFile = readline.createInterface({
  input: stdin,
  output: stdout,
});

writeFile.setPrompt('Можешь в меня напечатать текст, а если нет - офай(exit)');
writeFile.prompt();

writeFile.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    writeFile.close();
  } else {
    writeStream.write(input + '\n');
  }
});

writeFile.on('close', () => {
  console.log('Больше ты в меня не напечатаешь.');
  writeStream.end();
});
