import { fetchContentData } from '../api';

// Mock the global fetch function
let global;
Object.defineProperty(global, 'fetch', {
    value: jest.fn(),
    writable: true,
});

describe('fetchContentData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch content data successfully', async () => {
        const mockData = [
            {
                id: '1',
                title: 'Test Item',
                creator: 'Test User',
                imagePath: 'test.jpg',
                pricingOption: 'Paid',
                price: 29.99,
            },
        ];

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await fetchContentData();
        expect(fetch).toHaveBeenCalledWith(
            'https://closet-recruiting-api.azurewebsites.net/api/data'
        );
        expect(result).toEqual(mockData);
    });

    it('should throw error when fetch fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(fetchContentData()).rejects.toThrow('HTTP error! status: 404');
    });

    it('should throw error when network error occurs', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchContentData()).rejects.toThrow('Network error');
    });
});