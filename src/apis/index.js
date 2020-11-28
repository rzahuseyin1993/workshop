import axios from 'axios';
import API_URL from './apiurl';


axios.interceptors.response.use(function (response) {

    return response;

}, function (error) {

    console.log(error.message)

    return Promise.reject(error);
});


export const searchCategories = async () => {

    return axios.get(`${API_URL.SEARCH_CATEGORIES}`, {params: {}})
    
    .then(data => data.data)
    
    .catch(error => { throw error.response.data });
};


export const searchWorkshops = async(params) => {

    return await axios.get(`${API_URL.SEARCH_WORKSHOPS}`, {params: params, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response.data });
};


export const getWorkshop = async(params) => {

    return await axios.get(`${API_URL.SEARCH_WORKSHOPS}/${params.id}`, {params: {}, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response.data });
};


export const getUser = async(params) => {

    return await axios.get(`${API_URL.SEARCH_USERS}/${params.id}`, {params: {}, headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response.data });
};


export const createOrder = async(params) => {

    return await axios.post(`${API_URL.CREATE_ORDER}`, params, {headers: null},)

        .then(data => data.data)

        .catch(error => { throw error.response.data });
};







