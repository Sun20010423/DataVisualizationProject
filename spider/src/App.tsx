import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { PCGameScreen } from './pages/hall/game/GameScreen'
import Loading from './components/Loading';
import Popup, { ErrorMessagePopup } from './components/Popup'
import { MessagePopup } from "./components/Popup"
// MessagePopup
// BindMobilePopup
// LevelPopup
import HttpMgr from './framework/util/httpMgr';
import { UserData } from './framework/userData';
import { Constant } from './framework/constant';
import { GameIconData } from './framework/model/GameIconData';
import { GlobalData } from './framework/model/GlobalData';
import useSound from 'use-sound';
import buttonClick from './assets/audio/sound/button.mp3';
import { get, set as objectSet } from 'lodash';
import { useSelector } from 'react-redux';
import { selectMessage, selectSplash, selectSplashGames, selectIsDabi } from './reducer/settingsSlice';

import { Util } from './framework/util';
import userSlice, { selectUserInfo } from './reducer/userSlice';
import "../node_modules/video-react/dist/video-react.css";
import { MobileGameScreen } from './pages/hall/game/MobileGameScreen';

const Hall = () => {

  const errorMessage = useSelector(selectMessage);

  const userPlayerInfo = useSelector(selectUserInfo);
  const [isLoading, setLoading] = useState(true);

  const [currentScreen, setCurentScreen] = useState("game");
  const [currentGame, setCurrentGame] = useState(new GameIconData());
  const [playing, setPlaying] = useState(GlobalData.instance.backgroundMusic);
  const [currentPopup, setCurrentPopup] = useState("");
  const [currentMicroPopup, setMicroCurrentPopup] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isAllLoad, setIsAllLoad] = useState(false);



  const getUserInfo = useCallback(async () => {
    await HttpMgr.getUserInfo(() => {
    });
  }, [])



  const [playButtonVoice] = useSound(buttonClick);

  const playButton = useCallback(() => {
    if (!playing) {
      setPlaying(true);
      // GlobalData.instance.backgroundMusic = true;
      // GlobalData.instance.saveGlobalSetting(Constant.SETTINGS_KEYS.BACKGROUND_MUSIC, true);
    }

    if (GlobalData.instance.backgroundSound) {
      playButtonVoice();
    }
    playButtonVoice();
  }, [playing]);

  useEffect(() => {

    GlobalData.instance.loadGlobalSetting();

    let liffData = localStorage.getItem("liffInfo");
    if (liffData) {
      // liffData = JSON.parse(liffData);
      UserData.instance.liffInfo = JSON.parse(liffData);
    } else {
      UserData.instance.liffInfo = {
        userId: Constant.defaultLineId,
        displayName: "",
        pictureUrl: "",
        statusMessage: ""
      }
    }

    // startLogin();

  }, [])



  const showScreen = (screen: string) => {
    setCurentScreen(screen);
  }

  const showPopup = (popup: string) => {
    setCurrentPopup(popup);
  }

  const userInfo = {
    nickname: UserData.instance.liffInfo.displayName,
    avator: UserData.instance.liffInfo.pictureUrl,
    playerInfo: UserData.instance.playerInfo
  }


  const props = {
    setMessage,
    setMicroCurrentPopup,
    setCurrentPopup,
    setShowMessage,
    playButton,
    userPlayerInfo

  }

  return (<div id="app" className="g-wrap lobby lobby-theme2  ">
    {currentScreen == "hall" && <div>
    </div>}



    {/* {(isLoading || !isAllLoad) && <Loading />} */}



    {currentScreen == "pcgame" && <PCGameScreen gameCode={currentGame} getUserInfo={getUserInfo} onClose={() => {
      playButton();
      setCurentScreen("hall");
      setPlaying(true);
      getUserInfo();
    }} {...props} />}







    {currentScreen == "game" && <MobileGameScreen gameCode={currentGame} getUserInfo={getUserInfo} onClose={() => {
      playButton();
      setCurentScreen("hall");
      setPlaying(true);
      getUserInfo();
    }} {...props} />}




    {showMessage && <MessagePopup message={message} onClose={() => {
      playButton();
      setShowMessage(false);
    }} />}


    {errorMessage && errorMessage.message != "" && <ErrorMessagePopup message={errorMessage} onClose={() => {

      playButton();
      Util.showToast("")
      // setCurrentPopup("");
    }} />}




  </div >);
}


export default Hall;
