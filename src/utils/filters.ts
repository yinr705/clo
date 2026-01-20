import type {ContentItem, FilterState} from '../types/api';

export const filterContent = (
    items: ContentItem[],
    filters: FilterState
): ContentItem[] => {
    const filteredItems = items.filter(item => {
        // price filter
        if (filters.pricingOptions.length > 0) {
            if (!filters.pricingOptions.includes(item.pricingOption)) {
                return false;
            }
        }

        // key word filter
        if (filters.searchKeyword.trim() !== '') {
            const keyword = filters.searchKeyword.toLowerCase();
            const matchesTitle = item.title.toLowerCase().includes(keyword);
            const matchesUserName = item.creator.toLowerCase().includes(keyword);
            if (!matchesTitle && !matchesUserName) {
                return false;
            }
        }

        // price range filter
        if (item.pricingOption === 'Paid' && item.price !== undefined) {
            const [minPrice, maxPrice] = filters.priceRange;
            if (item.price < minPrice || item.price > maxPrice) {
                return false;
            }
        }

        return true;
    });

    // for sort
    filteredItems.sort((a, b) => {
        switch (filters.sortBy) {
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'name':
            default:
                return a.title.localeCompare(b.title);
        }
    });

    return filteredItems;
};