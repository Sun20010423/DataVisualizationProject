import { getApis } from "./api";
import { Constant } from "../constant";
// import { _decorator, Component, Prefab, ScrollView, Node, log } from "cc";
import { UserData } from "../userData";
import qs from "qs"
import { setErrorMessage } from "../../reducer/settingsSlice";
import { store } from '../../store';
import { Util } from "../util";
import { get } from "lodash";


// -------------------------------------------------
const errHandler = (err: any) => {
    let errMessage;
    if (err.response) {
        const status = err.response?.status
        switch (status) {
            case 404:
                errMessage = "404找不到"
                break;
            case 413:
                errMessage = "413 檔案過大，請分批上傳或調整大小"
                break;
            case 500:
                errMessage = "500 伺服器處理錯誤"
                break;
            default:
                errMessage = err.message
                break;
        }
    }
    else if (!window.navigator.onLine) {
        errMessage = "網路斷線"
    }
    else errMessage = err.message

    console.log(err)
    console.log(err.response)
    console.log(err.message)

    // swlErr(errMessage)
    return Promise.reject(errMessage)
}

/**
 * Http请求管理器
 */
export default class HttpMgr {


    public static async uploadVideo(data: FormData, successCallback: Function, errorCallback: any = null) {
        try {

            // Util.showToast("登录中");

            let params = {}
            const apis = getApis(Constant.API_ROUTE.VIDEO.UPLOAD_VIDEO, params, 'video');
            const responseJson = await this.uploadRequest(
                apis.url,
                apis,
                data,
                errorCallback,
                false,
                // UserData.instance.token
            );

            console.log("responseJson", responseJson);


            if (responseJson && responseJson.success) {


                if (responseJson && responseJson.success) {
                    successCallback && successCallback(responseJson)
                } else {
                    Util.showToast(responseJson.error_msg);
                }
            }

        } catch (error) {

            console.log("getUserInfo error", error);


        }
    }



    public static async getUserInfo(successCallback: Function, errorCallback: any = null) {
        try {

            // Util.showToast("登录中");

            let params = {}
            const apis = getApis(Constant.API_ROUTE.USER.GET_USER_INFO, params, 'user');
            const responseJson = await this.sendRequest(
                apis.url,
                apis,
                params,
                errorCallback,
                false,
                UserData.instance.token
            );


            if (responseJson && responseJson.success) {
                const updateData = ["nickname", "mobile", "IsSave", "lv", "sum_amt", "quota", "Picture_Url", "genealogy", "vip", "guild", "user",
                    "IsOfficial", "BetMoney", "SaveMoney", "VipTime"
                ];

                for (let index = 0; index < updateData.length; index++) {
                    const key = updateData[index];
                    UserData.instance.updatePlayerInfo(key, responseJson[key]);
                }


                Util.setUserPlayerInfo(responseJson);


                // responseJson

                if (responseJson && responseJson.success) {
                    successCallback && successCallback(responseJson)
                } else {
                    Util.showToast(responseJson.error_msg);
                }
            }

        } catch (error) {

            console.log("getUserInfo error", error);


        }
    }

    public static async loginUserWithLine(code: string, UserName: string, PictureUrl: string, successCallback: Function, errorCallback: any = null) {
        let params = { code, UserName, PictureUrl };
        const apis = getApis(Constant.API_ROUTE.OAUTH.LOGIN_WITH_LINE, params, 'oauth');

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            // tokenInfo.accessToken,
            // dispatch,
        );
        try {
            if (responseJson) {
                if (responseJson.success) {
                    const nickname = UserData.instance.liffInfo.displayName;
                    const { user_id, lv, account, auth_token, bd_token } = responseJson;
                    UserData.instance.saveAccount(user_id);
                    UserData.instance.saveToken(auth_token);
                    UserData.instance.createPlayerInfo({
                        account,
                        nickname,
                        user_id,
                        lv,
                        auth_token
                    });
                    successCallback && successCallback(responseJson);
                } else {
                    errorCallback && errorCallback(responseJson);
                    Util.showToast(responseJson.error_msg);
                }
            }
        } catch (error) {
            // checkMiddleError

            Util.showToast("服務器錯誤")
            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }
    }

    public static async transformVideo(video: string, successCallback: any, errorCallback: any) {
        let params = { video };
        const apis = getApis(Constant.API_ROUTE.VIDEO.TRANSFORM_VIDEO, params, 'video');

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            // tokenInfo.accessToken,
            // dispatch,
        );
        try {
            if (responseJson) {
                if (responseJson.success) {
                    successCallback && successCallback(responseJson);
                } else {
                    errorCallback && errorCallback(responseJson);
                    Util.showToast(responseJson.message);
                }
            }
        } catch (error) {
            // checkMiddleError

            Util.showToast("服務器錯誤")
            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }

    }

    public static async classicVideo(video: string, successCallback: any, errorCallback: any) {
        let params = { video };
        const apis = getApis(Constant.API_ROUTE.VIDEO.CLASSIC_VIDEO, params, 'video');

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            // tokenInfo.accessToken,
            // dispatch,
        );
        try {
            if (responseJson) {
                if (responseJson.success) {
                    successCallback && successCallback(responseJson);
                } else {
                    errorCallback && errorCallback(responseJson);
                    Util.showToast(responseJson.message);
                }
            }
        } catch (error) {
            // checkMiddleError

            Util.showToast("服務器錯誤")
            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }
    }


    public static async getRouter(gameCode: string, gameType: string) {
        let params: any = { gameCode, lang: "zh-tw" };
        let router = Constant.API_ROUTE.HALL.JOIN_GAME;
        // let gameid: number = parseInt(gameCode)
        console.log("getRouter", gameCode, gameType);
        if (gameType == Constant.GAME_SITE_TYPE.BTG) {
            params = { gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_BTG;

        } else if (gameType == Constant.GAME_SITE_TYPE.QT) {

            params = { gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_QT;

        } else if (gameType == Constant.GAME_SITE_TYPE.BE) {

            params = { gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_BE;

        } else if (gameType == Constant.GAME_SITE_TYPE.DG) {

            params = { gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_DG;

        } else if (gameType == Constant.GAME_SITE_TYPE.RSG) {
            router = Constant.API_ROUTE.HALL.JOIN_GAME_REG;
            params = { gameid: parseInt(gameCode) };
        } else {
            params = { gameCode: gameCode, lang: "zh-tw" }
            router = Constant.API_ROUTE.HALL.JOIN_GAME_HS;
        }
        const apis = getApis(router, params, 'hall');

        return {
            apis,
            params,
            token: UserData.instance.token

        }
    }

    public static async getGameState(successCallback: Function, errorCallback = null) {



        let router = Constant.API_ROUTE.GAME.GET_GAME_STATE;

        // console.log("router", router, params, gameType, gameCode);
        const params = {}

        // gameType
        const apis = getApis(router, params, 'game');
        // console.log("joinGame--", params);

        console.log("    UserData.instance.token", UserData.instance.token);

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
            // tokenInfo.accessToken,
            // dispatch,
        );
        // console.log("responseJson", responseJson);
        try {

            try {
                // if (responseJson && responseJson.success) {
                //     successCallback && successCallback(responseJson);
                //     // } else {
                // } else {
                //     Util.showToast(responseJson.error_msg);

                // }

                successCallback && successCallback(responseJson);
            } catch (error) {
                // checkMiddleError

                // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
            }
        } catch (error) {
            // checkMiddleError

            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }


    }

    public static async getPCGameState(successCallback: Function, errorCallback = null) {



        let router = Constant.API_ROUTE.GAME.GET_GAME_STATE;

        // console.log("router", router, params, gameType, gameCode);
        const params = {}

        // gameType
        const apis = getApis(router, params, 'game');
        // console.log("joinGame--", params);

        console.log("    UserData.instance.token", UserData.instance.token);

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
            // tokenInfo.accessToken,
            // dispatch,
        );
        // console.log("responseJson", responseJson);
        try {

            try {
                // if (responseJson && responseJson.success) {
                //     successCallback && successCallback(responseJson);
                //     // } else {
                // } else {
                //     Util.showToast(responseJson.error_msg);

                // }

                successCallback && successCallback(responseJson);
            } catch (error) {
                // checkMiddleError

                // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
            }
        } catch (error) {
            // checkMiddleError

            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }


    }

    public static async betPCGame(params: any, successCallback: Function, errorCallback = null) {
        let router = Constant.API_ROUTE.PC.BET_GAME;
        const apis = getApis(router, params, 'pc');
        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
        );
        try {
            successCallback && successCallback(responseJson);
        } catch (error) {
        }
    }

    public static async jiesuanPCGame(params: any, successCallback: Function, errorCallback = null) {
        let router = Constant.API_ROUTE.PC.JIESUAN_GAME;
        const apis = getApis(router, params, 'pc');
        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
        );
        try {
            successCallback && successCallback(responseJson);
        } catch (error) {
        }
    }

    public static async betGame(Data: any, successCallback: Function, errorCallback = null) {



        let router = Constant.API_ROUTE.HALL.BET_GAME;

        // console.log("router", router, params, gameType, gameCode);
        const params = { Data }

        // gameType
        const apis = getApis(router, params, 'hall');
        // console.log("joinGame--", params);

        console.log("    UserData.instance.token", UserData.instance.token);

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
            // tokenInfo.accessToken,
            // dispatch,
        );
        // console.log("responseJson", responseJson);
        try {

            try {
                // if (responseJson && responseJson.success) {
                //     successCallback && successCallback(responseJson);
                //     // } else {
                // } else {
                //     Util.showToast(responseJson.error_msg);

                // }

                successCallback && successCallback(responseJson);
            } catch (error) {
                // checkMiddleError

                // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
            }
        } catch (error) {
            // checkMiddleError

            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }


    }

    public static async joinGame(gameCode: string, gameType: string, successCallback: Function, errorCallback = null) {

        let params: any = { gameCode, lang: "zh-tw" };
        let router = Constant.API_ROUTE.HALL.JOIN_GAME;
        if (gameType == Constant.GAME_SITE_TYPE.BTG) {
            params = { gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_BTG;

        } else if (gameType == Constant.GAME_SITE_TYPE.QT) {

            params = { gameid: parseInt(gameCode), lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_QT;

        } else if (gameType == Constant.GAME_SITE_TYPE.BE) {

            params = { gameid: gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_BE;

        } else if (gameType == Constant.GAME_SITE_TYPE.DG) {

            params = { gameid: gameCode, lang: "zh-tw" };
            router = Constant.API_ROUTE.HALL.JOIN_GAME_DG;

        } else if (gameType == Constant.GAME_SITE_TYPE.RSG) {
            router = Constant.API_ROUTE.HALL.JOIN_GAME_REG;
            params = { gameid: parseInt(gameCode) };
        } else {
            params = { gameCode: gameCode, lang: "zh-tw" }
            router = Constant.API_ROUTE.HALL.JOIN_GAME_HS;
        }

        // console.log("router", router, params, gameType, gameCode);


        // gameType
        const apis = getApis(router, params, 'hall');
        // console.log("joinGame--", params);

        const responseJson = await this.sendRequest(
            apis.url,
            apis,
            params,
            errorCallback,
            false,
            UserData.instance.token
            // tokenInfo.accessToken,
            // dispatch,
        );
        // console.log("responseJson", responseJson);
        try {

            try {
                // if (responseJson && responseJson.success) {
                //     successCallback && successCallback(responseJson);
                //     // } else {
                // } else {
                //     Util.showToast(responseJson.error_msg);

                // }

                successCallback && successCallback(responseJson);
            } catch (error) {
                // checkMiddleError

                // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
            }
        } catch (error) {
            // checkMiddleError

            // !checkMiddleError(responseJson) && errorCallback && errorCallback({ data: {}, message: '服務器錯誤' });
        }


    }

    public static async uploadRequest(url: string, apis: any, data: Object, errorCallback: any = null, debug: boolean = false, token: String = "",) {

        const localStorage = {};
        const deafultHeader = {
            Authorization: token
            // clientVersion,
            // resourceVersion,
            // dataToken: createSecretToken(params),
            // platform: system.isIOS ? 'ios' : 'android',
            // deviceId: deviceId ? base64Encode(deviceId) : '',
        };

        console.log("data", data);

        const options: any = {
            ...apis.options,
            ...{
                body: data
            },
            ...{
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    mode: 'cors',

                    // Accept: 'application/json',
                    // platform: system.isIOS ? 'ios' : 'android',
                    // Authorization: 'Bearer ' + token,
                    // ...deafultHeader,
                },
            },
            ...{
                // credentials: 'include',
                mode: 'cors',
                credentials: 'omit',

            },
            // credentials: true
        };

        // console.log("baseURL", baseURL);





        let responseText = '';
        if (token) {
            try {
                return await fetch(url, options)
                    // .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // if (debug) {
                        //   console.log('[debug:] responseText==', responseText);
                        // }
                        // // responseErrorMessage(JSON.stringify({ responseText }));
                        const responseData = JSON.parse(responseText);

                        // console.log("?", responseData);
                        // const code = get(responseData, 'code', 0);
                        // const message = get(responseData, 'message', 0);
                        // // ErrorCode.USER_NO_USER
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   if (message !== '') {
                        //     responseErrorMessage(message);
                        //   }
                        //   if (dispatch) {
                        //     dispatch({ type: LOGOUT_SUCCESS });
                        //   }

                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }
                        return responseData;
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error, responseText });

                Util.showToast("服務器錯誤");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        } else {
            try {
                return await fetch(url, options)
                    // .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // log("responseText", responseText);
                        // // responseErrorMessage(JSON.stringify({ responseText }));

                        // const responseData = JSON.parse(responseText);
                        // // console.warn(responseData);
                        // const code = get(responseData, 'code', 0);
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   // responseErrorMessage('你的登录异常,请重新登录');
                        //   dispatch({ type: LOGOUT_SUCCESS });
                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }

                        // if (debug) {
                        //   console.log('check debug responseText==', responseText);
                        // }
                        // return {}
                        return JSON.parse(responseText);
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error });
                // responseErrorMessage(JSON.stringify({ responseText }));
                Util.showToast("請檢查自己的網絡");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        }


    }



    public static async sendRequest(url: string, apis: any, params: Object, errorCallback: any = null, debug: boolean = false, token: String = "",) {

        const checkStatus = async (response: any) => {
            const status = get(response, "status", 200);
            if (status >= 200 && status < 300) {
                return response;
            }

            Util.showToast("服務器錯誤");

            const responseText = await response.text();
            const alertButtons = [
                {
                    text: '确定',
                    onPress: () => { },
                    style: 'default',
                },
            ];
            if (debug) {
                // params, url
                let errorMessage = `
                url:\n${url},
                params:\n${JSON.stringify(params)},
                返回错误请求:\n${responseText}
                `;
                // alertButtons.push({
                //     text: '查看错误详情',
                //     onPress: () => {
                //         // Alert.alert('错误详情', errorMessage);
                //     },
                // });
            }
            // Alert.alert('温馨提示', '服务器出点小问题', alertButtons);
            if (debug) {
                // console.log('response.statusText', response.statusText);
                const error = new Error(response.statusText);
                // error.response = response;
                throw error;
            }
        };
        const localStorage = {};
        const deafultHeader = {
            Authorization: token
            // clientVersion,
            // resourceVersion,
            // dataToken: createSecretToken(params),
            // platform: system.isIOS ? 'ios' : 'android',
            // deviceId: deviceId ? base64Encode(deviceId) : '',
        };

        const options: any = {
            ...apis.options,
            ...{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    mode: 'cors',

                    // Accept: 'application/json',
                    // platform: system.isIOS ? 'ios' : 'android',
                    // Authorization: 'Bearer ' + token,
                    ...deafultHeader,
                },
            },
            ...{
                // credentials: 'include',
                mode: 'cors',
                credentials: 'omit',

            },
            // credentials: true
        };

        // console.log("baseURL", baseURL);





        let responseText = '';
        if (token) {
            try {
                return await fetch(url, options)
                    .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // if (debug) {
                        //   console.log('[debug:] responseText==', responseText);
                        // }
                        // // responseErrorMessage(JSON.stringify({ responseText }));
                        const responseData = JSON.parse(responseText);

                        // console.log("?", responseData);
                        // const code = get(responseData, 'code', 0);
                        // const message = get(responseData, 'message', 0);
                        // // ErrorCode.USER_NO_USER
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   if (message !== '') {
                        //     responseErrorMessage(message);
                        //   }
                        //   if (dispatch) {
                        //     dispatch({ type: LOGOUT_SUCCESS });
                        //   }

                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }
                        return responseData;
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error, responseText });

                Util.showToast("服務器錯誤");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        } else {
            try {
                return await fetch(url, options)
                    // .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // log("responseText", responseText);
                        // // responseErrorMessage(JSON.stringify({ responseText }));

                        // const responseData = JSON.parse(responseText);
                        // // console.warn(responseData);
                        // const code = get(responseData, 'code', 0);
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   // responseErrorMessage('你的登录异常,请重新登录');
                        //   dispatch({ type: LOGOUT_SUCCESS });
                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }

                        // if (debug) {
                        //   console.log('check debug responseText==', responseText);
                        // }
                        // return {}
                        return JSON.parse(responseText);
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error });
                // responseErrorMessage(JSON.stringify({ responseText }));
                Util.showToast("請檢查自己的網絡");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        }


    }

    public static async sendRequest2(url: string, apis: Object, params: Object, errorCallback: any = null, debug: boolean = false, token: String = "",) {



        const checkStatus = async (response: any) => {
            const status = get(response, "status", 200);
            if (status >= 200 && status < 300) {
                return response;
            }

            // if(status == 500)

            Util.showToast("服務器錯誤");

            const responseText = await response.text();
            const alertButtons = [
                {
                    text: '确定',
                    onPress: () => { },
                    style: 'default',
                },
            ];
            if (debug) {
                // params, url
                let errorMessage = `
                url:\n${url},
                params:\n${JSON.stringify(params)},
                返回错误请求:\n${responseText}
                `;
                // alertButtons.push({
                //     text: '查看错误详情',
                //     onPress: () => {
                //         // Alert.alert('错误详情', errorMessage);
                //     },
                // });
            }
            // Alert.alert('温馨提示', '服务器出点小问题', alertButtons);
            if (debug) {
                // console.log('response.statusText', response.statusText);
                const error = new Error(response.statusText);
                // error.response = response;
                throw error;
            }
        };
        const localStorage = {};
        const deafultHeader = {
            Authorization: token
            // clientVersion,
            // resourceVersion,
            // dataToken: createSecretToken(params),
            // platform: system.isIOS ? 'ios' : 'android',
            // deviceId: deviceId ? base64Encode(deviceId) : '',
        };

        const options: any = {
            ...apis,
            ...{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    mode: 'cors',

                    // Accept: 'application/json',
                    // platform: system.isIOS ? 'ios' : 'android',
                    // Authorization: 'Bearer ' + token,
                    ...deafultHeader,
                },
            },
            ...{
                // credentials: 'include',
                mode: 'cors',
                credentials: 'omit',

            },
            // credentials: true
        };

        let responseText = '';
        if (token) {
            try {
                return await fetch(url, options)
                    .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // if (debug) {
                        //   console.log('[debug:] responseText==', responseText);
                        // }
                        // // responseErrorMessage(JSON.stringify({ responseText }));
                        const responseData = JSON.parse(responseText);

                        // console.log("?", responseData);
                        // const code = get(responseData, 'code', 0);
                        // const message = get(responseData, 'message', 0);
                        // // ErrorCode.USER_NO_USER
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   if (message !== '') {
                        //     responseErrorMessage(message);
                        //   }
                        //   if (dispatch) {
                        //     dispatch({ type: LOGOUT_SUCCESS });
                        //   }

                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }
                        return responseData;
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error, responseText });

                Util.showToast("服務器錯誤");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        } else {
            try {
                return await fetch(url, options)
                    // .then(checkStatus)
                    .then(async (response) => {
                        // console.log('response', response);
                        responseText = await response.text();
                        // log("responseText", responseText);
                        // // responseErrorMessage(JSON.stringify({ responseText }));

                        // const responseData = JSON.parse(responseText);
                        // // console.warn(responseData);
                        // const code = get(responseData, 'code', 0);
                        // if (code === ErrorCode.USER_JWT_ERROR) {
                        //   // responseErrorMessage('你的登录异常,请重新登录');
                        //   dispatch({ type: LOGOUT_SUCCESS });
                        //   RootNavigation.navigate('LoginoutScreen');
                        //   // throw { errorCode: code, errorMessage: '你的登录异常,请重新登录' };
                        // }

                        // if (debug) {
                        //   console.log('check debug responseText==', responseText);
                        // }
                        // return {}
                        return JSON.parse(responseText);
                    });
            } catch (error) {
                // console.log('----', JSON.stringify(error));
                // console.log('error', { params, url, error });
                // responseErrorMessage(JSON.stringify({ responseText }));
                Util.showToast("請檢查自己的網絡");

                if (debug) {
                    // errorSystemHandler({ params, url, error });
                }

                // errorBack && errorBack({ data: {}, message: '服務器錯誤' });
            }
        }


    }

    /**
     * 前往首页
     */
    public static get() {
        // eazax.log('[Go Home]', '^.^');
        // // 清除当前 URL 的参数
        // BrowserUtil.clearUrlParam();
        // // 跳转
        // SceneNavigator.goHome(null, false, () => {
        //     // 事件
        //     EventManager.emit(SWITCH_CASE, SceneName.Home);
        // });
    }

    /**
     * 前往对应示例
     * @param name 示例名称
     */
    public static post(name: string) {


        // eazax.log('[Go Case]', name);
        // // 展示遮罩
        // CaseLoading.show();
        // // 检查重定向
        // const redirect = RedirectMap[name];
        // if (redirect) {
        //     name = redirect;
        //     eazax.log('[Redirect]', redirect);
        // }
        // // 获取示例信息
        // const info = this.getCaseInfo(name);
        // if (!info) {
        //     Toast.show('啊哦，没有找到这个示例', name);
        //     CaseLoading.hide();
        //     return false;
        // }
        // const sceneName = info.scene;
        // SceneNavigator.go(sceneName, null, () => {
        //     // 设置当前 URL 的参数
        //     BrowserUtil.setUrlParam(`case=${name}`);
        //     // 发射事件
        //     EventManager.emit(SWITCH_CASE, sceneName);
        //     // 隐藏遮罩
        //     CaseLoading.hide();
        // });
        // return true;
    }

    // /**
    //  * 获取示例信息
    //  * @param name 示例名称
    //  */
    // public static getCaseInfo(name: string): CaseInfo {
    //     return CaseInfoMap[name];
    // }

}