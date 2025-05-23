const junkCodeSnippets = [
    'local _=function() end; _()',
    'do local a=1; a=a+1 end',
    'if math.random()>0 then end',
    'for i=1,0 do end',
    'while false do end',
    'local t={}; table.insert(t,1); table.remove(t,1)',
    'local f=loadstring(""); if f then f() end'
];

module.exports = function generateJunkCode() {
    const count = Math.floor(Math.random() * 3) + 1;
    let junk = [];
    for (let i = 0; i < count; i++) {
        junk.push(junkCodeSnippets[Math.floor(Math.random() * junkCodeSnippets.length)]);
    }
    return junk.join('\n');
};
