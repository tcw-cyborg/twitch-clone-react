import axios from "axios";

const api = axios.create({
  headers: {
    "Client-ID": "h3wjlzyk1lhby2xcjboa0thfgixl4h",
    "Authorization": "Bearer xgd23czltqvlgglvrdlzghe2v3ngdn"
  },
});

/*
CLIENT_ID = h3wjlzyk1lhby2xcjboa0thfgixl4h
REDIRECT = https://localhost:3000/

LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=h3wjlzyk1lhby2xcjboa0thfgixl4h&redirect_uri=https://localhost:3000/&response_type=token
*/

export default api;
