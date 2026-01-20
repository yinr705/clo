import type {ContentItem} from '../types/api';

export const fetchContentData = async (): Promise<ContentItem[]> => {
    try {
        const response = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map((item: { pricingOption: number; }) => {
            let pricingOption;
            if (item.pricingOption === 0) {
                pricingOption = 'Paid'
            } else if (item.pricingOption === 1) {
                pricingOption = 'Free'
            } else if (item.pricingOption === 2) {
                pricingOption = 'View Only'
            }
            return Object.assign({}, item, {pricingOption});
        });
    } catch (error) {
        console.error('Failed to fetch content data:', error);
        throw error;
    }
};