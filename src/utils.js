export const StringPad = (str, length, padChar = '\0') => {
    if (str.length >= length)
        return str.substring(0, length);
    return str + Array(length - str.length + 1).join(padChar);
};
