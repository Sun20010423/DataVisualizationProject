
import { Constant } from "../constant";

export class GameIconData {
    static _instance: GameIconData;

    public static get instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new GameIconData();
        return this._instance;
    }

    private _gameState: number = 0;
    private _gameState2: number = 0;
    private _gameState4: number = 1;
    private _favType: number = 0;
    private _gameCurrentState: number = 0;
    private _gameCode: string = "";
    private _many: number = 0;
    private _imageUrl: string = "";
    private _gameType: string = "";
    private _gameUrl: string = "";



    public get gameUrl() {
        return this._gameUrl;
    }

    public set gameUrl(v: string) {
        this._gameUrl = v;
    }

    public get imageUrl() {
        return this._imageUrl;
    }

    public set imageUrl(v: string) {
        this._imageUrl = v;
    }

    public get gameState() {
        return this._gameState;
    }

    public set gameState(v: number) {
        this._gameState = v;
    }

    public get gameState4() {
        return this._gameState4;
    }

    public set gameState4(v: number) {
        this._gameState4 = v;
    }


    public get gameState2() {
        return this._gameState2;
    }

    public set gameState2(v: number) {
        this._gameState2 = v;
    }

    public get gameType() {
        return this._gameType;
    }

    public set gameType(v: string) {
        this._gameType = v;
    }

    public get gameCode() {
        return this._gameCode;
    }

    public set gameCode(v: string) {
        this._gameCode = v;
    }

    public get favState() {
        return this._favType;
    }

    public set favState(v: number) {
        this._favType = v;
    }

    public get gameCurrentState() {
        return this._gameCurrentState;
    }

    public set gameCurrentState(v: number) {
        this._gameCurrentState = v;
    }

    public get gameMany() {
        return this._many;
    }

    public set gameMany(v: number) {
        this._many = v;
    }



}
