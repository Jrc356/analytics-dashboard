const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('<p>Hello World</p>');
});

app.listen(3001, () => {
  console.log('Server running at localhost:3001');
});
