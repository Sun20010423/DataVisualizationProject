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
const TIME_OUT = 1000;
export const PCGameScreen = (props: any) => {
    const { gameCode, games, onClose, loadUrl, userPlayerInfo, playButton, getUserInfo } = props;
    // useState

    const [videoPlayer, setVideoPlayer] = useState("");
    const [videoOutlinePlayer, setVideoOutlinePlayer] = useState("");

    const [videoId, setVideoId] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(Constant.VIDEO_STATUS.WAIT_UPLOAD_VIDEO);
    const [loading, setLoading] = useState(false);
    // const 
    return <div className="pc-game-block multiple-view Baccarat">
        {<div>
            <div >
                <h1>上传原始视频</h1>

                <Uploader
                    accept='*'
                    // defaultValue={defaultValue}
                    onChange={(file: any) => {

                        console.log("file", file);
                        if (file && file.length > 0) {

                            const body = new FormData()
                            setData([])
                            // body.append('file', file)
                            body.append('file', file[0]['file']) // maybe it should be '{target}_cand'
                            setStatus(Constant.VIDEO_STATUS.UPLOAD_VIDEO);
                            HttpMgr.uploadVideo(body, (res: any) => {

                                console.log("res", res);
                                const url = res.url;
                                const video = res.video;
                                const outlineUrl = res.outlineUrl;
                                if (res.success) {
                                    Util.showSuccessToast("上传成功");
                                }

                                setStatus(Constant.VIDEO_STATUS.UPLOAD_VIDEO_SUCCESS);

                                setVideoPlayer(url);
                                // setVideoOutlinePlayer(outlineUrl);
                                setVideoId(video);




                            }, () => {

                            });

                        }


                    }}
                />

                <p className='video_status'>状态值:{status}</p>



                <div>

                    <Button type='primary' onClick={() => {
                        // transformVideo

                        setStatus(Constant.VIDEO_STATUS.VIDEO_OUTLINE);
                        setLoading(true);

                        HttpMgr.transformVideo(videoId, (res: any) => {

                            console.log("res", res);
                            // const url = res.url;
                            const outlineUrl = res.outlineUrl;
                            if (res.success) {
                                Util.showSuccessToast("转换成功");
                            }

                            // setVideoPlayer(url);
                            setLoading(false);
                            setVideoOutlinePlayer(outlineUrl);
                            setStatus(Constant.VIDEO_STATUS.VIDEO_OUTLINE_SUCCESS)




                        }, () => {

                        });
                    }}>提取骨架</Button>


                </div>



                <div className='video_content'>

                    <div className='video_player'>
                        {videoPlayer && <Player
                            playsInline
                            // poster="/assets/poster.png"
                            src={videoPlayer}
                        />}
                    </div>
                    <div className='video_player'>
                        {loading && <Loading />}
                        {!loading && videoOutlinePlayer && <Player
                            playsInline
                            // poster="/assets/poster.png"
                            src={videoOutlinePlayer}
                        />}
                    </div>

                </div>


                <div style={{ margin: "10px" }}>

                    {status == Constant.VIDEO_STATUS.VIDEO_OUTLINE_SUCCESS && <Button type='primary' onClick={() => {
                        // transformVideo

                        setStatus(Constant.VIDEO_STATUS.VIDEO_CLASSIC);
                        // setLoading(true);

                        HttpMgr.classicVideo(videoId, (res: any) => {
                            console.log("res", res);
                            let resData: any = res.data;
                            if (res.success) {
                                Util.showSuccessToast("分类成功");
                            }
                            setStatus(Constant.VIDEO_STATUS.VIDEO_CLASSIC_SUCCESS)
                            setData(resData)
                        }, () => {

                        });
                    }}>分类</Button>}




                </div>





            </div>



        </div>
        }



    </div >;

}

