import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { Constant } from '../framework/constant';
import moment from 'moment';


// import * as RootNavigation from 'helpers/NavigationHelper';
// import { checkServerSupport } from 'helpers/ServerHelper';
// import { extractDomain } from 'src/helpers/settingsHelper';

const settingAdapter = createEntityAdapter();
export const actions = {

};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingAdapter.getInitialState({
    baseUrl: '',
    installationUrl: null,
    isLocaleSet: false,
    isSettingUrl: false,
    isUpdating: false,
    isUrlSet: false,
    localeValue: 'en',
    notification: {},
    isSplashGame: false,
    isDabiGame: { show: false, open: true, game: null },
    splashGames: [],
    webSocketUrl: null,
    errorMessage: { message: "", canClose: true, success: false }
  }),
  reducers: {
    resetSettings: state => {
      state.isSettingUrl = false;
      state.isUpdating = false;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    ignoreSplashGame: (state, action) => {
      state.isSplashGame = true;
    },

    resetDabiGameData: (state, action) => {
      // state.isSplashGame = true;
      console.log("action", action);
      const options = { ...state.isDabiGame, ...action.payload };
      if (action.payload.today) {
        const expireDate = moment(new Date()).add(1, 'day').startOf('day').unix();
        localStorage.setItem(Constant.LOCAL_CACHE.DabiGame, expireDate);
        options.open = false;
      }
      state.isDabiGame = options
    },


    setSplashGames: (state, action) => {

      state.splashGames = action.payload.games;

    },

    setSplashGame: (state, action) => {
      state.isSplashGame = true;
      if (action.payload.today) {
        const expireDate = moment(new Date()).add(1, 'day').startOf('day').unix();
        localStorage.setItem(Constant.LOCAL_CACHE.SPLASH, expireDate);
      }
    },

    setLocale: (state, action) => {
      state.localeValue = action.payload;
      state.isLocaleSet = true;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(actions.setInstallationUrl.pending, state => {
  //       state.isSettingUrl = true;
  //     })
  //     .addCase(actions.setInstallationUrl.fulfilled, (state, action) => {
  //       state.isSettingUrl = false;
  //       state.isUrlSet = true;
  //       state.installationUrl = action.payload.installationUrl;
  //       state.baseUrl = action.payload.baseUrl;
  //       state.webSocketUrl = action.payload.webSocketUrl;
  //     })
  //     .addCase(actions.setInstallationUrl.rejected, state => {
  //       state.isSettingUrl = false;
  //       state.isUrlSet = false;
  //       state.installationUrl = null;
  //       state.baseUrl = '';
  //     })
  //     .addCase(actions.getNotificationSettings.fulfilled, (state, action) => {
  //       state.notification = action.payload;
  //     })
  //     .addCase(actions.updateNotificationSettings.pending, (state, action) => {
  //       state.isUpdating = false;
  //     })
  //     .addCase(actions.updateNotificationSettings.fulfilled, (state, action) => {
  //       state.notification = action.payload;
  //     })
  //     .addCase(actions.updateNotificationSettings.rejected, (state, action) => {
  //       state.isUpdating = false;
  //     });
  // },
});

export const { resetSettings, setLocale, setErrorMessage, setSplashGame, ignoreSplashGame, setSplashGames, resetDabiGameData } = settingsSlice.actions;

export const selectUrlSet = state => state.settings.isUrlSet;

export const selectInstallationUrl = state => state.settings.installationUrl;

export const selectBaseUrl = state => state.settings.baseUrl;

export const selectWebSocketUrl = state => state.settings.webSocketUrl;

export const selectNotificationSettings = state => state.settings.notification;

export const selectLocale = state => state.settings.localeValue;

export const selectLocaleSet = state => state.settings.isLocaleSet;

export const selectIsSettingUrl = state => state.settings.isSettingUrl;

export const selectIsUpdating = state => state.settings.isUpdating;

export const selectMessage = state => state.settings.errorMessage;

export const selectSplash = state => state.settings.isSplashGame;
export const selectIsDabi = state => state.settings.isDabiGame;
export const selectSplashGames = state => state.settings.splashGames;

export default settingsSlice.reducer;
