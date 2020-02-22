// Node.js built-in APIs.
import { stdout } from 'process';

// Third-party modules.
import chalk from 'chalk';

// Type definitions.
type ColorType = [ number, number, number ];

// Constants.
const { isTTY } = stdout;

// Color definitions.
const COLOR_WHITE: ColorType = [ 255, 255, 255 ];
const COLOR_GRAY: ColorType = [ 128, 128, 128 ];
const COLOR_BLACK: ColorType = [ 0, 0, 0 ];
const COLOR_CRITICAL: ColorType = [ 214, 48, 49 ];
const COLOR_WARNING: ColorType = [ 253, 203, 110 ];
const COLOR_REGULAR: ColorType = [ 9, 132, 227 ];
const COLOR_HTTP: ColorType = [ 106, 176, 76 ];
const COLOR_QUERY: ColorType = [ 57, 154, 243 ];

function decorateLabel(bg: ColorType, fg: ColorType, label: string): string {
    if (isTTY) {
        return chalk.bgRgb(...bg).rgb(...fg).bold(` ${label} `);
    }

    return `[${label.slice(0, 4)}]`;
}

function makeLabel({ bg, fg }: { bg: ColorType; fg: ColorType }): (label: string) => string {
    return (label: string): string => decorateLabel(bg, fg, label);
}

export const labels = {
    critical: makeLabel({ bg: COLOR_CRITICAL, fg: COLOR_BLACK }),
    warning: makeLabel({ bg: COLOR_WARNING, fg: COLOR_BLACK }),
    regular: makeLabel({ bg: COLOR_REGULAR, fg: COLOR_WHITE }),
    http: makeLabel({ bg: COLOR_HTTP, fg: COLOR_BLACK }),
    query: makeLabel({ bg: COLOR_QUERY, fg: COLOR_BLACK }),
    loud: makeLabel({ bg: COLOR_BLACK, fg: COLOR_GRAY })
};

const loggingLevels = [
    // Critical levels. (It will crash the process)
    { name: 'fatal', level: 0, label: labels.critical('FATAL') },
    { name: 'error', level: 1, label: labels.critical('ERROR') },

    // Warning levels. (It just report warning information, not crash the process)
    { name: 'warning', level: 2, label: labels.warning('WARNING') },

    // Regular level and aliases.
    { name: 'notice', level: 3, label: labels.regular('NOTICE') },
    { name: 'info', level: 3, label: labels.regular('NOTICE') },

    // Maybe sensitive levels. (In general, does not useful)
    { name: 'http', level: 4, label: labels.http('HTTP') },
    { name: 'query', level: 4, label: labels.query('QUERY') },

    // Loud levels.
    { name: 'verbose', level: 5, label: labels.query('VERBOSE') },
    { name: 'debug', level: 5, label: labels.query('VERBOSE') }
];

for (const [ name, label ] of loggingLevels.map(({ name, label }) => [ name, label ])) {
    loggingLevels[name] = label;
}

export default loggingLevels;
