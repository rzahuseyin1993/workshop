import {

    SHOW_FULLLOADER,

    SHOW_LOADER,

    UPDATE_CART,

    TOGGLE_CARTDLG,

    TOGGLE_CHECKOUTDLG

} from '../actionTypes';


export const showFullLoader = (data) => {

    return { type: SHOW_FULLLOADER, payload: data };
}


export const showLoader = (data) => {

    return { type: SHOW_LOADER, payload: data };
}


export const updateCart = (data) => {

    return { type: UPDATE_CART, payload: data };
}


export const toggleCartDlg = (data) => {

    return { type: TOGGLE_CARTDLG, payload: data };
}


export const toggleCheckoutDlg = (data) => {

    return { type: TOGGLE_CHECKOUTDLG, payload: data };
}
