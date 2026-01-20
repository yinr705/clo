import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import contentReducer from '../store/slices/contentSlice';
import filterReducer from '../store/slices/filterSlice';

const createMockStore = (initialState: any = {}) => {
    return configureStore({
        reducer: {
            content: contentReducer,
            filters: filterReducer,
        },
        preloadedState: initialState,
    });
};

test('renders learn react link', () => {
    const store = createMockStore({
        content: {
            items: [],
            loading: false,
            error: null,
        },
        filters: {
            pricingOptions: [],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 999],
        },
    });

    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    expect(screen.getByText('CLO-SET CONNECT Store')).toBeInTheDocument();
});