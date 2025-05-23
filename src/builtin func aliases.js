const builtinFunctions = {
    'print': ['output', 'display', 'show', 'echo'],
    'table.insert': ['addToTable', 'tableAdd', 'insertElement'],
    'string.sub': ['strPart', 'substring', 'getSubstr'],
    'math.floor': ['roundDown', 'floorNum', 'integerPart'],
    'pairs': ['loopTable', 'iterateAll', 'tableIterator']
};

module.exports = function generateAlias(originalName) {
    if (builtinFunctions[originalName]) {
        const aliases = builtinFunctions[originalName];
        return aliases[Math.floor(Math.random() * aliases.length)];
    }
    return originalName;
};
