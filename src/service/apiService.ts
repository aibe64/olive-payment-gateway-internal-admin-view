import axios from "axios"
import { Response } from "../models/client/apiResponse";
import { Encription } from "../shared/functions/encryption";
import { InternetErrorNotification } from "../shared/components/internetError";

if (!localStorage.getItem("***")) {
} else {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    try {
        let data: any = JSON.parse(Encription.decrypt(localStorage.getItem("***") as string))
        const token = data.token
        axios.defaults.headers.common['Authorization'] = "bearer " + token;
    } catch (e) { }
    // const UNAUTHORIZED = 401;
    // axios.interceptors.response.use(
    //     response => response,
    //     error => {
    //         const { status } = error.response;
    //         if (status === UNAUTHORIZED) {
    //            window.location.href = ""
    //         }
    //         return Promise.reject(error);
    //     }
    // );
}
export async function GET(url: string, isCallBack: boolean = false, token: any = null) {
    // const history = useHistory();
    // store.dispatch({
    //     type: ActionTypes.PageUtility.Page_Loading,
    //     payload: {...initialState, loading: true }
    // })
    axios.defaults.headers.common['Authorization'] = "bearer " + GetToken();
    let apiResponse = new Response.API();
    apiResponse = await axios.get(url)
        .then(function (response) {
            if (Array.isArray(response.data)) {
                apiResponse.data = response.data
                apiResponse.success = true
            } else {
                apiResponse.success = response.data.responseCode === "00" ? true : false;
                apiResponse.data = response.data.data
                apiResponse.responseMessage = response.data.responseMessage
                return apiResponse;
            }

            return apiResponse;
        }).catch(function (error) {
            if (error.response) {

                //  window.location.href = "../servererror"
                apiResponse.success = false
                apiResponse.responseMessage = "Something went wrong. Please come back later.";
                apiResponse.responseCode = "01";
                return apiResponse;
            } else {
                //  window.location.href = "../servererror"
                apiResponse.success = false
                apiResponse.responseMessage = "Service Unavailable. Please come back later.";
                apiResponse.responseCode = "10";
                InternetErrorNotification();
                return apiResponse;
            }

        })
    // store.dispatch({
    //     type: ActionTypes.PageUtility.Page_Loading,
    //     payload: {...initialState, loading: false }
    // })
    return apiResponse;
}

export async function POST(url: string, request: any, token: any = null) {
    axios.defaults.headers.common['Authorization'] = "bearer " + GetToken();
    let apiResponse = new Response.API();
    apiResponse = await axios.post(url, request)
        .then(function (response) {
            apiResponse = response.data
            apiResponse.success = apiResponse.responseCode === "00" ? true : false;
            return apiResponse;
        }).catch(function (error) {
            if (!error.response) {
                apiResponse.success = false
                apiResponse.responseCode = "10";
                InternetErrorNotification();
                return apiResponse;
            }
            apiResponse.success = false
            apiResponse.responseMessage = "Service Unvailable. Please try again.";
            apiResponse.responseCode = "99";
            if (error.response) {
                if (error.response.status === 404) {
                    apiResponse.responseCode = "404";
                } else {
                    apiResponse.responseCode = "99";
                }
                apiResponse.success = false
                apiResponse.responseMessage = Array.isArray(error.response.data) ? error.response.data.responseMessage : "";
                return apiResponse;
            }
            return apiResponse;
        })
    return apiResponse;
}

export async function PUT(url: string, request: any) {
    let apiResponse = new Response.API();
    apiResponse = await axios.put(url, request)
        .then(function (response) {
            apiResponse = response.data
            apiResponse.success = apiResponse.responseCode === "00" ? true : false;
            return apiResponse;
        }).catch(function (error) {
            apiResponse.success = false
            apiResponse.responseMessage = "Service unvailable. Please try again.";
            apiResponse.responseCode = "01";
            if (error.response) {
                apiResponse.success = false
                apiResponse.responseMessage = Array.isArray(error.response.data) ? error.response.data.responseMessage : "";
                apiResponse.responseCode = "01";
                return apiResponse;
            }
            return apiResponse;
        })
    return apiResponse;
}

export async function DELETE(url: string) {
    let apiResponse = new Response.API();
    apiResponse = await axios.delete(url)
        .then(function (response) {
            apiResponse = response.data
            apiResponse.success = apiResponse.responseCode === "00" ? true : false;
            return apiResponse;
        }).catch(function (error) {
            apiResponse.success = false
            apiResponse.responseMessage = "Something went wrong. Please come back later.";
            apiResponse.responseCode = "01";
            return apiResponse;
        })
    return apiResponse;
}

export async function PostUpload(url: string, request: any) {
    axios.defaults.headers.common['Authorization'] = "bearer " + GetToken();
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    let apiResponse = new Response.API();
    apiResponse = await axios.post(url, request, {
        headers: headers
    })
        .then(function (response) {
            apiResponse = response.data
            apiResponse.success = apiResponse.responseCode === "00" ? true : false;
            return apiResponse;
        }).catch(function (error) {
            apiResponse.success = false
            apiResponse.responseMessage = "Service Unvailable. Please try again.";
            apiResponse.responseCode = "01";
            if (error.response) {
                apiResponse.success = false
                apiResponse.responseMessage = Array.isArray(error.response.data) ? error.response.data.responseMessage : "";
                apiResponse.responseCode = "01";
                return apiResponse;
            }
            return apiResponse;
        })
    return apiResponse;
}

export async function Config() {
    let config = new Response.Settings();
    config = await axios.get('config.json')
        .then(function (response) {
            config = response.data
            return config;
        }).catch(function (error) {
            return config;
        })
    return config;
}

const GetToken = () => {
    let userInfo: Response.UserInfo = new Response.UserInfo();
    if (localStorage.getItem("***")) {
        userInfo = JSON.parse(
            Encription.decrypt(localStorage.getItem("***") as string)
        );
        return userInfo.token
    }
    return null
}


