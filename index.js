require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/index');
const multer = require('multer');

const routes = require('./routes');
app.use(express.json());
app.use(cors());

const checkConnection = async () => {
  try {
    await db.sequelize.authenticate();
    db.sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

app.use('/backend', routes);
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
  checkConnection();
});
