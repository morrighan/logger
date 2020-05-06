/* eslint-disable no-use-before-define */

// Third-party modules.
import chalk, { Chalk } from 'chalk';

// Constants.
const colorizerMap = new Map<number, Chalk>();

// Helpers.
function createScheme(options: { background: ColorValue, foreground: ColorValue }): number {
    const nextIndex = colorizerMap.size;
    const colorizer = chalk.bgHex(options.background).hex(options.foreground);

    colorizerMap.set(nextIndex, colorizer);

    return nextIndex;
}

// Color definitions.
enum ColorValue {
    // Basic colors.
    White = '#FFFFFF',
    Gray = '#808080',
    Black = '#000000',

    // Specialized colors.
    Critical = '#D63031',
    Warning = '#FDCB6E',
    Regular = '#0984E3',
    Http = '#6AB04C',
    Query = '#399AF3'
}

enum ColorScheme {
    Critical = createScheme({
        background: ColorValue.Critical,
        foreground: ColorValue.Black
    }),

    Warning = createScheme({
        background: ColorValue.Warning,
        foreground: ColorValue.Black
    }),

    Regular = createScheme({
        background: ColorValue.Regular,
        foreground: ColorValue.White
    }),

    Http = createScheme({
        background: ColorValue.Http,
        foreground: ColorValue.Black
    }),

    Query = createScheme({
        background: ColorValue.Query,
        foreground: ColorValue.Black
    }),

    Loud = createScheme({
        background: ColorValue.Black,
        foreground: ColorValue.Gray
    })
}

export function getChalkOf(colorSet: ColorScheme): Chalk {
    return colorizerMap.get(colorSet) ?? chalk;
}

export default ColorScheme;

/* eslint-enable no-use-before-define */
