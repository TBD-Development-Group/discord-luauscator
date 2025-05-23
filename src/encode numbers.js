// Encode numbers into obfuscated Lua code (e.g. hex, math expressions)

function encodeNumber(num) {
  // Example: convert number to hex format for obfuscation
  const hex = num.toString(16);
  return `0x${hex}`;
}

module.exports = encodeNumber;
