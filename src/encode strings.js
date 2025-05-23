module.exports = function encodeString(str) {
    // Convert string to hex or base64
    const method = Math.floor(Math.random() * 3);
    
    switch(method) {
        case 0:
            // Hex encoding
            let hex = '';
            for (let i = 0; i < str.length; i++) {
                hex += str.charCodeAt(i).toString(16).padStart(2, '0');
            }
            return `(function() local s='' for c in '${hex}'.gmatch('..') do s=s..string.char(tonumber(c,16)) end return s end)()`;
        case 1:
            // Split string concatenation
            const parts = [];
            for (let i = 0; i < str.length; i++) {
                parts.push(`string.char(${str.charCodeAt(i)})`);
            }
            return parts.join('..');
        case 2:
            // Base64-like encoding (simplified)
            const base64 = Buffer.from(str).toString('base64');
            return `(function() return loadstring('return "'..(string.dump(function() return "${base64}" end):gsub('.', function(c) return string.format("%%%02x", c:byte()) end))..'"')() end)()`;
        default:
            return `"${str}"`;
    }
};
