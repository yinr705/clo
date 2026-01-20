import contentReducer, { fetchContent, clearContent } from '../contentSlice';
import type {ContentItem} from '../../../types/api';

describe('contentSlice', () => {
    const initialState = {
        items: [],
        loading: false,
        error: null,
    };

    const mockContentItem: ContentItem = {
        id: '1',
        title: 'Test Item',
        creator: 'Test User',
        imagePath: 'test.jpg',
        pricingOption: 'Paid',
        price: 29.99,
    };

    it('should return the initial state', () => {
        expect(contentReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle clearContent', () => {
        const state = { items: [mockContentItem], loading: false, error: null };
        const actual = contentReducer(state, clearContent());
        expect(actual.items).toEqual([]);
    });

    it('should handle fetchContent.pending', () => {
        const action = { type: fetchContent.pending.type };
        const state = contentReducer(initialState, action);
        expect(state).toEqual({ items: [], loading: true, error: null });
    });

    it('should handle fetchContent.fulfilled', () => {
        const action = {
            type: fetchContent.fulfilled.type,
            payload: [mockContentItem]
        };
        const state = contentReducer(initialState, action);
        expect(state).toEqual({
            items: [mockContentItem],
            loading: false,
            error: null
        });
    });

    it('should handle fetchContent.rejected', () => {
        const action = {
            type: fetchContent.rejected.type,
            error: { message: 'Network Error' }
        };
        const state = contentReducer(initialState, action);
        expect(state).toEqual({
            items: [],
            loading: false,
            error: 'Network Error'
        });
    });
});