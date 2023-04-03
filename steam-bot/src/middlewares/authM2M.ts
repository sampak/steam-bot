import express from "express";
import config from "../config";

const router = express.Router()

router.use((request, response, next) => {
  const key = request.headers.authorization?.replace('Bearer ', '');
  if(key !== config.apikey) {
    response.status(401)
    response.send("Key is not valid");
    return;
  }
  next()
})

export default router