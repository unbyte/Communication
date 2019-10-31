export function binToStr(bin) {
    let text = '';
    for (let i = 0; i < Math.floor(bin.length / 8); ++i) {
        text += String.fromCharCode(parseInt(bin.substring(8 * i, 8 * (i + 1)), 2));
    }
    return text;
}

export function decodeHDB3(coded) {
    if (!coded) return '';
    let codedArray = coded.split(',').map(i => parseInt(i));
    for (let i = 0, temp = -1; i < codedArray.length; ++i)
        if (codedArray[i] !== 0)
            if (temp === codedArray[i])
                codedArray[i - 3] = codedArray[i - 2] = codedArray[i - 1] = codedArray[i] = 0;
            else
                temp = -temp;

    return codedArray.map(i => Math.abs(i)).join('');
}

export function decodeMiller(coded) {
    if (!coded) return '';
    let codedArray = coded.split(',').map(i => parseInt(i));
    let res = [];
    for (let i = 0; i < Math.floor(codedArray.length / 2); ++i)
        res.push(codedArray[2 * i] !== codedArray[2 * i + 1] ? 1 : 0);

    return res.join('');
}

export function decodeCMI(coded) {
    if (!coded) return '';
    let codedArray = coded.split(',').map(i => parseInt(i));
    let res = [];
    for (let i = 0; i < Math.floor(codedArray.length / 2); ++i)
        res.push(codedArray[2 * i] !== codedArray[2 * i + 1] ? 0 : 1);
    return res.join('');
}

export function decodeDM(coded) {
    if (!coded) return '';
    let codedArray = coded.split(',').map(i => parseInt(i));
    let res = [codedArray[0] ? 1 : 0];
    for (let i = 1; i < Math.floor(codedArray.length / 2); ++i)
        res.push(codedArray[2 * i] !== codedArray[2 * i - 1] ? 0 : 1);
    return res.join('');
}
