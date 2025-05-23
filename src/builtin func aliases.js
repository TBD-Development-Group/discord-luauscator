// Aliases for builtin Lua functions to obfuscate code by replacing them with short names

const builtinAliases = {
  "string.sub": "ss",
  "string.len": "sl",
  "string.char": "sc",
  "math.random": "mr",
  "math.floor": "mf",
  "table.insert": "ti",
  "table.remove": "tr",
  "coroutine.create": "cc",
  "coroutine.resume": "cr",
  // add more builtin function aliases as needed
};

module.exports = builtinAliases;
