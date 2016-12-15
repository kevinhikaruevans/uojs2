const charRegExp = new RegExp('\0', 'g');

const common = (type, string, length, char = '\0') => {
    let result = string;

    if(result === 'undefined') {
        console.warn(`[helpers:pad:${type}] String is %s`, result);
    } else {
        if(string.length > length) {
            console.warn(`[helpers:pad:${type}] String length > pad length. %s`, string);
            result = string.substring(0, length)
        } else {
            const pad = new Array(length - string.length + 1).join(char);

            if(type === 'right') {
                result = string + pad;
            } else if(type === 'left') {
                result = pad + string;
            }
        }
    }

    return result;
};

export const right = (...args) => common('right', ...args);

export const left = (...args) => common('left', ...args);

export const trim = string => {
    let result = string;

    if(result === 'undefined') {
        console.warn(`[helpers:pad:trim] String is %s`, result);
    } else {
        result = result.replace(charRegExp, '');
        result = result.trim();
    }

    return result;
};

export default {
    right,
    left,
    trim
}
