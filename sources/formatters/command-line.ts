// Third-party modules.
import chalk from 'chalk';
import moment from 'moment';
import { format } from 'winston';

// Handler implementations.
import handlers from '../handlers';

export default format.printf(data => {
    const timestamp = chalk.gray(moment().toISOString(true));
    const handler = handlers.find(({ name }) => name === data.level);
    const fallback = { label: handler?.label, payload: data.message };
    const performHandle = handler?.default ?? ((): typeof fallback => fallback);

    // Execute handler and then, get decorated payload.
    const { label, payload } = Reflect.apply(performHandle, undefined, [ data ]) ?? fallback;

    return `${label as string} ${timestamp}\n${payload as string}`;
});
