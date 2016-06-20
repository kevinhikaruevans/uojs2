export class StringUtils {
    static padRight = (str, length, padChar = '\0') => {
        if (str.length >= length) {
            return str.substring(0, length);
        }
        return str + Array(length - str.length + 1).join(padChar);
    }

    static trim = (str) => (str || '').replace(/\0/g, '').trim()
}
