// Generate random code snippets or junk code for obfuscation

function randomCode() {
  const junk = [
    'local _ = {}',
    'local __ = {}',
    'local ___ = math.random(100)',
    'local skibidijfjfjfj = "obfuscation"',
    'repeat until false',
    // add more random junk code snippets here
  ];
  return junk[Math.floor(Math.random() * junk.length)];
}

module.exports = randomCode;
