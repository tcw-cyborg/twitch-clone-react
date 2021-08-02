import React, { useState, useEffect } from "react";
import api from "../../api";
import { useLocation } from "react-router-dom";
// useLocation permet de recuperer un state venant d'un autre fichier (exemple: state provenant de Games.js)

function GameStreams() {
  let location = useLocation();
  // console.log(location);

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
      // console.log(result);

      let dataArray = result.data.data;
      let finalArray = dataArray.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace("{width}", "320")
          .replace("{height}", "180");
          stream.thumbnail_url = newUrl;
        return stream;
      });

      // calcul du total des viewers
      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      let baseUrl = "https://api.twitch.tv/helix/users?";
      let queryParamsUsers = "";

      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      let finalUrl = baseUrl + queryParamsUsers;

      let getUsersLogin = await api.get(finalUrl);

      let userLoginArray = getUsersLogin.data.data;

      finalArray = dataArray.map((stream) => {
        stream.login = "";
        userLoginArray.forEach((login) => {
          if (stream.user_id === login.id) {
            stream.login = login.login;
          }
        })
        return stream;
      })
      setViewers(totalViewers);
      setStreamData(finalArray);
    };

    fetchData();
  }, [location.state.gameID]);
  console.log(viewers);
  console.log(streamData);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Je suis GameStreams</h1>
    </div>
  );
}

export default GameStreams;
