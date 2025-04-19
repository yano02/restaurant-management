const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())));
}

function closeInterface() {
  rl.close();
}

module.exports = {
  ask,
  rl,
  closeInterface
};
