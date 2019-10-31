function encodeAMI(bin) {
    let k = -1;
    return Array.from(bin).map(i => {
        if (i === '0') return 0;
        else {
            k = -k;
            return k;
        }
    });
}

function binTextToArray(bin) {
    return Array.from(bin).map(i => parseInt(i));
}

export function strToBin(text) {
    let bin = "";
    for (let i = 0; i < text.length; i++)
        bin += text.charCodeAt(i).toString(2).padStart(8, '0');
    return bin;
}

export function encodeHDB3(bin) {
    let ami = encodeAMI(bin);
    // 每碰到一次±1，加一次，当碰到四个0时查看奇偶并清零
    // 每碰到一次0，加一次，当碰到1或者四个0时清零，前面偶数个1则B00V，奇数个000V
    // 第一个无论如何为
    for (let i = 0, flagOne = 0, flagZero = 0, flagFirst = true; i < ami.length; i++) {
        if (ami[i] === 0) flagZero++;
        else {
            flagOne++;
            flagZero = 0;
        }

        if (flagZero === 4) {
            if (flagOne % 2 === 0 && !flagFirst)
                ami[i] = ami[i - 3] = -ami[i - 4];
            else
                ami[i] = ami[i - 4];
            flagOne = flagZero = 0;
            flagFirst = false;
        }
    }

    return ami.join(',');
}

export function encodeMiller(bin) {
    if (!bin) return '';
    // 1在中间跃变，0不变，0的前面也是0时，边缘跃变
    let res = [], content = binTextToArray(bin);

    res.push(...(!content[0] ? [-1, -1] : [-1, 1]));
    for (let i = 1, preContent = content[0], preStatus = res[1]; i < content.length; ++i) {
        if (content[i]) {
            res.push(preStatus, -preStatus);
            preStatus = -preStatus;
            preContent = 1;
        } else {
            if (!content[i - 1])
                preStatus = -preStatus;
            res.push(preStatus, preStatus);
            preContent = 0;
        }
    }

    return res.join(',');
}

export function encodeCMI(bin) {
    if (!bin) return '';
    // 1交替用1 1和0 0表示；0用0 1表示
    let res = [], content = binTextToArray(bin);
    for (let i = 0, flagOne = true; i < content.length; ++i)
        if (content[i]) {
            res.push(...flagOne ? [1, 1] : [-1, -1]);
            flagOne = !flagOne;
        } else res.push(-1, 1);
    return res.join(',');
}


const DMCodeMap = [[-1, 1], [1, -1]];

export function encodeDM(bin) {
    if (!bin) return '';
    // 遇到0就保持前一个bit的波形，1就反一下，第一个前面是高位
    let res = [], content = binTextToArray(bin);

    res.push(...DMCodeMap[1 - content[0]]);
    for (let i = 1, flagWhich = 1 - content[0]; i < content.length; ++i) {
        if (content[i])
            flagWhich = 1 - flagWhich;
        res.push(...DMCodeMap[flagWhich])
    }
    return res.join(',');
}
