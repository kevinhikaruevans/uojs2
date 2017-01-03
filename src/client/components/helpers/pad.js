const charRegExp = new RegExp('\0', 'g');

export const trim = (string) => {
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
    trim
}
