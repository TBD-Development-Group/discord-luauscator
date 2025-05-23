module.exports = function encodeNumber(num) {
    // Randomly choose between different encoding methods
    const method = Math.floor(Math.random() * 4);
    
    switch(method) {
        case 0:
            return `(function() return ${num} end)()`;
        case 1:
            return `((${num} * 1) + 0)`;
        case 2:
            const hex = num.toString(16);
            return `tonumber("${hex}", 16)`;
        case 3:
            const operations = [
                `${num + 5} - 5`,
                `${num * 2} / 2`,
                `${num} + 0`
            ];
            return operations[Math.floor(Math.random() * operations.length)];
        default:
            return num.toString();
    }
};
