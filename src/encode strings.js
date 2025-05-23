// Encode strings into obfuscated Lua code (e.g. char codes, hex, concatenations)

function encodeString(str) {
  // Encode string to Lua char codes, e.g. string.char(72,101,108,108,111)
  const chars = [...str].map(c => c.charCodeAt(0)).join(',');
  return `string.char(${chars})`;
}

module.exports = encodeString;
