import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchFilter from '../SearchFilter';
import filterReducer from '../../../store/slices/filterSlice';

const createMockStore = (preloadedState = {}) => {
    return configureStore({
        reducer: {
            filters: filterReducer,
        },
        preloadedState: {
            filters: {
                pricingOptions: [],
                searchKeyword: '',
                sortBy: 'name',
                priceRange: [0, 999],
                ...preloadedState,
            },
        },
    });
};

describe('SearchFilter', () => {
    it('should render search input with placeholder', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <SearchFilter />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search by title or user name...');
        expect(searchInput).toBeInTheDocument();
    });

    it('should update search keyword on input change', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <SearchFilter />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search by title or user name...');
        fireEvent.change(searchInput, { target: { value: 'test search' } });

        expect(searchInput).toHaveValue('test search');
    });

    it('should display initial search keyword from store', () => {
        const store = createMockStore({ searchKeyword: 'initial value' });

        render(
            <Provider store={store}>
                <SearchFilter />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search by title or user name...');
        expect(searchInput).toHaveValue('initial value');
    });
});