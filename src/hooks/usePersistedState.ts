import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../store';
import {
    setPricingOptions,
    setSearchKeyword,
    setSortBy,
    setPriceRange
} from '../store/slices/filterSlice';

export const usePersistedState = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    // 从URL参数恢复状态
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const pricingOptions = params.get('pricing');
        const searchKeyword = params.get('search');
        const sortBy = params.get('sort');
        const priceMin = params.get('priceMin');
        const priceMax = params.get('priceMax');

        if (pricingOptions) {
            dispatch(setPricingOptions(pricingOptions.split(',') as never));
        }
        if (searchKeyword) {
            dispatch(setSearchKeyword(searchKeyword));
        }
        if (sortBy && ['name', 'price-high', 'price-low'].includes(sortBy)) {
            dispatch(setSortBy(sortBy as never));
        }
        if (priceMin && priceMax) {
            dispatch(setPriceRange([Number(priceMin), Number(priceMax)]));
        }
    }, [dispatch]);

    // 状态变化时更新URL
    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.pricingOptions.length > 0) {
            params.set('pricing', filters.pricingOptions.join(','));
        }
        if (filters.searchKeyword) {
            params.set('search', filters.searchKeyword);
        }
        if (filters.sortBy !== 'name') {
            params.set('sort', filters.sortBy);
        }
        if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 999) {
            params.set('priceMin', filters.priceRange[0].toString());
            params.set('priceMax', filters.priceRange[1].toString());
        }

        const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }, [filters]);
};