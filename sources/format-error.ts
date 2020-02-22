// Node.js built-in APIs.
import path from 'path';
import { version } from 'process';

// Third-party modules.
import chalk from 'chalk';

// Local helpers.
import { labels } from './levels';

// Constants.
const rootPath = path.resolve(__dirname, '../../..');
const conjunction = ` ${chalk.blue('──')} `;

const mapLocationOfErrorThrown = (filename: string): string => {
    let target = path.relative(rootPath, filename);

    if (target.startsWith('node_modules')) {
        target = chalk.gray(target).replace(
            /node_modules[\\/]([^\\/]+)(.*)/,
            (matches, moduleName: string, trailing: string) => `node_modules${path.sep}${chalk.bold.underline(moduleName)}${chalk.gray(trailing)}` // eslint-disable-line max-len
        );
    } else {
        target = `${chalk.gray(path.dirname(target) + path.sep)}${chalk.bold.underline(path.basename(target))}`;
    }

    return target;
};

const formatError = (error: Error): { label: string; payload: string } => {
    const { name, message } = error;
    const { stack: rawStack } = error as { stack: string };

    const stack = rawStack
        .slice(name.length + message.length + 3)
        .split('\n')
        .map(line => line.replace(/^\s+at /g, ''))
        .map(line => (path.isAbsolute(line) ? `<anonymous>${conjunction}${mapLocationOfErrorThrown(line)}` : line))
        .map(line => line.replace(/^(.+) \((.+)\)$/, (matches, contextName: string, rawLocation: string) => {
            let location;

            if (rawLocation === '<anonymous>') {
                location = chalk.gray(rawLocation);
            } else {
                const [ filename, line, column ] = rawLocation.split(':');

                if (path.isAbsolute(filename)) {
                    const target = mapLocationOfErrorThrown(path.relative(rootPath, filename));
                    const trailing = chalk.gray(`:${line}:${column}`);

                    location = target + trailing;
                } else {
                    location = chalk.gray(`https://github.com/${chalk.bold.underline('nodejs')}/node/blob/${version}/lib/${filename}#L${line}`); // eslint-disable-line max-len
                }
            }

            return `${contextName}${conjunction}${location}`;
        }))
        .join('\n');

    const label = labels.critical(name);
    const payload = `${message}\n\n${stack}\n`;

    return { label, payload };
};

export default formatError;
