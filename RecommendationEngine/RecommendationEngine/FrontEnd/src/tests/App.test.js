import React from 'react';
import App from '../App';
import { shallow } from '../enzyme';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', async () => {
        const div = document.createElement('div');
        ReactDOM.render(
                <MemoryRouter>
                        <App />
                </MemoryRouter>,
                div
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
});
