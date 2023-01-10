import cron from 'node-cron';

const job = (time, callback) => {
  cron.schedule(time, () => {
    console.log('running a task every minute');
    callback();
  }, { scheduled: true, });
};

const executeDaysAll = (time = '') => {
  cron.schedule('*/3 * * * * *', () => {
    console.log('running a task every 3 seconds');
  });
}

export { job, executeDaysAll };
