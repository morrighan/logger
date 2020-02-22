// Node.js built-in APIs.
import { stdout } from 'process';

// Third-party modules.
import fromPairs from 'lodash/fromPairs';
import { createLogger, format, transports } from 'winston';

// Local helpers.
import { executionMode, ExecutionMode } from './environments';
import loggingLevels from './levels';
import formatConsole from './format-console';

// Destructuring imports.
const { Console: ConsoleTransport } = transports;

export default createLogger({
    levels: fromPairs(loggingLevels.map(({ name, level }) => [ name, level ])),
    level: executionMode === ExecutionMode.ProductionMode ? 'http' : 'verbose',
    transports: [ new ConsoleTransport({ format: stdout.isTTY ? formatConsole : format.json() }) ]
});

export { default as formatHttp } from './format-http';
export { default as formatSql } from './format-sql';
