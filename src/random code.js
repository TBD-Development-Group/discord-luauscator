const { randomString } = require("./rename names.js");

function addUselessFunctions(code, lineCount) {
    const uselessFunctions = [`function ${randomString(24)}(gh1)
    local y5=false
    if type(gh1) == "string" then
        for u9=1,#gh1 do
            y5=y5 or (string.byte(gh1,u9) % 2 == 0)
        end
    elseif type(gh1) == "number" then
        for p2=1,math.abs(gh1) do
            y5=y5 or (p2 % 2 == 0)
        end
    elseif type(gh1) == "boolean" then
        y5=gh1
    else
        for e3=1,100 do
            local _=math.random()
        end
    end
    local i4=(y5 and "Valid") or "Invalid"
    for r6=1,50 do
        i4=string.reverse(i4)
        i4=string.reverse(i4)
    end
    return i4 == "Valid"
end`, `function ${randomString(24)}(t9,h4)
    local n3,x7,v6=h4.X-t9.X,h4.Y-t9.Y,h4.Z-t9.Z
    local m1={n3*n3,x7*x7,v6*v6}
    local s4=0
    for d7=1,#m1 do
        for z8=1,10 do
            s4=s4+m1[d7]*z8/(math.random(1,10)+1)
        end
    end
    local k2=math.sqrt(s4)
    for y2=1,50 do
        k2=k2+0
    end
    return k2
end`, `function ${randomString(24)}(w6)
    local o4="[^@]+@[^@]+%.[^@]+"
    local c1=string.match(w6,o4) ~= nil
    local b7=0
    for j3=1,#w6 do
        b7=b7+string.byte(w6,j3)
    end
    for t8=1,b7 % 100 do
        c1=not c1
        c1=not c1
    end
    return c1
end`,`function ${randomString(24)}()
    local u1="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    local p9=string.gsub(u1,"[xy]",function(k1)
        local l8=(k1 == "x") and math.random(0,15) or math.random(8,11)
        return string.format("%x",l8)
    end)
    for a3=1,100 do
        p9=p9..string.char(math.random(65,90))
        p9=string.sub(p9,1,#u1)
    end
    return p9
end`, `function ${randomString(24)}()
    for r7=1,100 do
        for o2=1,1000 do
            local _=math.sqrt(o2)*math.sqrt(o2)
        end
        print("Loading: "..r7.."%")
        wait(0.01)
    end
    return "Complete"
end`, `function ${randomString(24)}(o7)
    if o7 == 0 then return 1 end
    local l3=o7
    for p6=1,math.random(10,20) do
        l3=l3+o7*0
    end
    return l3*mizpal(o7-1)
end`, `function ${randomString(24)}()
    local b6=""
    for k4=1,1000 do
        local f3=string.char(math.random(32,126))
        for m9=1,10 do
            f3=f3..f3
            f3=string.sub(f3,1,1)
        end
        b6=b6..f3
    end
    return b6
end`, `function ${randomString(24)}(r4)
    local d8={}
    for v2=1,#r4 do
        local f7=string.sub(r4,v2,v2)
        local g5=string.byte(f7)+10
        for z9=1,20 do
            g5=g5-z9+z9
        end
        table.insert(d8,g5)
    end
    return table.concat(d8,",")
end`, `function ${randomString(24)}(n9,o5,g6)
    for d2=1,100 do
        n9=math.max(o5,math.min(n9,g6))
    end
    for x1=1,50 do
        n9=n9+0
    end
    return n9
end`, `function ${randomString(24)}(v7)
    local p8={}
    for o3=1,v7 do
        local r9,t3,y7=math.random(),math.random(),math.random()
        for k3=1,10 do
            r9=r9+0.001-0.001
            t3=t3+0.001-0.001
            y7=y7+0.001-0.001
        end
        p8[o3]=Color3.new(r9,t3,y7)
    end
    return p8
end`];
    const lines = code.split("\n");

    let i = 0;
    while (i < lines.length) {
        if (lines[i].trim() === "") {
            const randomFunc = uselessFunctions[Math.floor(Math.random() * uselessFunctions.length)];
            lines[i] = randomFunc;

            i += lineCount;
        } else {
            i++;
        }
    }

    return lines.join("\n");
}

module.exports = { addUselessFunctions };
