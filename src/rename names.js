// Rename variable/function names to short random names to obfuscate

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function randomName(length = 6) {
  let name = '';
  for (let i = 0; i < length; i++) {
    name += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return name;
}

function renameNames(names) {
  const renamed = {};
  names.forEach(name => {
    renamed[name] = randomName();
  });
  return renamed;
}

module.exports = renameNames;
