import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './game.css'
// import Loading from '../../../components/Loading';
import HttpMgr from '../../../framework/util/httpMgr';
import { GameIconData } from '../../../framework/model/GameIconData';
import { GlobalData } from '../../../framework/model/GlobalData';
import { UserData } from '../../../framework/userData';
import { get } from 'lodash';
import { Util } from '../../../framework/util';
import moment from 'moment';
import { Constant } from '../../../framework/constant';
import { Form } from 'react-vant';
import { Button, Input } from 'react-vant'
import { Uploader } from 'react-vant';
import { Player } from 'video-react';
import { Loading } from 'react-vant';

import ReactECharts from 'echarts-for-react';

import * as echarts from 'echarts/core';


import {

    PieChart,
} from 'echarts/charts';

const TIME_OUT = 1000;
export const MobileGameScreen = (props: any) => {
    const { gameCode, games, onClose, loadUrl, userPlayerInfo, playButton, getUserInfo } = props;
    // useState

    const [videoPlayer, setVideoPlayer] = useState("");
    const [videoOutlinePlayer, setVideoOutlinePlayer] = useState("");

    const [videoId, setVideoId] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(Constant.VIDEO_STATUS.WAIT_UPLOAD_VIDEO);
    const [loading, setLoading] = useState(false);

    const [showEchars, setShowEchars] = useState(false);

    echarts.use(
        [PieChart]
    );


    const options1 = {
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '001' },
                    { value: 735, name: '002' },
                    //   { value: 580, name: 'Email' },
                    //   { value: 484, name: 'Union Ads' },
                    //   { value: 300, name: 'Video Ads' }
                ],
                // emphasis: {
                //   itemStyle: {
                //     shadowBlur: 10,
                //     shadowOffsetX: 0,
                //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                //   }
                // }
            }
        ]
    };






    // const 
    return <div className="pc-game-block multiple-view Baccarat">
        {<div>
            <div className='content_1'>
                <h1>Start Spider</h1>
                <div className='content'>
                    <div className='content_item'>


                        <Button round type='info'>
                            Fetch Spider Start
                        </Button>

                    </div>
                    <div className='content_item'>
                        <div className='video_player'>

                        </div>
                    </div>
                </div>

                <div className='content'>






                </div>


                <h1>Page 3DShow</h1>





            </div>



        </div>
        }

    </div >;

}

