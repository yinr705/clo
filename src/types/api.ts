export interface ContentItem {
    id: string;
    title: string;
    creator: string;
    imagePath: string;
    pricingOption: 'Paid' | 'Free' | 'View Only';
    price?: number;
    description?: string;
}

export interface FilterState {
    pricingOptions: ('Paid' | 'Free' | 'View Only')[];
    searchKeyword: string;
    sortBy: 'name' | 'price-high' | 'price-low';
    priceRange: [number, number];
}

export interface ApiResponse {
    data: ContentItem[];
    totalCount: number;
}