import { Response } from "express";
import CEconItem from "steamcommunity/classes/CEconItem";
import { steamCommunity, steamManager } from "../../steamClient";
import steam from '../../utils/steam';


export const get = async (response: Response, steamID: string | bigint) => {
  try {
    const inventory: CEconItem[] = await steam.loadInventory(steamCommunity, 730, steamID)
    return inventory
  } catch(e) {
    response.status(400).send("Inventory cannot be load");
    return;
  }
}




steamManager.on('newOffer', (offer: any) =>{
  steam.declineTradeOffer(offer)
})

steamManager.on("sentOfferChanged", (offer: any) => {
  console.log(`Offer #${offer.id} has been changed new offer state: `, offer.state);

  // Trouble with steam offer
  if(offer.state === 4 || offer.state === 7 || offer.state === 8 || offer.state === 10) {
      steam.declineTradeOffer(offer);
    return;
  }

  // Offer has been accepted
  if(offer.state === 3 || offer.state === 11) {

  }
})
