// Node.js built-in APIs.
import { stdout } from 'process';
import { inspect } from 'util';

// Third-party modules.
import chalk from 'chalk';
import moment from 'moment';
import { format } from 'winston';

// Local helpers.
import formatSql from './format-sql';
import formatError from './format-error';
import loggingLevels from './levels';

// Constants.
const splatSymbol: unique symbol = Symbol.for('splat');

function formatConsole({ level: levelString, message, [splatSymbol]: metadata = [] }): string {
    const timestamp = chalk.gray(moment().toISOString(true));
    const [ maybeError ] = metadata as (Error | void)[];
    const levelInformation = loggingLevels.find(({ name }) => name === levelString) as typeof loggingLevels[number];
    let { label } = levelInformation;
    const { level } = levelInformation;
    let payload: string;

    if (maybeError instanceof Error) {
        ({ label, payload } = formatError(maybeError));
    } else if (typeof message === 'string') {
        if (levelString === 'sql' || levelString === 'query') {
            payload = formatSql(message);
        } else {
            payload = level === 5 ? chalk.rgb(192, 192, 192)(message) : message;
        }
    } else {
        payload = inspect(message, { colors: true, breakLength: stdout.columns });
    }

    return `${label} ${timestamp}\n${payload}`;
}

export default format.printf(formatConsole);
