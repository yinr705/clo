import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentItem from '../ContentList/ContentItem';
import type {ContentItem as ContentItemType} from '../../types/api';

describe('ContentItem', () => {
    const mockItem: ContentItemType = {
        id: '1',
        title: 'Test Fashion Item',
        creator: 'Designer Name',
        imagePath: 'test-image.jpg',
        pricingOption: 'Paid',
        price: 49.99,
    };

    it('should render content item with correct information', () => {
        render(<ContentItem item={mockItem} />);

        expect(screen.getByText('Test Fashion Item')).toBeInTheDocument();
        expect(screen.getByText('By Designer Name')).toBeInTheDocument();
        expect(screen.getByText('Paid')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
        expect(screen.getByAltText('Test Fashion Item')).toHaveAttribute('src', 'test-image.jpg');
    });

    it('should render free item without price', () => {
        const freeItem = { ...mockItem, pricingOption: 'Free', price: undefined };
        render(<ContentItem item={freeItem} />);

        expect(screen.getByText('Free')).toBeInTheDocument();
        expect(screen.queryByText('$')).not.toBeInTheDocument();
    });

    it('should render view only item without price', () => {
        const viewOnlyItem = { ...mockItem, pricingOption: 'View Only', price: undefined };
        render(<ContentItem item={viewOnlyItem} />);

        expect(screen.getByText('View Only')).toBeInTheDocument();
        expect(screen.queryByText('$')).not.toBeInTheDocument();
    });
});