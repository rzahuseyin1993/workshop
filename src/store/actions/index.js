import {

    SHOW_FULLLOADER,

    SHOW_LOADER,

    UPDATE_CART,

    TOGGLE_CARTDLG,

    TOGGLE_CHECKOUTDLG

} from '../actionTypes';


export function showFullLoader(data){

    return {

        type: SHOW_FULLLOADER,

        payload: data
    };
}

export function showLoader(data){

    return {

        type: SHOW_LOADER,

        payload: data
    };
}

export function updateCart(data){

    return {

        type: UPDATE_CART,

        payload: data
    };
}

export function toggleCartDlg(data){

    return {

        type: TOGGLE_CARTDLG,

        payload: data
    };
}

export function toggleCheckoutDlg(data){

    return {

        type: TOGGLE_CHECKOUTDLG,

        payload: data
    };
}
