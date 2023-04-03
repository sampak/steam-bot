import SteamUser from 'steam-user';
import SteamCommunity from 'steamcommunity';
// @ts-ignore
import SteamTradeOfferManager from 'steam-tradeoffer-manager';
import config from './config';
import steam from './utils/steam';

export const steamClient = new SteamUser();
export const steamCommunity = new SteamCommunity();
export const steamManager = new SteamTradeOfferManager({
  steam: steamClient,
  language: 'en'
});


export const initializeSteam = async () => {
  console.log('Initialize service');
  console.log(`connecting to steam account ${config.steam.accountName}...`);
  const authCode = await steam.generateAuthCode(config.steam.sharedSecret);
  console.log("Generated auth code: ", authCode)
  await steam.connect(steamClient, config.steam.accountName, config.steam.password, authCode)
}


steamClient.on('loggedOn', (details, parental) => {
  console.log("Connected to steam account");
  steamClient.setPersona(SteamUser.EPersonaState.Online);
})

// web session
steamClient.on('webSession', function(sessionID, cookies) {
  console.log("Web session ", sessionID)

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

// login error
steamClient.on('error', (error) => {
  console.log("Steam connection error: ", error);
  process.exit(1);
})