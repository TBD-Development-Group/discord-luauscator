// Main entry point for the Lua obfuscator

const fs = require('fs');
const builtinAliases = require('./src/builtin func aliases');
const encodeNumber = require('./src/encode numbers');
const encodeString = require('./src/encode strings');
const randomCode = require('./src/random code');
const renameNames = require('./src/rename names');

function obfuscateLua(code) {
  // Basic example pipeline:
  // 1. Replace builtin functions with aliases
  Object.entries(builtinAliases).forEach(([orig, alias]) => {
    const regex = new RegExp(orig.replace('.', '\\.'), 'g');
    code = code.replace(regex, alias);
  });

  // 2. Encode numbers and strings (basic example)
  code = code.replace(/\d+/g, num => encodeNumber(Number(num)));
  code = code.replace(/"([^"]*)"/g, (_, str) => encodeString(str));

  // 3. Add random junk code
  code += '\n' + randomCode();

  // 4. Rename variables (very basic)
  // You would parse and detect vars to rename, simplified here:
  const vars = ['foo', 'bar', 'baz'];
  const renamed = renameNames(vars);
  Object.entries(renamed).forEach(([orig, newName]) => {
    const regex = new RegExp(`\\b${orig}\\b`, 'g');
    code = code.replace(regex, newName);
  });

  return code;
}

// Usage example:
const inputLua = fs.readFileSync(process.argv[2], 'utf-8');
const outputLua = obfuscateLua(inputLua);
fs.writeFileSync(process.argv[3], outputLua);

console.log('Obfuscation complete.');

module.exports = obfuscateLua;
