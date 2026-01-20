import filterReducer, {
    setPricingOptions,
    togglePricingOption,
    setSearchKeyword,
    setSortBy,
    setPriceRange,
    resetFilters,
} from '../filterSlice';
import type {FilterState} from '../../../types/api';

describe('filterSlice', () => {
    const initialState: FilterState = {
        pricingOptions: [],
        searchKeyword: '',
        sortBy: 'name',
        priceRange: [0, 999],
    };

    it('should return the initial state', () => {
        expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setPricingOptions', () => {
        const pricingOptions: ('Paid' | 'Free' | 'View Only')[] = ['Paid', 'Free'];
        const actual = filterReducer(initialState, setPricingOptions(pricingOptions));
        expect(actual.pricingOptions).toEqual(pricingOptions);
    });

    it('should handle togglePricingOption - add option', () => {
        const state = { ...initialState, pricingOptions: ['Paid'] };
        const actual = filterReducer(state, togglePricingOption('Free'));
        expect(actual.pricingOptions).toEqual(['Paid', 'Free']);
    });

    it('should handle togglePricingOption - remove option', () => {
        const state = { ...initialState, pricingOptions: ['Paid', 'Free'] };
        const actual = filterReducer(state, togglePricingOption('Paid'));
        expect(actual.pricingOptions).toEqual(['Free']);
    });

    it('should handle setSearchKeyword', () => {
        const keyword = 'test search';
        const actual = filterReducer(initialState, setSearchKeyword(keyword));
        expect(actual.searchKeyword).toEqual(keyword);
    });

    it('should handle setSortBy', () => {
        const actual = filterReducer(initialState, setSortBy('price-high'));
        expect(actual.sortBy).toEqual('price-high');
    });

    it('should handle setPriceRange', () => {
        const priceRange: [number, number] = [10, 50];
        const actual = filterReducer(initialState, setPriceRange(priceRange));
        expect(actual.priceRange).toEqual(priceRange);
    });

    it('should handle resetFilters', () => {
        const state = {
            pricingOptions: ['Paid'],
            searchKeyword: 'test',
            sortBy: 'price-high' as const,
            priceRange: [10, 50],
        };
        const actual = filterReducer(state, resetFilters());
        expect(actual).toEqual(initialState);
    });
});