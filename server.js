require('dotenv').config();

// Server
const express = require('express');

const app = express();

// Services
const { getData } = require('./services/gAnalytics');

// Config
const port = process.env.SERVER_PORT;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>');
});

app.get('/api', (req, res) => {
  const { metrics, startDate, endDate } = req.query;
  console.log(`Requested metrics: ${metrics}`);
  console.log(`Requested start-date: ${startDate}`);
  console.log(`Requested end-date: ${endDate}`);

  Promise.all(getData(metrics ? metrics.split(',') : metrics, startDate, endDate))
    .then((data) => {
      // flatten list of objects into one object
      const body = {};
      Object.values(data).forEach((value) => {
        Object.keys(value).forEach((key) => {
          body[key] = value[key];
        });
      });

      res.send({ data: body });
    })
    .catch((err) => {
      res.send({ status: 'Error getting a metric', message: `${err}` });
    });
});

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
