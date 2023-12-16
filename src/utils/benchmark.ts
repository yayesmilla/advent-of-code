import * as log from './logger';

let startTime;

function start() {
    const startDate = new Date();
    startTime = startDate.getTime();

    log.blue(`Start: ${startDate.toString()}`);
};

function end() {
    const endDate = new Date();
    const endTime = endDate.getTime();

    log.blue(`End: ${endDate.toString()}`);
    log.green(`Total Execution Time: ${endTime - startTime}ms`);
};

export { start, end };
