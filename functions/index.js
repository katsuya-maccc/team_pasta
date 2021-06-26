const functions = require("firebase-functions");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SERCRET;
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

exports.searchSpotify = functions.https.onCall(async (data, context) => {
  try {
    const res = await spotifyApi.clientCredentialsGrant();
    const accessToken = res.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const result = await spotifyApi.searchTracks(data, { limit: 30 });
    console.info(context);
    return result;
  } catch (error) {
    return error;
  }
});

exports.getAudioFeatures = functions.https.onCall(async (data, context) => {
  try {
    const res = await spotifyApi.clientCredentialsGrant();
    const accessToken = res.body["access_token"];
    spotifyApi.setAccessToken(accessToken);
    const result = await spotifyApi.getAudioFeaturesForTrack(data);
    console.info(context);
    return result;
  } catch (error) {
    return error;
  }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
