import express from 'express';
import { steamCommunity } from '../steamClient';
import steam from '../utils/steam';
import { get } from '../services/steam/inventory';

const router = express.Router();

router.get('/:steamID', async (request, response) => {
  const steamID = request.params.steamID;
  response.send(await get(response, steamID))
})


export default router;