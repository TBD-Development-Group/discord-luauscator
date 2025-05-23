const usedNames = new Set();
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateRandomName(length) {
    let name = '';
    for (let i = 0; i < length; i++) {
        name += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return name;
}

module.exports = function getNewName(originalName) {
    if (usedNames.has(originalName)) {
        return originalName;
    }
    
    let newName;
    do {
        const length = Math.floor(Math.random() * 3) + 2;
        newName = generateRandomName(length);
    } while (usedNames.has(newName));
    
    usedNames.add(newName);
    return newName;
};
