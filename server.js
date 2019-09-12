require('dotenv').config();

// Server
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').createServer(app);

const io = require('socket.io').listen(server, { origins: '*:*' });

// Services
const { getData } = require('./services/gAnalytics');

// Config
const port = process.env.SERVER_PORT;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

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

      console.log('Done');
    })
    .catch((err) => {
      res.send({ status: 'Error getting a metric', message: `${err}` });
      console.log('Done');
    });
});

app.get('/api/graph', (req, res) => {
  const { metric } = req.query;
  console.log(`Requested graph of metric: ${metric}`);

  // 1 week time frame
  let promises = [];
  for (let i = 7; i >= 0; i -= 1) {
    promises.push(getData([metric], `${i}daysAgo`, `${i}daysAgo`));
  }
  promises = [].concat(...promises);

  Promise.all(promises)
    .then((data) => {
      // flatten list of objects into one object
      const body = {};
      body[metric] = [];
      Object.values(data).forEach((value) => {
        body[metric].push(value[metric.startsWith('ga:') ? metric : `ga:${metric}`]);
      });
      console.log(body);

      res.send({ data: body });
      console.log('Done');
    })
    .catch((err) => {
      console.log('Error:');
      console.log(err);
      res.send({ status: 'Error', message: `${err}` });
      console.log('Done');
    });
});


io.sockets.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('Received message:');
    console.log(message);
    console.log(Object.keys(io.sockets.connected).length);
    io.sockets.emit('pageview', { connections: Object.keys(io.sockets.connected).length - 2 });
  });
});

server.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
