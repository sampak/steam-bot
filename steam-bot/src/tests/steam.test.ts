require('dotenv').config()
import {describe, expect, test} from '@jest/globals';
import SteamCommunity from 'steamcommunity';
// @ts-ignore
import SteamTradeOfferManager from 'steam-tradeoffer-manager';
import SteamUser from 'steam-user';
import config from '../config'
import steam from '../utils/steam'
export const steamClient = new SteamUser();
export const steamCommunity = new SteamCommunity();
export const steamManager = new SteamTradeOfferManager({
  steam: steamClient,
  language: 'en'
});
const delay = ms => new Promise(res => setTimeout(res, ms));
describe('Steam Utils', () => {
  test('Should return auth code', async () => {
    expect(await (await steam.generateAuthCode(config.steam.sharedSecret)).length).toBeGreaterThan(2);
  });

  test('Should autheticate bot', async () => {
    let logged = false;
    const authCode = await steam.generateAuthCode(config.steam.sharedSecret)
    await steam.connect(steamClient, config.steam.accountName, config.steam.password, authCode);
    steamClient.on('loggedOn', () => logged = true)
        // web session
        steamClient.on('webSession', function(sessionID, cookies) {
          steamCommunity.setCookies(cookies);
          steamManager.setCookies(cookies, null, function(error: string) {
    
            // failed to obtain steam api key
            if(error) {
              console.log('\nError: Failed to Obtain Steam API Key\n');
              console.log(error);
              process.exit();
              return;
            }
          });
        });
    await delay(10000);
    expect(logged).toBeTruthy()
  });


  test('Should send trade offer to me', async () => {
    const inventory: any = await steam.loadInventory(steamCommunity, 730, "76561198138709010")
    const response: any = await steam.sendOffer(steamManager, '76561198138709010', [inventory.at(0)], 'test #1');  
    expect(response.success).toBeTruthy()
    steamClient.logOff()
  })


});