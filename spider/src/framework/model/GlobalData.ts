
import { Constant } from "../constant";
import { GameIconData } from "./GameIconData";

export class GlobalData {
    static _instance: GlobalData;

    public static LOCAL_CACHE = {
        PLAYER: 'player',               //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
        SETTINGS: 'settings',           //设置相关，所有杂项都丢里面进去
        DATA_VERSION: 'dataVersion',    //数据版本
        ACCOUNT: 'account',                 //玩家账号
        HISTORY: "history",                   //关卡通关数据
        BAG: "bag",                         //玩家背包，即道具列表，字典类型
    }

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new GlobalData();
        return this._instance;
    }


    private _games: Array<GameIconData> = [];
    private _splashGames: Array<GameIconData> = [];
    private _isLoadBg: boolean = false;
    private _backgroundMusic: boolean = false;
    private _backgroundSound: boolean = false;
    private _roomSound: boolean = false;
    private _notice: boolean = false;
    private _priveteNotice: boolean = false;

    public get splashGames() {
        return this._splashGames;
    }

    public set splashGames(v: Array<GameIconData>) {
        this._splashGames = v;
    }

    public addSplashGame(gameIconData: GameIconData): void {
        this._splashGames.push(gameIconData);
    }


    // private 

    public get backgroundMusic() {
        return this._backgroundMusic;
    }

    public set backgroundMusic(v: boolean) {
        this._backgroundMusic = v;
    }

    public get backgroundSound() {
        return this._backgroundSound;
    }

    public set backgroundSound(v: boolean) {
        this._backgroundSound = v;
    }

    // _roomSound
    public get roomSound() {
        return this._roomSound;
    }

    public set roomSound(v: boolean) {
        this._roomSound = v;
    }

    public get notice() {
        return this._notice;
    }

    public set notice(v: boolean) {
        this._notice = v;
    }

    public get privateNotice() {
        return this._priveteNotice;
    }

    public set privateNotice(v: boolean) {
        this._priveteNotice = v;
    }

    public loadGlobalSetting(): void {
        let content = localStorage.getItem(Constant.LOCAL_CACHE.SETTINGS);
        if (content && content.length > 0) {
            const globalData = JSON.parse(content);
            this._backgroundMusic = globalData[Constant.SETTINGS_KEYS.BACKGROUND_MUSIC];
            this._backgroundSound = globalData[Constant.SETTINGS_KEYS.BACKGROUND_SOUND];
            this._roomSound = globalData[Constant.SETTINGS_KEYS.ROOM_SOUND];
            this._notice = globalData[Constant.SETTINGS_KEYS.NOTICE];
            this._priveteNotice = globalData[Constant.SETTINGS_KEYS.PRIVATE_NOTICE];
        }
    }

    public saveGlobalSetting(key: string, value: any): void {

        if (key == Constant.SETTINGS_KEYS.BACKGROUND_MUSIC) {
            this._backgroundMusic = value;
        }

        if (key == Constant.SETTINGS_KEYS.BACKGROUND_SOUND) {
            this._backgroundSound = value;
        }

        if (key == Constant.SETTINGS_KEYS.ROOM_SOUND) {
            this._roomSound = value;
        }

        if (key == Constant.SETTINGS_KEYS.NOTICE) {
            this._notice = value;
        }

        if (key == Constant.SETTINGS_KEYS.PRIVATE_NOTICE) {
            this._priveteNotice = value;
        }

        localStorage.setItem(Constant.LOCAL_CACHE.SETTINGS, JSON.stringify({
            backgroundMusic: this._backgroundMusic,
            backgroundSound: this._backgroundSound,
            roomSound: this._roomSound,
            notice: this._notice,
            priveteNotice: this._priveteNotice,
        }));

    }


    public get games() {
        return this._games;
    }

    public set games(v: Array<GameIconData>) {
        this._games = v;
    }

    public get isPlayBg() {
        return this._isLoadBg;
    }

    public set isPlayBg(v: boolean) {
        this._isLoadBg = v;
    }


}
