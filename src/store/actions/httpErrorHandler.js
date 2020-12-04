import {

    HTTP_401_ERROR,

    HTTP_404_ERROR,

    HTTP_500_ERROR,

    HTTP_OTHER_ERROR

} from '../actionTypes';


export const excute401ErrorHandler = (props) => {

    return { type: HTTP_401_ERROR, props: props };
}


export const excute404ErrorHandler = (props) => {

    return { type: HTTP_404_ERROR, props: props };
}


export const excute500ErrorHandler = (props) => {

    return { type: HTTP_500_ERROR, props: props };
}


export const excuteOtherErrorHandler = (error) => {

    return { type: HTTP_OTHER_ERROR, error: error };
}


export const handleHTTPError = (error, props) => {

    if (error.status === 401) 

        return excute401ErrorHandler(props)

    else if (error.status === 404) 

        return excute404ErrorHandler(props)
    
    else if (error.status === 500) 

        return excute500ErrorHandler(props)

    else     
        return excuteOtherErrorHandler(error)    
}