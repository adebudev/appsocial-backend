import { executeDaysAll } from '../helpers/jobs.js';
import { scheduleJob } from '../helpers/schedule-job.js';

export const run = () => {
    // executeDaysAll();
    const date = new Date('2023-03-25T15:59:40.386Z');
    console.log(date);
    console.log(date.toString());
    const task = () => {
        console.log('CALLBACK 38');
    }
    scheduleJob(date, task);
}