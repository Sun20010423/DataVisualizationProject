import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { Constant } from '../framework/constant';
import moment from 'moment';


// import * as RootNavigation from 'helpers/NavigationHelper';
// import { checkServerSupport } from 'helpers/ServerHelper';
// import { extractDomain } from 'src/helpers/settingsHelper';

const userAdapter = createEntityAdapter();
export const actions = {
  // setInstallationUrl: createAsyncThunk(
  //   'settings/setInstallationUrl',
  //   async ({ url }, { rejectWithValue }) => {
  //     try {
  //       const installationUrl = extractDomain({ url });
  //       const INSTALLATION_URL = `${URL_TYPE}${installationUrl}/`;
  //       const WEB_SOCKET_URL = `wss://${url}/cable`;
  //       await axios.get(`${INSTALLATION_URL}api`);
  //       RootNavigation.navigate('Login');
  //       return {
  //         installationUrl: INSTALLATION_URL,
  //         webSocketUrl: WEB_SOCKET_URL,
  //         baseUrl: installationUrl,
  //       };
  //     } catch (error) {
  //       showToast({ message: I18n.t('CONFIGURE_URL.ERROR') });
  //       return rejectWithValue();
  //     }
  //   },
  // ),
  // getNotificationSettings: createAsyncThunk('settings/getNotificationSettings', async () => {
  //   const response = await APIHelper.get('notification_settings');
  //   const { data } = response;
  //   return data;
  // }),
  // updateNotificationSettings: createAsyncThunk(
  //   'settings/updateNotificationSettings',
  //   async preferences => {
  //     const response = await APIHelper.put('notification_settings', preferences);
  //     const { data } = response;
  //     return data;
  //   },
  // ),
  // checkInstallationVersion: createAsyncThunk(
  //   'settings/checkInstallationVersion',
  //   async ({ user, installationUrl }) => {
  //     if (user && user.accounts.length) {
  //       const { accounts, account_id: accountId } = user;
  //       const [currentAccount] = accounts.filter(account => account.id === accountId);
  //       const { role: userRole } = currentAccount;
  //       const result = await axios.get(`${installationUrl}api`);
  //       const { version: installedVersion } = result.data;
  //       checkServerSupport({ installedVersion, userRole });
  //     }
  //   },
  // ),
};

export const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState({
    // baseUrl: '',
    userInfo: {}
  }),
  reducers: {

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }

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

export const { setUserInfo } = userSlice.actions;


export const selectUserInfo = state => state.users.userInfo;

export default userSlice.reducer;
