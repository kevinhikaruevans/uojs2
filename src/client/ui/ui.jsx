import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppComponent } from './components/app';

export default function bind(store, handlers) {
    render(
        <Provider store={store}>
            <AppComponent handlers={handlers}/>
        </Provider>,
        document.querySelector('#app-container')
    )
};
