import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from './components/app';

export const bind = (store, handlers) => {
    render(
        <Provider store={store}>
            <AppComponent handlers={handlers}/>
        </Provider>,
        document.querySelector('#app-container')
    )
};
