import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './root.css'

const applyRootStyles = () => {
    const rootElement = document.getElementById('root')
    if (rootElement) {
        rootElement.style.backgroundColor = '#0A0B0E'
        rootElement.style.color = '#E0E0E0'
        rootElement.style.minHeight = '100vh'
    }
}

applyRootStyles();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);