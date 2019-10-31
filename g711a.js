const LEVEL_RANGE = [1 << 4, 1 << 5, 1 << 6, 1 << 7, 1 << 8, 1 << 9, 1 << 10, 1 << 11];
const STEP = [1, 1, 2, 1 << 2, 1 << 3, 1 << 4, 1 << 5, 1 << 6];


function encode(signal) {
    let code = signal >= 0 ? '1' : '0';
    signal = Math.abs(signal) * 2048;
    for (const level in LEVEL_RANGE)
        if (LEVEL_RANGE[level] > signal)
            return code +
                parseInt(level).toString(2).padStart(3, '0') +
                Math.floor(signal / STEP[level]).toString(2).padStart(4, '0');
}

function decode(code) {
    let level = parseInt(code.slice(1, 4), 2);
    let step = parseInt(code.slice(4, 8), 2);
    return ((1 << (level + 3)) + STEP[level] * (step + 0.5)) / 2048 *
        (parseInt(code[0]) === 1 ? 1 : -1);
}


switch (process.argv[2]) {
    case 'd':
    case 'decode':
        console.log(decode(process.argv[3]));
        break;
    case 'e':
    case 'encode':
        console.log(encode(parseFloat(process.argv[3])));
        break;
}
