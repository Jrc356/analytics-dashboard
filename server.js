require('dotenv').config();

// Server
const express = require('express');

const app = express();

// Libraries
const { getData } = require('./analytics_library');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Config
const port = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>');
});

app.get('/api', (req, res) => {
  const { metrics, startDate, endDate } = req.query;

  getData(metrics.split(','), startDate, endDate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({ status: 'Error', message: `${err}` });
    });
});

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
