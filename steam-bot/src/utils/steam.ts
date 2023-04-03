import SteamTOTP from 'steam-totp';
import SteamCommunity from 'steamcommunity';
import CEconItem from 'steamcommunity/classes/CEconItem';
import steamid from "steamid";

const generateAuthCode = async (sharedSecret: string) => {
  return await SteamTOTP.getAuthCode(sharedSecret)
}

const connect = async (steamClient: any, login: string, password: string, authCode: string) => {
  try {
    await steamClient.logOn({
      accountName: login,
      password: password,
      twoFactorCode: authCode
    });
    return true;
  } catch(e) {
    console.log(e)
    return false;
  }
}

const loadInventory = async (steamCommunity: any, appId: SteamCommunity.appid, steamId: string | bigint): Promise<CEconItem[]> => {
  return new Promise((resolve, reject) => {
    var steamid3 = (new steamid(steamId)).steam3();
    steamCommunity.getUserInventoryContents(steamid3, appId, 2, true, (err: any, inventory: CEconItem[]) => {
      if(err) {
        return reject(`Cannot get inventory ${steamId}`);
      }
      return resolve(inventory);
    })
  })
}

const sendOffer = (steamManager: any, steamId: string | bigint, items: CEconItem[], message: string) => {
  return new Promise((resolve, reject) => {
    try {
      const offer = steamManager.createOffer(steamId);
      offer.addTheirItems(items);
      offer.setMessage(message);

      offer.send((err: any, status: string) => {
        if(err) {
          console.log(err)
          return reject('Cannot send trade offer');
        }

        return resolve({offer, status, success: true})
      })

    } catch (e) {
      console.log("sendOffer ", e)
      return reject('Cannot send trade offer');
    }
  })
}

const declineTradeOffer = (offer: any) => {
  offer.decline(function(error: string) {
    // failed to decline the trade offer
    if(error) {
      console.log(`\nError: Failed to decline the trade offer #${offer.id}\n`);
      console.log(error);
      return false;
    }
      console.log(`StatusMsg : The trade offer #${offer.id} is declined`);
      return true;
  });
}

export default {
  connect,
  generateAuthCode, 
  declineTradeOffer,
  loadInventory,
  sendOffer
}
