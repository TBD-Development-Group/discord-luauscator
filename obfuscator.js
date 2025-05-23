const encodeNumbers = require('./src/encode-numbers');
const encodeStrings = require('./src/encode-strings');
const renameNames = require('./src/rename-names');
const randomCode = require('./src/random-code');
const builtinAliases = require('./src/builtin-func-aliases');
const luaparse = require('luaparse');

module.exports = function obfuscate(code, config) {
    let obfuscated = code;
    
    try {
        // Parse the Lua code to AST
        const ast = luaparse.parse(code);
        
        // This is where you would traverse and transform the AST
        // For simplicity, we'll just use regex replacements in this example
        
        if (config.encodeNumbers) {
            obfuscated = obfuscated.replace(/\b\d+(?:\.\d+)?\b/g, match => {
                return encodeNumbers(parseFloat(match));
            });
        }
        
        if (config.encodeStrings) {
            obfuscated = obfuscated.replace(/"([^"]*)"|'([^']*)'/g, match => {
                const str = match.slice(1, -1);
                return encodeStrings(str);
            });
        }
        
        if (config.renameVariables) {
            // Simple variable renaming (would need proper scope analysis in a real implementation)
            const variables = new Set();
            const varPattern = /\b(local\s+)([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
            
            let match;
            while ((match = varPattern.exec(obfuscated)) !== null) {
                variables.add(match[2]);
            }
            
            variables.forEach(varName => {
                if (!builtinFunctions[varName] && varName.length > 3) {
                    const newName = renameNames(varName);
                    const varRegex = new RegExp(`\\b${varName}\\b`, 'g');
                    obfuscated = obfuscated.replace(varRegex, newName);
                }
            });
        }
        
        if (config.addJunkCode) {
            const junk = randomCode();
            obfuscated = junk + '\n' + obfuscated;
        }
        
        if (config.renameBuiltins) {
            for (const [original, aliases] of Object.entries(builtinFunctions)) {
                const alias = builtinAliases(original);
                const originalRegex = new RegExp(`\\b${original}\\b`, 'g');
                obfuscated = obfuscated.replace(originalRegex, alias);
            }
        }
        
        if (config.minify) {
            obfuscated = obfuscated.replace(/--\[\[[\s\S]*?\]\]/g, ''); // Remove block comments
            obfuscated = obfuscated.replace(/--[^\n]*\n/g, '\n'); // Remove line comments
            obfuscated = obfuscated.replace(/\s+/g, ' '); // Collapse whitespace
            obfuscated = obfuscated.replace(/\s*([=+\-*\/%^<>~;:{},()])\s*/g, '$1'); // Remove spaces around operators
        }
        
        return obfuscated;
    } catch (err) {
        console.error('Obfuscation error:', err);
        throw new Error('Failed to obfuscate code. Please check your Lua syntax.');
    }
};
