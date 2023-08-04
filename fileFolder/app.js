const express = require('express');
require('dotenv').config();
const mongodbStart = require('./db');
const fileRouter = require('./routers/file-router');

const app = express();
app.use(express.json());

mongodbStart();

const PORT = process.env.PORT || 3001;

app.use('/', fileRouter);

app.get('/', (request, response) => {
  response.json({ message: 'sampel message' });
});

app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
});
