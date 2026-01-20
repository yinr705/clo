import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PricingFilter from '../PricingFilter';
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

describe('PricingFilter', () => {
    it('should render all pricing options', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <PricingFilter />
            </Provider>
        );

        expect(screen.getByText('Pricing Options')).toBeInTheDocument();
        expect(screen.getByLabelText('Paid')).toBeInTheDocument();
        expect(screen.getByLabelText('Free')).toBeInTheDocument();
        expect(screen.getByLabelText('View Only')).toBeInTheDocument();
    });

    it('should check pricing option when clicked', () => {
        const store = createMockStore();

        render(
            <Provider store={store}>
                <PricingFilter />
            </Provider>
        );

        const paidCheckbox = screen.getByLabelText('Paid');
        fireEvent.click(paidCheckbox);

        expect(paidCheckbox).toBeChecked();
    });

    it('should show checked options based on initial state', () => {
        const store = createMockStore({ pricingOptions: ['Paid', 'Free'] });

        render(
            <Provider store={store}>
                <PricingFilter />
            </Provider>
        );

        expect(screen.getByLabelText('Paid')).toBeChecked();
        expect(screen.getByLabelText('Free')).toBeChecked();
        expect(screen.getByLabelText('View Only')).not.toBeChecked();
    });
});