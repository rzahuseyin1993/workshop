import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from './store';
import './sass/index.scss';
import ScrollToP from './scrolltop'
import ErrorBoundary from './errorboundry'
import Container from './containers'

const store = configureStore ();

class App extends Component {
    
    render() {
        return (
            <div className="app d-flex flex-column">
                <Provider store={store}>
                    <Router>
                        <ScrollToP>
                            <ErrorBoundary>
                                <Container/>
                            </ErrorBoundary>
                        </ScrollToP>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;
