import cron from 'node-cron';

const job = () => {
  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });
};

export { job };
