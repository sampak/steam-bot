import express from 'express';
import './services/steam/inventory'
import { initializeSteam } from './steamClient';
import routes from './routes';
require('dotenv').config()

const app = express();

const server = async () => {
  app.use('/v1', routes);

  app.listen(process.env.port, () => {
    console.log(`Server app listening on port ${process.env.port}`)
  })
}

const main = async () => {
  server();
  initializeSteam()
}

main();

