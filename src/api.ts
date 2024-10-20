import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

async function authMethodBase(
    url: string,
    config: AxiosRequestConfig,
    locStore: Storage,
    thisVar: Api,
    methodFunc: Function
) {
    let conf = config;
    let accesstoken = locStore.getItem("access-token");
    let refreshtoken = locStore.getItem("refresh-token");
    let accessexp = jwtDecode(accesstoken as string);
    if ((accessexp.exp as number) < Date.now() / 1000) {
        if (
            (jwtDecode(refreshtoken as string).exp as number) >
            Date.now() / 1000
        ) {
            accesstoken = (
                await thisVar.post(
                    "token/refresh/",
                    JSON.stringify({
                        refresh: refreshtoken,
                    }),
                    { headers: { "Content-Type": "application/json" } }
                )
            ).data.access;
        } else {
            throw new NotAuthenticated();
        }
    }
    locStore.setItem("access-token", accesstoken as string);
    if (conf.headers) conf.headers.Authorization = `Bearer ${accesstoken}`;
    else conf.headers = { Authorization: `Bearer ${accesstoken}` };
    return await methodFunc(url, conf);
}
async function authMethodChangeBase(
    url: string,
    data: any,
    config: AxiosRequestConfig,
    locStore: Storage,
    thisVar: Api,
    methodFunc: Function
) {
    let conf = config;
    let accesstoken = locStore.getItem("access-token");
    let refreshtoken = locStore.getItem("refresh-token");
    let accessexp = jwtDecode(accesstoken as string);
    if ((accessexp.exp as number) < Date.now() / 1000) {
        if (
            (jwtDecode(refreshtoken as string).exp as number) >
            Date.now() / 1000
        ) {
            accesstoken = (
                await thisVar.post(
                    "token/refresh/",
                    JSON.stringify({
                        refresh: refreshtoken,
                    }),
                    { headers: { "Content-Type": "application/json" } }
                )
            ).data.access;
        } else {
            throw new NotAuthenticated();
        }
    }
    locStore.setItem("access-token", accesstoken as string);
    if (conf.headers) conf.headers.Authorization = `Bearer ${accesstoken}`;
    else conf.headers = { Authorization: `Bearer ${accesstoken}` };
    return await methodFunc(url, data, conf);
}
class Api extends Axios {
    async authget(url: string, config: AxiosRequestConfig, locStore: Storage) {
        return await authMethodBase(url, config, locStore, this, this.get);
    }
    async authpost(
        url: string,
        data: any,
        config: AxiosRequestConfig,
        locStore: Storage
    ) {
        return await authMethodChangeBase(
            url,
            data,
            config,
            locStore,
            this,
            this.post
        );
    }
    async authpatch(
        url: string,
        data: any,
        config: AxiosRequestConfig,
        locStore: Storage
    ) {
        return await authMethodChangeBase(
            url,
            data,
            config,
            locStore,
            this,
            this.patch
        );
    }
}
class NotAuthenticated extends Error {}
const api = new Api({
    baseURL: "http://127.0.0.1:8000/",
});
export default api;
