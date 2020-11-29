import {

    SHOW_FULLLOADER,

    SHOW_LOADER,

    UPDATE_CART,

    TOGGLE_CARTDLG,

    TOGGLE_CHECKOUTDLG

} from '../actionTypes';
import store from 'store'


const INIT_STATE = {

    isFullLoader: false,

    isLoader: false,

    cart: store.get('cart') || [],

    showCartDlg: false,

    showCheckoutDlg: false
};



const reducer = (state = INIT_STATE, action) => {

    switch (action.type) {

        case SHOW_FULLLOADER:

            return { ...state, isFullLoader: action.payload };

        case SHOW_LOADER:

            return { ...state, isLoader: action.payload };

        case UPDATE_CART:

            store.set('cart', action.payload)

            return { ...state, cart: action.payload };

        case TOGGLE_CARTDLG:

            return { ...state, showCartDlg: action.payload };

        case TOGGLE_CHECKOUTDLG:

            return { ...state, showCheckoutDlg: action.payload,  showCartDlg: false};

        default:

            return state;
    }
}


export default reducer;