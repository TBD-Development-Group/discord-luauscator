function randomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";

    let newStr = "";
    for (let i = 0; i < length; i++) {
        newStr += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    return newStr;
};

function randomGoofyAhhString() {
    const strings = [
        `"If her booty doesn't bounce.... the end of the relationship you shall announce" - a wise man`,
        "what the fuck you watching here?",
        `"no pen, no paper... but, you still draw my attention" - a rizzler`,
        "racism is evil",
        "oil up lil bro",
        `"you are a pointer to my heart" - a nerd rizz`,
        `"slide cancel into my life" - a Modern Warfare simp`,
        `"you must be lag, cause you make my heart stutter"`,
        `"damn shawty, you a syntax error... cause you stopped my code from running"`,
        `"if love was a bug, I’d never patch it"`,
        `"you built like unoptimized Lua code"`,
        `"I’d respawn just to see you again"`,
        "bro thinks he's the main character",
        `"is that a breakpoint or are you just pausing my heart?"`,
        "lil bro buffering his thoughts",
        "NPC detected. Avoid eye contact.",
        `"you got me more confused than a Roblox pathfinding AI"`,
        `"you camp harder than my GPU in lava"`,
        "bro got caught lackin’ in a cutscene",
        `"you ain’t got W‑rizz, you got exception thrown"`,
        `"that outfit got more errors than my console"`,
        `"shawty a Lua table—complex but worth accessing"`,
        `"you’re not a script, but you running through my head 24/7"`,
        `"I’d Ctrl+C you into my life, no cap"`,
        "bro walks like he got default animations",
        "you built like free‑model movement",
        `"not even exploiters can bypass how fine you are"`,
        `"girl, are you an update? ‘Cause my whole system changed when I saw you"`,
        `"you're like a semicolon; miss you once and everything breaks"`,
        `"girl you a Roblox obby, got me jumping through hoops"`,
        `"lil bro coded his drip in Assembly—minimal but lethal"`,
        `"error 404: that excuse not found"`,
        `"bro's swag compiled with zero warnings"`,
        `"shawty built like a rare limited—worth billions"`,
        `"I wish I could git commit your smile"`,
        `"your vibe got more uptime than AWS"`,
        `"you hotter than my laptop with 30 Chrome tabs open"`,
        `"if you were packet loss I'd still chase the connection"`,
        `"bro lagged IRL—server desync detected"`,
        `"girl you're the .exe I double‑click"` ,
        `"NPCs couldn't spawn a vibe like yours"`,
        `"that move was so sus even anticheat blushed"`,
        `"you're the final boss in my heart dungeon"`
    ];
    return strings[Math.floor(Math.random() * strings.length)];
}

function renameVariables(code, length) {
    const vNames = [];

    code = code.replace(/local (\w+)/g, (match, vName) => {
        if (vName == "function") {
            return "local function";
        }

        const randomVarName = randomString(length);
        vNames.push({ oldName: vName, newName: randomVarName });

        return `local ${randomVarName}`;
    });

    vNames.forEach(({ oldName, newName }) => {
        code = code.replace(new RegExp(`\\b(?!['"])(?<!['"])${oldName}(?!['"])(?<!['"])\\b`, "g"), newName);
    })

    return code;
};

function renameFunctions(code, length) {
    const fNames = [];

    code = code.replace(/function\s+(\w+)/, (match, fName) => {
        const randomVarName = randomString(length);
        fNames.push({ oldName: fName, newName: randomVarName });

        return `function ${randomVarName}`;
    });

    fNames.forEach(({ oldName, newName }) => {
        code = code.replace(new RegExp(`\\b(?!['"])(?<!['"])${oldName}(?!['"])(?<!['"])\\b`, "g"), newName);
    })

    return code;
}

function renameProperties(code) {
    code = code.replace(/(?<!['"])(\b\w+)\.(\w+)(?!['"])/g, (_, object, property) => {
        if (/\d/.test(object)) { return `${object}.${property}` };

        return `${object}[(${property.toString().split('').map(char => `string.char(${char.charCodeAt(0)})`).join("..")})]`;
    })

    return code;
}

module.exports = { renameVariables, renameFunctions, randomString, renameProperties, randomGoofyAhhString };
