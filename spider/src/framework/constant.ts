// import { Enum } from "cc";
export class Constant {
    public static GAME_NAME = 'Coin';
    public static GAME_VERSION = '1.0.1';
    public static GAME_FRAME = 60;      //游戏当前帧率
    public static GAME_INIT_FRAME = 60; //游戏开发基础帧率
    public static LINE_SETTING: {
        url: "https://lin.ee/bfTaQZV"
    }

    //本地缓存key值
    public static LOCAL_CACHE = {
        PLAYER: 'player',               //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
        SETTINGS: 'settings',           //设置相关，所有杂项都丢里面进去
        DATA_VERSION: 'dataVersion',    //数据版本
        ACCOUNT: 'account',                 //玩家账号
        // TMP_DATA: 'tmpData',             //临时数据，不会存储到云盘
        HISTORY: "history",                   //关卡通关数据
        BAG: "bag",                         //玩家背包，即道具列表，字典类型
        SPLASH: "splash",
        DabiGame: "dabi_game"
    }


    //     呂布  rsg   gameid  121
    // 阿星 BT   gameid  AB1512
    // 麻將發了rsg   gameid  117
    public static SPLASH_GAMES = [
        "121", "AB1512", "117"
    ];


    // this._backgroundMusic = globalData["backgroundMusic"];
    // this._backgroundSound = globalData["backgroundSound"];
    // this._roomSound = globalData["roomSound"];
    // this._notice = globalData["notice"];
    // this._priveteNotice = globalData["priveteNotice"];
    public static SETTINGS_KEYS = {
        BACKGROUND_MUSIC: "backgroundMusic",
        BACKGROUND_SOUND: "backgroundSound",
        ROOM_SOUND: "roomSound",
        NOTICE: "notice",
        PRIVATE_NOTICE: "priveteNotice"
    }

    static PTM_RATIO = 1;

    static GAME_OBJ_TYPE = { // 二进制位
        PLAYER: 1,
        COIN: 2
    };

    static ACTION = {
        MOVE: 1,
        STOP_MOVE: 2,//停止移动但是不转向敌人
        GAME_START: 3,
        GAME_OVER: 4,
        READY: 5,
        HEART_BEAT: 6,
        UPDATE_POS: 8,
        VIBRATE: 9,
        RUN: 13,
        IDLE: 14,
        IS_ATTACK_ED: 12,//被攻击
        HIT: 7,
        ICON: 15,
        HAMMER: 16,
        CREATE_HAMMER: 17,
        CREATE_ICON: 18,
    }

    static NETWORK_STATUS = {
        COMMON_OFFLINE: 0,
        COMMON_ONLINE: 1,
        RELAY_OFFLINE: 2,
        RELAY_ONLINE: 3,
    }

    static FRAME_SYNC_STATE = {
        STOP: 0,
        START: 1
    }

    static COIN_TYPE = {
        COIN: 1,
        PROP: 2
    };

    static ADD_SIZE_PER_COIN = 0.03;   //每1个金币 体积增加 5%
    static MIN_SPEED_PERCENT = 0.2;     //最低速度降低百分比

    static INIT_MOVE_SPEED = 20;    //初始移动速度

    static GAME_TIME = 60;      //游戏时间60 * 4秒

    static MIN_PLAYER = 2;//玩家最少人数
    static MAX_PLAYER = 2;//玩家最多人数


    static GAME_ICON_STATE = {
        DEFAULT: 0,
        TUI: 1,
        NEW: 2,
        HOT: 3,
        HOT2: 4,
    }

    static GAME_ICON_FAV_STATE = {
        DEFAULT: -1,
        LOVE: 1,
        UNLOVE: 0,
    }

    static GAME_ICON_CURRENT_STATE = {
        DEFAULT: 0,
        FIXED: 1,
        NEW: 2,
    }

    static EVENT_NAME = {
        ON_GET_ROOM_INFO: 'onGetRoomInfo', //获取到房间信息
        ON_RECV_SYNC: 'onRecvSync', //帧同步数据
        ON_GAME_READY: 'onGameReady',    //游戏准备开始
        ON_GAME_START: 'onGameStart',    //开始游戏
        ON_GAME_321: 'onGame321',    //开始游戏
        ON_GAME_END: 'onGameEnd',    //结束游戏
        ON_SHOW_COIN_TIPS: "showCoinTips", //显示金币提示
        ON_OTHER_JOIN_ROOM: 'onOtherJoinRoom', //加入房间

        SEND_MSG: 'sendMsg', //收到消息
        SEND_MSG_HEIGHT: 'sendMsgHeight', //收到消息
        SEND_VT: 'sendVt', //收到消息

        OPEN_MEDIA: 'openMedia', //收到消息
        OPEN_CHANNEL: 'openChannel', //收到消息
        IS_TOUCH: 'is_touch', // 触摸 
        GAME_INIT: 'game_init',

        INIT_MEDIA: 'init_media', // 语音准备
        INIT_CHANNEL: 'init_channel', // channel准备
        CREATE_HAMMER: 'create_hammer', // channel准备
        CREATE_COIN: 'create_coin', // channel准备
        DIS_JOIN: 'dis_join', // channel准备


        OPEN_PGS: 'openPgs', // 开启社区

        HUAWEI_LOGIN_MSG: 'huawei_login_msg', // 华为初始化
    }

    static PANEL_NAME = {
        READY: 'fight/ready',      //准备界面 
        GAME_OVER: 'fight/gameOver',//结算界面 
        FIGHT_UI: 'fight/fightUI', //结算界面 
        READY_GO: 'fight/readyGo', //结算界面 
        START_GAME: 'fight/startPanel', //开始游戏 
        SELECT_GAME: 'fight/selectPanel', //选择界面 
        TIP_PANEL: 'fight/tipPanel', //离开界面 
        JOIN_ROOM_PANEL: 'fight/joinRoomPanel', //加入房间 
        MATCH_PANEL: 'fight/matchPanel', //匹配界面 
        TRANSITION: 'fight/transitionPanel', // 过度界面
        TRANSITION_BG: 'fight/transitionBgPanel', // 过度界面
        MESSAGE_PANEL: 'fight/messagePanel', // 消息面板
        DOWNOFF_PANEL: 'fight/downOffPanel', // 断线
        MEDIA_PANEL: 'fight/mediaPanel', // 对话
    }

    static SCENE_NAME = {
        FIGHT: "fight",
        START: "start",
        SLECT: "select"
    }

    static AUDIO_NAME = {
        BACKGROUND: 'background',      //背景音乐 
        WIN: 'win', //胜利音效 
        GO: 'go',   //游戏开始音效
        TICK: 'tick',    //倒计时音效
        TIME_OUT: 'timeout', //时间到音效
        GOLD: 'gold',//金币音效
        HIT: 'hit',                     //击中音效
        BUTTON: 'button',                     //击中音效
    }

    static EFFECT_NAME = {
        RUNNING: 'running',                     //跑步特效
        WIN: "leaveWinAni",
        TRANSITION: "transition07",     //过场动画
    }

    //道具类型
    static PROP_TYPE = {
        TO_SELF: "toSelf",//对己
        TO_ENEMY: "toEnemy",//对敌人
    }

    //玩家动画类型
    static ANI_TYPE = {
        IDLE: 'idle',//普通待机
        RUN: 'run',//空手跑
        RUN_1: 'run1',//拿着锤子跑
        VICTORY: "victory",//胜利
        LOSE: "lose",//失败，哭泣，播放一次后播放lose1循环
        LOSE_1: "lose1",//失败，哭泣循环
        ATTACK: 'attack',//锤子攻击
        HIT: "hit",//被击中，先播放一次，再播放dizzy循环
        DIZZY: 'dizzy',//被击中眩晕
    }

    public static EASY_TOUCH = {
        TOUCH_LEFT_X: 'touchLeftX', // 左手 x
        TOUCH_LEFT_Y: 'touchLeftY', // 左右 y
        TOUCH_RIGHT_X: 'touchRightX', // 右手 x
        TOUCH_RIGHT_Y: 'touchRightY', // 右手 y
    }

    static PROP_DISAPPEAR_TIME = 10;//道具10秒后回收

    static READY_PREFAB = {
        GIRL_MODEL: "fight/girlUI",       //ui上显示的女生模型
        BOY_MODEL: "fight/boyUI",          //ui上显示的男生模型
        JOIN_EFFECT: "joinEff",          //加入房间特效
        VS_EFFECT: "vsAni",             //开始特效
    }

    static ROOM_TIPS = {
        CREATE: "创建房间。。。",
        WAITING: "请稍等，房主正在创建房间。。。",
        LEAVE: "您的对手已经离开房间。。。",
        IN_ROOM: "已在房间内。。。",
        CREATE_ROOM_ERROR: "创建房间失败",
        JOIN_ROOM_ERROR: "加入房间失败",
        NO_ROOM_ID: "请输入正确的房间号",
        LEAVE_ROOM_ERROR: "离开房间出错",
        LEAVE_ROOM_MSG: "确认退出房间？",
        LEAVE_ROOM_SUCCESS: "成功离开房间",
        JOIN_ROOM_SUCCESS: "成功加入房间",
        MATCH_ROOM_ERROR: "匹配房间出错",
        PLAYER_LENGHT_ERROR: "长度需要大于2",
        LEAVE_GAME: "是否退出游戏？",
        INPUT_MSG: "请输入文字",
        VT_ERROR: "未识别到语音",
        PLAYER_LEAVE_1: "队友离开队伍，",
        PLAYER_LEAVE_2: "秒游戏结束",
        INIT_FAIL: "登录失败",
        MEDIA_FAIL: "语音权限不足，语音未开启",
        WORLD_LABEL: "世界频道",
        ROOM_LABEL: "房间号:",
        LOGIN_GAME_ERROR: "进入场景异常，请重试",
        HUA_WEI_LOAGIN_ERROR: "华为登录失败，请改用普通账号登录"
    }

    static PLAYER_ORIGIN_SCALE = 1.5;//玩家初始缩放大小

    static WORLD_ID = "cocosworldid00000"

    static DIZZY_TIME = 1;   //被榴莲击中后眩晕时间
    static HAMMER_TIME = 15;   //锤子生成时间，每隔15秒

    static AUTO_GEN_COIN = {  //自动生成金币相关
        SECOND_PER_TIMES: 1,    //每多少秒触发一次
        COIN_PER_TIMES: 1,      //每次生成几个金币
        START_NUM: 10,          //金币数量小于指定个数，开始自动生成
        END_NUM: 20             //金币数量大于指定个数，停止生成
    }

    static REVIVE_TIME = 0.5;   //复活时间
    static INIT_COLLIDER_CIRCLE = 0.8; //初始的人物碰撞矩形框
    static HAMMER_TIMES = 1;    //锤子可用次数

    static AI_PLAYER_ID = "ai00000";

    static AI_PLAYER = 1;

    static HAMMER_POS: number[][] = [
        [0, 0, 0],
        [-28, 0, -25],
        [28, 0, -25],
        [23, 0, 23],
        [-28, 0, 23]
    ];

    static AI_SPEED: number = 0.22;

    static AI_POS_INDEX: number[][] = [
        [1, 26, 27, 19], // 初始化
        [2, 26, 19], // Cube-001
        [1, 3, 22], // Cube-002
        [2, 4, 23], // 3
        [3, 24, 5], // 4.......
        [6, 25, 4], // 5
        [5, 7, 20], //6 ..........
        [25, 8, 23, 6], // 7
        [10, 11, 18, 17], // 8
        [23, 22], // 9
        [13, 11, 18, 9], // 10
        [10, 17, 12, 28], // 11
        [11, 16, 13], // 12
        [10, 12, 15], // 13
        [13, 15, 16, 12], // 14
        [18, 16, 28, 9], // 15
        [15, 17, 28, 9], // 16
        [18, 16, 28, 9], // 17
        [15, 17, 28, 9], // 18
        [1, 27, 20], // 19
        [6, 21, 19], // 20
        [7, 14, 22, 20], // 21
        [23, 2, 14, 21, 2], // 22
        [7, 8, 22, 3, 4], // 23
        [25, 23], // 24
        [7, 24], // 25 ..............
        [27, 19, 22], // 26
        [21, 26, 19], // 27
        [7, 21], // 28
    ];

    static HUAWEI_LOGIN = {
        SIGN_IN_SUCCESS: 0, // 账号登录成功
        INIT_SUCCESS: 10000, // 初始化成功
        INIT_UNDER_AGE: 10001, // 未成年人登录
        INIT_ERROR: 10002, // 初始化报错
        SIGN_IN_ERROR: 10003, // 登录报错
        NO_HUAWEI: 10004 // 非华为手机
    }

    // this.showPreLoading();

    // this.showPreLoading();

    //     區JPD(不會有[MyFav]欄位)
    // //1:我的最愛(不會有[MyFav]欄位)
    // //2:全部
    // //3:電動
    // //4.街機
    // //5.棋牌
    // //6.捕魚

    static GAME_TYPE = {
        ALL: {
            index: 0,
            type: 2,
        },
        LIKE: {
            index: 1,
            type: 1,
        },
        LAOHU: {
            index: 2,
            type: 3,
        },
        JIEJI: {
            index: 3,
            type: 4,
        },
        POKE: {
            index: 4,
            type: 5,
        },
        FISH: {
            index: 5,
            type: 6,
        },
        AD: {
            index: 6,
            type: 0
        }
    }

    static START_GAME: string = 'startGame';

    static DISMISS: string = 'dismiss';

    static START_GAME_TIME: string = 'start_game_time';

    static IS_DEBUG = false;
    static CELL_TYPE = {
        EMPTY: 0,
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        BIRD: 7
    }


    static GAME_SITE_TYPE = {
        BTG: "btg",
        BE: "be",
        DG: "dg",
        QT: "qt",
        HS: "hs",
        RSG: "rsg",
    }

    // https://main.bigpapa777.com
    static innerIp = '127.0.0.1:9013';
    static publicAddress = '127.0.0.1:9013';

    static PC_HOME = {
        home_url: "http://3.129.12.182/dist/",
        cs_url: "http://3.129.12.182/dist/#cs"

        // http://3.129.12.182/dist/#cs
    }

    // static innerIp = '127.0.0.1:3000';
    // static publicAddress = '127.0.0.1:3000';

    static defaultLineId = "U55541a9d8abfd7eecf73c920c49b2046";

    static GAME_STATUS: any = {
        "0": "遊戲未開始",
        "0.3": "開始遊戲",
        "0.4": "開始配莊",
        "0.5": "停止配莊",
        "1": "開始下注",
        "1.1:": "停止下注",
        "2:": "下注列表",
        "2.5": "開牌中",
        "3": "遊戲結算"
    }

    static VIDEO_STATUS: any = {
        WAIT_UPLOAD_VIDEO: "等待上传视频",
        UPLOAD_VIDEO: "上传视频中",
        UPLOAD_VIDEO_SUCCESS: "上传视频成功",
        VIDEO_OUTLINE: "骨架获取中",
        VIDEO_OUTLINE_SUCCESS: "骨架获取成功",

        VIDEO_CLASSIC: "分类模型整合中",
        VIDEO_CLASSIC_SUCCESS: "分类模型整合成功",
        // outline
        // "0": "遊戲未開始",
        // "0.3": "開始遊戲",
        // "0.4": "開始配莊",
        // "0.5": "停止配莊",
        // "1": "開始下注",
        // "1.1:": "停止下注",
        // "2:": "下注列表",
        // "2.5": "開牌中",
        // "3": "遊戲結算"
    }

    static GAME_COW_STATUS: any = [
        "",
        "無牛",
        "牛1",
        "牛2",
        "牛3",
        "牛4",
        "牛5",
        "牛6",
        "牛7",
        "牛8",
        "牛9",
        "妞妞",
        "國王",
    ]


    static API_URLS = {

        OAUTH: {
            public: `https://${Constant.publicAddress}/`,
            debug: `https://${Constant.innerIp}/`,
        },

        HALL: {
            public: `https://${Constant.publicAddress}/`,
            debug: `https://${Constant.innerIp}/`,
        },

        VIDEO: {
            public: `http://${Constant.publicAddress}/`,
            debug: `http://${Constant.innerIp}/`,
        },

        GAME: {
            public: `https://mdst.everyone168.com/`,
            debug: `https://mdst.everyone168.com/`,
        },


        PC: {
            public: `https://main.everyone168.com/`,
            debug: `https://main.everyone168.com/`,
        },

        USER: {
            public: `https://${Constant.publicAddress}/`,
            debug: `https://${Constant.innerIp}/`,
        },

        CLUB: {
            public: `https://${Constant.publicAddress}/`,
            debug: `https://${Constant.innerIp}/`,
        },
    }

    static API_ROUTE = {
        OAUTH: {
            LOGIN: 'oauth/login',
            // /api/logingLiff
            LOGIN_WITH_LINE: 'api/logingLiff',
            GET_CONFIG: "oauth/getConfig",
            REGISTER: 'oauth/register',
            WECHAT_LOGIN: 'oauth/wechatLogin',
            CHECK_USER_DATA: 'oauth/checkUserData',
        },
        GAME: {
            GET_GAME_STATE: "api/start",
        },

        VIDEO: {
            UPLOAD_VIDEO: "upload",
            TRANSFORM_VIDEO: "transformVideo",
            CLASSIC_VIDEO: "classicVideo",
        },


        PC: {

            START_GAME: "api/login/start",
            BET_GAME: "api/login/draw",
            JIESUAN_GAME: "api/login/calculate",

            LOGIN: 'api/login/do_login',
            GET_USER_INFO: 'api/login/info',

        },

        HALL: {
            GET_GAME_LIST: "game/gamelist",
            JOIN_GAME: "btg/login_game",
            BET_GAME: "api/linebet",

            JOIN_GAME_REG: "rsg/login_game",
            JOIN_GAME_HS: "hs/login_game",
            JOIN_GAME_BTG: "btg/login_game",

            JOIN_GAME_QT: "qt/login_game",
            JOIN_GAME_DG: "dg/login_game",
            JOIN_GAME_BE: "be/login_game",

            GET_MARQUEE_TEXT: "api/users/billboardList",

            // /api/users/billboardList
            // btg
        },

        CLUB: {
            CREATE_CLUB: "api/users/createGuild",
            JOIN_CLUB: "/api/users/joinGuild",
            QUIT_CLUB: "/api/users/quitGuild",
            GET_CLUBS: "/api/users/getGuildList",
            JOIN_GAME_BTG: "btg/login_game",
            // btg
        },

        // /api/users/createGuild
        USER: {
            GET_USER_INFO: "api/info",
            FAV_USER: "game/setMyFav",
            UNFAV_USER: "game/cancelMyFav",
            MORE_GAMES: "game/getManyLink",
            // btg
        },
        PRODUCT: {
            FIND_ORDER: 'api/product/findOrder',
            GET_QUICK_LINK: 'api/product/getQuickLink',
            GET_MEITUAN_LINK: 'api/product/getMeituanSmartLink',
            GET_MEITUAN_SHOPS: 'api/product/getMeituanTakeouts',
            // getMeituanSmartLink
        },
        AD: {
            INIT_AD: 'api/ad/initAd',
            CREATE_AD_LOG: 'api/ad/createAdLog',
        },



        TASK: {
            RUN_PROP_TASK: 'api/task/runPropTask',
            RUN_TASK: 'api/task/runTask',
        },
        CHAT: {
            CABLE: 'chat/cable',

        }
    }



    // const isSystemDebug = true;
    // const inner_ip = '127.0.0.1:3001';
    // const public_address = '127.0.0.1:3001';

    // export const CELL_BASENUM = 6;
    // export const CELL_STATUS = {
    //     COMMON: 0,
    //     CLICK: "click",
    //     LINE: "line",
    //     COLUMN: "column",
    //     WRAP: "wrap",
    //     BIRD: "bird"
    // }

    // export const GRID_WIDTH = 9;
    // export const GRID_HEIGHT = 9;

    // export const CELL_WIDTH = 70;
    // export const CELL_HEIGHT = 70;

    // export const GRID_PIXEL_WIDTH = GRID_WIDTH * CELL_WIDTH;
    // export const GRID_PIXEL_HEIGHT = GRID_HEIGHT * CELL_HEIGHT;

    // const isSystemDebug = true;
    // const inner_ip = '127.0.0.1:3001';
    // const public_address = '127.0.0.1:3001';

    // // ********************   时间表  animation time **************************
    // export const ANITIME = {
    //     TOUCH_MOVE: 0.3,
    //     DIE: 0.2,
    //     DOWN: 0.5,
    //     BOMB_DELAY: 0.3,
    //     BOMB_BIRD_DELAY: 0.7,
    //     DIE_SHAKE: 0.4 // 死前抖动
    // }

    // export const API_URLS = {

    //     OAUTH: {
    //         public: `http://${public_address}/`,
    //         debug: `http://${inner_ip}/`,
    //     },

    // }

    // export const GAME_ACTION = {

    //     SERVER: {
    //         PING: "connector.entryHandler.entry"
    //     },
    //     AUTH: {
    //         LOGIN: "connector.entryHandler.login",
    //     },
    //     HALL: {
    //         ENTER: "connector.hallHandler.enter",
    //     },

    //     GAME: {
    //         ENTER_ROOM: "game.entryHandler.enter",
    //         JOIN_ROOM: "game.entryHandler.join",
    //         LEAVE_ROOM: "game.entryHandler.leave",
    //         GAME_OVER: "game.entryHandler.gameOver",
    //         GAME_START: "game.entryHandler.gameStart",
    //     },

    //     DOUDIZHU: {
    //         // ENTER_ROOM: "game.entryHandler.enter",
    //         // JOIN_ROOM: "game.entryHandler.join",
    //         // LEAVE_ROOM: "game.entryHandler.leave",
    //         // GAME_OVER: "game.entryHandler.gameOver",
    //         // GAME_START: "game.entryHandler.gameStart",
    //     },

    // }

    // export const SCREENS = {
    //     LOADING: "Loading",
    //     LOGIN: "Login",
    //     HALL: "Hall",
    //     GAME: "MJGame"
    // }





    // export const API_ROUTE = {
    //     OAUTH: {
    //         LOGIN: 'oauth/login',
    //         GET_CONFIG: "oauth/getConfig",
    //         REGISTER: 'oauth/register',
    //         WECHAT_LOGIN: 'oauth/wechatLogin',
    //         CHECK_USER_DATA: 'oauth/checkUserData',
    //     },
    //     PRODUCT: {
    //         FIND_ORDER: 'api/product/findOrder',
    //         GET_QUICK_LINK: 'api/product/getQuickLink',
    //         GET_MEITUAN_LINK: 'api/product/getMeituanSmartLink',
    //         GET_MEITUAN_SHOPS: 'api/product/getMeituanTakeouts',
    //         // getMeituanSmartLink
    //     },
    //     AD: {
    //         INIT_AD: 'api/ad/initAd',
    //         CREATE_AD_LOG: 'api/ad/createAdLog',
    //     },

    //     VIDEO: {
    //         // INIT_AD: 'api/video/initAd',
    //         CREATE_VIDEO_LOG: 'api/video/createVideoLog',
    //     },
    //     USER: {
    //         GET_USER_INFO: 'api/user/getUserInfo',
    //         CHECK_USER_INTEGRAL: 'api/user/checkUserIntegral',
    //         GET_NOTIFY_SYSTEM_MESSAGE: 'api/user/getNotifySystem',
    //         LIST_USER_POWER: 'api/user/listUserPower',
    //         LIST_USER_INTEGRAL: 'api/user/listUserIntegral',
    //         LIST_USER_Bill: 'api/user/listUserBill',
    //         CLEAR_ACCOUNT: 'api/user/clearAccount',
    //         CHANGE_LOGIN_PASSWORD: 'api/user/changeLoginPassword',
    //         LIST_USER_ORDER: 'api/user/listUserOrder',
    //         REAL_AUTHENTICATION: 'api/user/realAuthentication',
    //         UPDATE_PASSWORD: 'api/user/updatePassword',
    //         CHANGE_TRADE_PASSWORD: 'api/user/changeTradePassword',
    //         CHANGE_SECURITY_PASSWORD: 'api/user/changeSecurityPassword',
    //         DO_NEWUSER_TASK: 'api/user/doNewUserTask',
    //         DO_NEWUSER_REWARD: 'api/user/doNewUserReward',
    //         UPDATE_WECHAT: 'api/user/updateWechat',
    //         LOGIN_QIANZHU: 'api/user/loginQianZhu',

    //         CREATE_ORDER: "api/user/createOrder",
    //         PICKED_AI: "api/user/pickedAi",

    //         ADD_AI_ASSISTANT: "api/user/addAiAssistant",

    //         BIND_ALIPAY: 'api/user/bindAlipay',
    //         SETTLEMENT_MONEY: 'api/user/settlementMoney',
    //         GET_USER_TEAMS: 'api/user/getUserTeams',
    //         GET_USER_POWER: 'api/user/list_user_power',
    //         GET_USER_INTEGRAL: 'api/user/list_user_integral',
    //         GET_USER_MESSAGE: 'api/user/listUserMessage',

    //     },
    //     TASK: {
    //         RUN_PROP_TASK: 'api/task/runPropTask',
    //         RUN_TASK: 'api/task/runTask',
    //     },
    //     CHAT: {
    //         CABLE: 'chat/cable',

    //     }
    // }




}

// export interface LIFF_USER {
//     [name: string]: AudioData;
// }


export interface LIFF_USER {
    userId: string;
    displayName: string;
    pictureUrl: string;
    statusMessage: string;
}
