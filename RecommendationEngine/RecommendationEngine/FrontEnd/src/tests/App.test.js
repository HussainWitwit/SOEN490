import React from 'react';
import App from '../App';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../redux/store';

it.skip('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter store={store}>
            <App />
        </MemoryRouter>, div);
    await new Promise(resolve => setTimeout(resolve, 1000));
});