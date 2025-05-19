const { randomString, randomGoofyAhhString } = require("./rename names");

const customDecodeName = randomString(28);
const customDecodeParamName = randomString(24);
const decodeFuncName = randomString(28);
const decodeFuncParamName = randomString(24);

function customEncode(str) {
    let encoded = "";
    for (let i = 0; i < str.length; i++) {
        encoded += "\\\\x" + (str.charAt(i).charCodeAt(0) + 123).toString(16).toUpperCase().padStart(2, "0");
    }

    return encoded;
}

function encodeStrings(code) {
    const strings = [];
    const stringsTableName = randomString(28);

    code = code.replace(/'(.*?)'/g, (_, v) => {
        const k = `dlawkjdjawk${strings.length + 1}`;
        strings.push({ key: k, value: v});

        return `${decodeFuncName}(${stringsTableName}["${k}"])`;
    })

    code = code.replace(/"(.*?)"/g, (_, v) => {
        const k = `dlawkjdjawk${strings.length + 1}`;
        strings.push({ key: k, value: v});

        return `${decodeFuncName}(${customDecodeName}(${stringsTableName}["${k}"]))`;
    })

    const luauTable = `local ${stringsTableName}={${strings.map(({key, value}) => {
        const encoded = Buffer.from(value, "utf8").toString("base64").replace(/=+$/, "");

        return `["${key}"]="${customEncode(encoded)}"`;
    }).join(",")}}`

    code = code.replace(/"(.*?)"/g, (_, str) => {
        const encoded = Buffer.from(str, "utf8").toString("base64").replace(/=+$/, "");

        return `${decodeFuncName}(${customDecodeName}("${customEncode(encoded)}"))`;
    })

    code = code.replace(/'(.*?)'/g, (_, str) => {
        const encoded = Buffer.from(str, "utf8").toString("base64").replace(/=+$/, "");

        return `${decodeFuncName}(${customDecodeName}("${customEncode(encoded)}"))`;
    })

    const customDecodeFunc = `local function ${customDecodeName}(${customDecodeParamName})local khawd="";local i=1;while(i<=#${customDecodeParamName})do if(i+3<=#${customDecodeParamName})then local asjdh=${customDecodeParamName}:sub(i + 2, i + 3);if(asjdh)then local kjsehbf=tonumber(asjdh, 16);if(kjsehbf)then local diujw=kjsehbf-123;khawd=khawd..string.char(diujw);end end end i=i+4;end;return(khawd);end;`;
    const decodeFunc = `local function ${decodeFuncName}(${decodeFuncParamName})local ${randomString(13)}=([[ ${randomGoofyAhhString()} ]]):gsub('.+',(function(owuhehfb)if(3>3)then local v=1 else local ${randomString(20)}=owuhehfb end;end));${decodeFuncParamName}=${decodeFuncParamName}:sub(31-(13+18))local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'local ${randomString(13)}=([[ ${randomGoofyAhhString()} ]]):gsub('.+',(function(auhedg)if(auhedg==auhedg)then local d=1 else local ${randomString(20)}=auhedg end;end));${decodeFuncParamName}=string.gsub(${decodeFuncParamName},'[^'..b..'=]','')return(${decodeFuncParamName}:gsub('.',function(x)local ${randomString(13)}=([[ ${randomGoofyAhhString()} ]]):gsub('.+',(function(iwhadis)local wada=123 if(wada~=69)then local ${randomString(20)}=iwhadis else wada=3 end;end));local r,f='',(b:find(x)or 0)-1 for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and'1'or'0')end([[ ${randomGoofyAhhString()} ]]):gsub('.+',(function(ilawusdh)local ${randomString(20)}="idk bruh"..ilawusdh;end)); return(r)end):gsub('%d%d%d?%d?%d?%d?%d?%d?',function(x)if(#x<8)then local ${randomString(13)}=([[ Lots of "string.char" huh? ]]):gsub('.+',(function(ahuiwdghus)local ${randomString(20)}=ahuiwdghus;end));return''end local c=0 for i=1,8 do c=c+(x:sub(i,i)=='1'and 2^(8-i) or 0)end return string.char(c)end))end;`;
    return luauTable + decodeFunc + customDecodeFunc + code;
}

module.exports = { encodeStrings, customEncode, customDecodeName };
