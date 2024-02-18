// import { API_ROUTE, API_URLS, IS_DEBUG } from '../Model/ConstValue'
import { Constant } from '../constant';
import { get } from 'lodash'
export const getApis = (api: string, postData: object, routeStr: string = "", token = null) => {

    const route: string = routeStr != "" ? routeStr : api.split('/')[0].toUpperCase();
    console.log("router", route);
    const apis = get(Constant.API_URLS, route.toUpperCase());
    const ROOT_API = Constant.IS_DEBUG ? `${apis.debug}${api}` : `${apis.public}${api}`;
    let formData = new FormData();
    let postString: string = "";
    Object.keys(postData).forEach((key) => {
        postString += `${key}=${get(postData, key)}&`;
    });

    postString = postString.substring(0, postString.length - 1);
    // console.log("postString", postString);
    const headers = {
        // "mode": "cors",
        "content-type": "application/x-www-form-urlencoded"
    };
    return {
        url: ROOT_API,
        api,
        // baseUrl
        baseUrl: Constant.IS_DEBUG ? `${apis.debug}` : `${apis.public}`,
        options: {
            method: 'POST',
            headers,
            body: postString
        },
    };
};