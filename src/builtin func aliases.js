const { randomString } = require("./rename names.js")

function randomKey() {
    return `k${Math.floor(1000 + Math.random() * 9000)}`;
}

function createAliases(code, envName) {
    const builtInFuncs = ["game", "assert", "error", "next", "pairs", "pcall", "print", "rawequal", "rawget", "rawset", "select", "tonumber", "tostring", "debug", "math", "string", "table", "Vector3", "Vector2", "Color3", "type", "coroutine", "wait", "tick", "Instance", "_G", "workspace"];

    const funcsTableName = randomString(20);
    const funcName = randomString(20);

    let funcs = {};
    let funcMap = {};

    builtInFuncs.forEach(func => {
        const ranKey = randomKey();
        funcs[ranKey] = func;
        funcMap[func] = ranKey;
    });

    let funcCode = `local ${funcsTableName}={`;
    for (let ranKey in funcs) {
        funcCode += `[\`${ranKey}\`]=${envName}()["${funcs[ranKey]}"],`;
    }
    funcCode += "};";
    funcCode += `local function ${funcName}(hioeuasjrguo)return(${funcsTableName}[hioeuasjrguo])end;`;

    builtInFuncs.forEach(func => {
        code = code.replace(/(["'])(?:(?=(\\?))\2.)*?\1|[^\s]+/g, (match) => {
            if (/^['"]/.test(match)) {
                return match;
            }

            return match.replace(new RegExp(`\\b${func.replace(/\./g, "\\.")}\\b`, "g"), `${funcName}("${funcMap[func]}")`);
        });
    });

    return funcCode + code;
}

module.exports = { createAliases };
