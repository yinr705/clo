import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {FilterState} from '../../types/api';

const initialState: FilterState = {
    pricingOptions: [],
    searchKeyword: '',
    sortBy: 'name',
    priceRange: [0, 999],
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPricingOptions: (state, action: PayloadAction<('Paid' | 'Free' | 'View Only')[]>) => {
            state.pricingOptions = action.payload;
        },
        togglePricingOption: (state, action: PayloadAction<'Paid' | 'Free' | 'View Only'>) => {
            const option = action.payload;
            const index = state.pricingOptions.indexOf(option);
            if (index >= 0) {
                state.pricingOptions.splice(index, 1);
            } else {
                state.pricingOptions.push(option);
            }
        },
        setSearchKeyword: (state, action: PayloadAction<string>) => {
            state.searchKeyword = action.payload;
        },
        setSortBy: (state, action: PayloadAction<'name' | 'price-high' | 'price-low'>) => {
            state.sortBy = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            state.priceRange = action.payload;
        },
        resetFilters: (state) => {
            state.pricingOptions = [];
            state.searchKeyword = '';
            state.sortBy = 'name';
            state.priceRange = [0, 999];
        },
    },
});

export const {
    setPricingOptions,
    togglePricingOption,
    setSearchKeyword,
    setSortBy,
    setPriceRange,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;