import axios from 'axios';
import API_URL from './apiurl';

const Axios = axios.create({

    baseURL: API_URL.BASE_URL,

    timeout: 15000,
});


Axios.interceptors.response.use(function (response) {

    return response;

}, function (error) {

    if (!error.response) return Promise.reject({ response: { status: 408, message: 'Request Timeout'} })

    return Promise.reject(error);
});


export const searchCategories = async () => {

    return Axios.get(`${API_URL.SEARCH_CATEGORIES}`, {params: {}})
    
    .then(data => data.data)
    
    .catch(error => { throw error.response });
};


export const searchWorkshops = async(params) => {

    return await Axios.get(`${API_URL.SEARCH_WORKSHOPS}`, {params: params, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response });
};


export const getWorkshop = async(params) => {

    return await Axios.get(`${API_URL.SEARCH_WORKSHOPS}/${params.id}`, {params: {}, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response });
};


export const getUser = async(params) => {

    return await Axios.get(`${API_URL.SEARCH_USERS}/${params.id}`, {params: {}, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response });
};


export const createOrder = async(params) => {

    return await Axios.post(`${API_URL.CREATE_ORDER}`, params, {headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response });
};







