import {

    HTTP_401_ERROR,

    HTTP_404_ERROR,

    HTTP_500_ERROR,

    HTTP_OTHER_ERROR

} from '../actionTypes';


const INIT_STATE = {

    showErrorModal: false,

    errorMessage: ''
};


export const excute401ErrorHandler = (state, action) => {

    window.location.href = "/signin"

    return {...state};
}


export const excute404ErrorHandler = (state, action) => {

    window.location.href = "/notfound"

    return {...state};
}


export const excute500ErrorHandler = (state, action) => {

    window.location.href = "/internalerror"

    return {...state};
}


export const excuteOtherErrorHandler = (state, action) => {

    return {...state, showErrorModal: true, errorMessage: action.error.message}
}



const reducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case HTTP_401_ERROR:

            return excute401ErrorHandler(state, action)

        case HTTP_404_ERROR:

            return excute404ErrorHandler(state, action)

        case HTTP_500_ERROR:

            return excute500ErrorHandler(state, action)

        case HTTP_OTHER_ERROR:

            return excuteOtherErrorHandler(state, action)
        
        default:

            return state;
    }
}


export default reducer;