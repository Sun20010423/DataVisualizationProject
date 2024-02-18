import { useEffect, useState } from 'react';
import { GameIconData } from '../../framework/model/GameIconData';
import './popup.css';
import { Constant } from '../../framework/constant';
import { GlobalData } from '../../framework/model/GlobalData';
import { get } from 'lodash';
import { Util } from '../../framework/util';
import CheckBox from '../CheckBox';
const Popup = (props: any) => {
    const { message } = props;
    return <div className="popup-box mask">
        <div className="p-content">

            <div className="popup-s popup-message">
                <div className="popupBg"><div className="p-header">
                    <div className="headerBox"><div className="title">溫馨提醒</div></div></div>
                    <div className="p-body messageContent" >
                        <div className="body-content">{message}</div></div>
                    <div className="p-footer"><div className="btn-confirm">
                        <div className="text">確認</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}




export const MessagePopup = (props: any) => {
    const { onClose, message } = props;
    return <div id="theme_chunjie">
        <div className="popup-box mask zindex101">
            <div className="p-content">
                <div className="popup-s popup-message">
                    <div className="popupBg">
                        <div className="p-header">
                            <div className="headerBox">
                                <div className="title">
                                    溫馨提醒
                                </div>
                            </div>
                        </div>
                        <div className="p-body messageContent">
                            <div className="body-content">
                                {message}
                            </div>
                        </div>
                        <div className="p-footer">
                            <div className="btn-confirm" onClick={() => {
                                onClose();
                            }}>
                                <div className="text">
                                    確認
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export const ErrorMessagePopup = (props: any) => {
    const { onClose, message } = props;
    console.log("message", message);
    const success = message.success;
    return <div id="theme_chunjie">
        <div className="popup-box mask zindex101">
            <div className="p-content">
                <div className="popup-s popup-message">
                    <div className="popupBg">

                        <div className="p-body messageContent">
                            <div className="body-content">
                                <div style={{ color: "red", fontSize: "24px", marginBottom: "10px" }}>
                                    {success ? "成功" : "錯誤提示"}
                                </div>
                                <p>{message.message}</p>
                            </div>
                        </div>
                        <div className="p-footer">
                            {message && message.canClose && <div className="btn-cancel" onClick={() => {
                                onClose();
                            }}>
                                <div className="text">
                                    關閉
                                </div>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}



export const SuccessPopup = (props: any) => {
    const { onClose, setMicroCurrentPopup, message } = props;
    const [userSign, setUserSign] = useState("");
    return <div id="theme_chunjie">
        <div className="popup-box mask zindex101">
            <div className="p-content">
                <div className="popup-s popup-message2 popup-line">
                    <div className="popupBg">
                        <div className="p-header">
                            <div className="headerBox">
                                <div className="title">

                                </div>
                            </div>
                        </div>
                        <div className="p-body messageContent">
                            <div className="body-content" style={{ padding: "30px" }}>

                                <p style={{ margin: "30px" }}> {message}</p>

                            </div>
                        </div>

                        <div className="p-footer">

                            <div className="btn-cancel" onClick={() => {
                                onClose();
                            }}>
                                <div className="text">
                                    取消
                                </div>
                            </div>

                            {/* <div className="btn-confirm">
                                <div className="text">
                                    確認
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
}




export default Popup;