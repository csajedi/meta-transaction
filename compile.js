const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

compile = (fileName) => {
  console.log('Compiling ' + fileName + ' file');
  const tokenPath = path.resolve(__dirname, 'contracts', fileName);
  const source = fs.readFileSync(tokenPath, 'utf8');
  const compiled = solc.compile(source, 1);
  if (compiled.errors) {
    console.log(`Errors: ` + compiled.errors.join(""));
    return;
  }
  const output = solc.compile(source, 1).contracts;
  console.log('Compile ' + fileName + ' success');

  fs.ensureDirSync(buildPath);

  for (let contract in output) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output[contract]
    );
  }
};

// compile('Token.sol');
// compile('Crowdsale.sol');
compile('TxRelay.sol');
compile('MessageBox.sol');

