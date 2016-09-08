import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppComponent from './components/app';

export const bind = (store, handlers) => {
    store.subscribe(() => {
        const state = store.getState();

        if (!state) {
            return;
        }
        document.querySelector('#output').innerHTML = JSON.stringify(state, null, 2);

    });
    render(
        <Provider store={store}>
            <AppComponent handlers={handlers}/>
        </Provider>,
        document.querySelector('#app-container')
    )
};
