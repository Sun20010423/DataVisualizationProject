import { Constant } from "../constant";
import { StorageManager } from "../storageManager";
import { Util } from "../util";

export class PlayerData {

    public serverTime: number = 0;
    public localTime: number = 0;
    private _userId: string = '';
    private _tokenId: string = '';
    private _playerInfo: any = null;
    private _history: any = null;
    private _settings: any = null;
    private _isNewBee: boolean = false;    //默认非新手
    private _dataVersion: string = '';

    public get userId() {
        return this._userId;
    }

    public set userId(v: string) {
        this._userId = v;
    }

    public get token() {
        return this._tokenId;
    }

    public set token(v: string) {
        this._tokenId = v;
    }

    public get settings() {
        return this._settings;
    }

    public set settings(v: any) {
        this._settings = v;
    }

    public get playerInfo() {
        return this._playerInfo;
    }

    public set playerInfo(v: any) {
        this._playerInfo = v;
    }

    public get history() {
        return this._history;
    }

    public get isNewBee() {
        return this._isNewBee;
    }

    public set isNewBee(v: boolean) {
        this._isNewBee = v;
    }
    /**
     * 创建角色数据
     * @param loginData 
     */
    public createPlayerInfo(loginData?: any) {
        this._playerInfo = {};
        if (loginData) {
            for (let key in loginData) {
                this._playerInfo[key] = loginData[key];
            }
        }
    }
    /**
  * 存用户Token数据
  * @param userId 
  */
    public saveToken(token: any) {
        this._tokenId = token;
        StorageManager.instance.setToken(token);
    }

    /**
     * 生成随机账户
     * @returns
     */
    public generateRandomAccount() {
        this.userId = new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
        StorageManager.instance.setUserId(this._userId);
    }

    /**
     * 存用户数据
     * @param userId 
     */
    public saveAccount(userId: any) {
        this._userId = userId;
        StorageManager.instance.setUserId(userId);
    }


}
