import { filterContent } from '../filters';
import type {ContentItem, FilterState} from '../../types/api';

describe('filterContent', () => {
    const mockItems: ContentItem[] = [
        {
            id: '1',
            title: 'Paid Item',
            creator: 'User A',
            imagePath: 'paid.jpg',
            pricingOption: 'Paid',
            price: 50,
        },
        {
            id: '2',
            title: 'Free Item',
            creator: 'User B',
            imagePath: 'free.jpg',
            pricingOption: 'Free',
        },
        {
            id: '3',
            title: 'View Only Item',
            creator: 'User C',
            imagePath: 'viewonly.jpg',
            pricingOption: 'View Only',
        },
        {
            id: '4',
            title: 'Another Paid Item',
            creator: 'User A',
            imagePath: 'paid2.jpg',
            pricingOption: 'Paid',
            price: 100,
        },
    ];

    it('should return all items when no filters applied', () => {
        const filters: FilterState = {
            pricingOptions: [],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(4);
    });

    it('should filter by pricing options', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid'],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(2);
        expect(result.every(item => item.pricingOption === 'Paid')).toBe(true);
    });

    it('should filter by multiple pricing options', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid', 'Free'],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(3);
        expect(result.some(item => item.pricingOption === 'Paid')).toBe(true);
        expect(result.some(item => item.pricingOption === 'Free')).toBe(true);
    });

    it('should filter by search keyword in title', () => {
        const filters: FilterState = {
            pricingOptions: [],
            searchKeyword: 'Paid',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(2);
        expect(result.every(item => item.title.includes('Paid'))).toBe(true);
    });

    it('should filter by search keyword in user name', () => {
        const filters: FilterState = {
            pricingOptions: [],
            searchKeyword: 'User A',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(2);
        expect(result.every(item => item.creator === 'User A')).toBe(true);
    });

    it('should filter by price range', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid'],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 75],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(1);
        expect(result[0].price).toBe(50);
    });

    it('should sort by name (default)', () => {
        const filters: FilterState = {
            pricingOptions: [],
            searchKeyword: '',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result[0].title).toBe('Another Paid Item');
        expect(result[1].title).toBe('Free Item');
    });

    it('should sort by higher price', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid'],
            searchKeyword: '',
            sortBy: 'price-high',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result[0].price).toBe(100);
        expect(result[1].price).toBe(50);
    });

    it('should sort by lower price', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid'],
            searchKeyword: '',
            sortBy: 'price-low',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result[0].price).toBe(50);
        expect(result[1].price).toBe(100);
    });

    it('should combine multiple filters', () => {
        const filters: FilterState = {
            pricingOptions: ['Paid'],
            searchKeyword: 'Another',
            sortBy: 'name',
            priceRange: [0, 999],
        };
        const result = filterContent(mockItems, filters);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Another Paid Item');
    });
});