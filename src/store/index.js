import { createStore, combineReducers } from 'redux';
import workshopReducer from './reducers/workshop';
import httpErrorHandlerReducer from './reducers/httpErrorHandler';


const rootReducers = combineReducers({

    workshop: workshopReducer,

    httpErrorHandler: httpErrorHandlerReducer
})

export default function configureStore (initialState) {

    const store = createStore (rootReducers, initialState);
    
    return store;
}
