// Node.js built-in APIs.
import { STATUS_CODES, IncomingMessage, ServerResponse } from 'http';

// Third-party modules.
import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';
import prettyMs from 'pretty-ms';

// Type definitions.
interface Tokens {
    [tokenName: string]: (request: IncomingMessage, response: ServerResponse, ...args: any[]) => string;
}

function getColorForStatusCode(statusCode: number): string {
    switch (Math.floor(statusCode / 100)) {
    case 2: return 'green';
    case 3: return 'orange';
    case 4:
    case 5: return 'red';
    default: return 'default';
    }
}

const formatHttp = (tokens: Tokens, ...args: [IncomingMessage, ServerResponse]): string => {
    const _ = (token: string, ...subArgs): string => tokens[token](args[0], args[1], ...subArgs);

    const [ httpVersion, statusCode, URL, contentLength ] = [
        chalk.rgb(98, 177, 255)(`HTTP/${_('http-version')}`),
        Number(_('status')),
        chalk.bold(_('url')),
        Number(_('res', 'content-length') || -1)
    ];

    const colorizeStatusCode = chalk[getColorForStatusCode(statusCode)] as typeof chalk;
    const statusMessage = colorizeStatusCode(`${statusCode} ${STATUS_CODES[statusCode]}`);
    const metadata = chalk.gray(`(${[ `${contentLength >= 0 ? prettyBytes(contentLength) : '? B'}`, prettyMs(Number(_('response-time')) || -1) ].join(', ')})`); // eslint-disable-line max-len

    return `→ ${_('method')} ${URL} ${httpVersion}\n← ${httpVersion} ${statusMessage} ${metadata}`;
};

export default formatHttp;
