const { renameVariables, renameFunctions, randomString, renameProperties } = require("./rename names.js");
const { addUselessFunctions } = require("./random code.js");
const { createAliases } = require("./builtin func aliases.js");
const { encodeStrings } = require("./encode strings.js");
const { encodeNumbers } = require("./encode numbers.js");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

/**
 * Obfuscates a Luau script
 * @param {string} inputPath - Path to the input script
 * @param {string} outputPath - Path where the obfuscated script should be saved
 * @returns {Promise<string>} - Path to the obfuscated file
 */
async function obfuscate(inputPath, outputPath) {
    try {
        const contents = await readFileAsync(inputPath, "utf8");
        
        const trueName = randomString(24);
        const falseName = randomString(24);
        const getfenvName = randomString(24);

        let inputCode = `${contents};${addUselessFunctions(addUselessFunctions(addUselessFunctions(addUselessFunctions(" "))))}`;
        inputCode = inputCode.replace(/(?<=[^:])--.*|^--.*/g, "").trim();
        inputCode = inputCode.replace(/\btrue\b/g, `(not ${falseName})`).replace(/\bfalse\b/g, `(not ${trueName})`);
        inputCode = `local ${falseName}=(not true);local ${trueName}=(not false);` + inputCode;

        inputCode = renameFunctions(inputCode, 24);
        inputCode = addUselessFunctions(inputCode, 1);

        inputCode = renameVariables(inputCode, 30);
        inputCode = createAliases(inputCode, getfenvName);
        inputCode = encodeStrings(inputCode);
        inputCode = encodeNumbers(inputCode);
        inputCode = renameProperties(inputCode);

        // Clean up whitespace
        inputCode = inputCode.replace(" = ", "=").replace(" == ", "==").replace(" ~= ", "~=")
            .replace(" < ", "<").replace(" > ", ">").replace(" <= ", "<=").replace(" >= ", ">=")
            .replace(" + ", "+").replace(" - ", "-").replace(" * ", "*").replace(" ^ ", "^")
            .replace(" .. ", "..").replace(" / ", "/").replace(", ", ",");
        
        inputCode = inputCode.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
        
        // Add final wrapper
        inputCode = `return(function(...)([[ Script obfuscated by Z1nfuscator ]]):gsub('.+',(function(iwjdnaisn)local ${randomString(20)}=iwjdnaisn.."Unga Bunga 🤫";end));do local ${getfenvName}=getfenv;${inputCode};end([[ "ts was obf by Z1n" -Niggatron ]]):gsub('.+',(function(hajwdhjs)local ${randomString(20)}=hajwdhjs.."youre never dumping ts dawg";end));end)(...)`;
        
        // Write output
        await writeFileAsync(outputPath, inputCode);
        
        return outputPath;
    } catch (error) {
        console.error('Obfuscation error:', error);
        throw error;
    }
}

module.exports = { obfuscate };
