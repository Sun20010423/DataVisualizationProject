import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


import './header.css';
import { Util } from '../../../framework/util';
import { get } from 'lodash';
const HallHeader = (props: any) => {
    const { userInfo, userPlayerInfo, playButton, showPopup } = props;
    const playerInfoSum = get(userPlayerInfo, "sum_amt", "");
    const moneyFormat = userInfo && userInfo.playerInfo ? Util.moneyFormat(playerInfoSum) : "";
    const sum_amt = get(moneyFormat.split("."), "0", "");
    const point = `.${get(moneyFormat.split("."), "1", "")}`;
    const vip = get(userInfo, "playerInfo.vip", "1");

    const mineRes = require("../../../assets/hall/user/mine.png")
    return <div className="lobby-header">
        <div className="areaL">
            <div className="userBox">
                <div>

                    <div className="userImg " onClick={() => {
                        showPopup("member")

                    }}>
                        <img
                            src={userInfo.avator}
                            alt="" />
                        <span className="pointIcon"></span>

                    </div>

                    <span className={`level vip${vip}`} onClick={() => {
                        showPopup("member")

                    }}></span>

                </div>


                <div>
                    <div className="userName">{userInfo.nickname}</div>


                    <div className="btn-account" onClick={() => {
                        showPopup("member")

                    }}><img src={mineRes} width={60} height={20}></img></div>
                </div>


            </div>


        </div>
        <div className="areaR">
            <div className="userMoney">
                <div className="icon-money">

                    {/* <img src="/static/media/money.9de25433.png" alt="" /> */}
                </div>
                <div className="count">{sum_amt}
                    <span className='point'>{point}</span>
                    <div className="btn-reflash" onClick={() => {

                    }}>
                    </div>
                </div>
            </div>
            <div className="btn-setting click_scale" onClick={() => {

                showPopup("setting");

            }} />
        </div>
    </div>;

}

export default HallHeader;
