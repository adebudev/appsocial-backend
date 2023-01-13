import schedule from 'node-schedule';

const scheduleJob = (date = new Date(2012, 11, 21, 5, 30, 0), callback) => {
  schedule.scheduleJob(date, function () {
    console.log('The world is going to end today.');

    callback();
  });
};

export { scheduleJob };