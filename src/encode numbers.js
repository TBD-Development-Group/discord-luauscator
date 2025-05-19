const { customEncode, customDecodeName } = require("./encode strings.js");
const { randomString } = require("./rename names.js");

const decodeFuncName = randomString(28);
const decodeFuncParam1Name = randomString(24);
const decodeFuncParam2Name = randomString(24);

function encodeNumbers(code) {
    let randomOffsets = [];

    function randomize(num) {
        const randomOffset = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        randomOffsets.push(randomOffset);

        return num + randomOffset
    }

    code = code.replace(/(?<!['"\d])\b\d+(\.\d+)?\b(?!['"\d])/g, (match) => {
        if (!match.includes(".")) {
            //return `${decodeFuncName}(${randomize(parseFloat(match))},${randomOffsets[randomOffsets.length - 1]})`
            return `(${decodeFuncName}(tonumber(${randomize(parseFloat(match/2)).toString().split('').map(num => `string.char(${num.charCodeAt(0)})`).join("..")}),tonumber(${randomOffsets[randomOffsets.length - 1].toString().split('').map(num => `string.char(${num.charCodeAt(0)})`).join("..")}))+${decodeFuncName}(tonumber(${randomize(parseFloat(match/2)).toString().split('').map(num => `string.char(${num.charCodeAt(0)})`).join("..")}),tonumber(${randomOffsets[randomOffsets.length - 1].toString().split('').map(num => `string.char(${num.charCodeAt(0)})`).join("..")})))`;
        }

        return `((tonumber(${customDecodeName}("${customEncode((match/2).toString())}")))+(tonumber(${customDecodeName}("${customEncode((match/2).toString())}"))))`; // simple but does the job
    })

    const decodeFunc = `local function ${decodeFuncName}(${decodeFuncParam1Name},${decodeFuncParam2Name})return(${decodeFuncParam1Name}-${decodeFuncParam2Name})end;`
    return decodeFunc + code;
}

module.exports = { encodeNumbers };
