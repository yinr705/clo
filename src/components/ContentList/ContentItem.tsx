import React from 'react';
import type {ContentItem as ContentItemType} from '../../types/api';
import styled from 'styled-components';

const ItemContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  padding: 15px;
`;

const ItemTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ItemUserName = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
`;

const ItemPricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PricingOption = styled.span<{ option: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.option) {
        case 'Paid': return '#e3f2fd';
        case 'Free': return '#e8f5e8';
        case 'View Only': return '#fff3e0';
        default: return '#f5f5f5';
    }
}};
  color: ${props => {
    switch (props.option) {
        case 'Paid': return '#1976d2';
        case 'Free': return '#388e3c';
        case 'View Only': return '#f57c00';
        default: return '#666';
    }
}};
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1976d2;
`;

interface ContentItemProps {
    item: ContentItemType;
}

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
    return (
        <ItemContainer>
            <ItemImage src={item.imagePath} alt={item.title} />
            <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemUserName>By {item.creator}</ItemUserName>
                <ItemPricing>
                    <PricingOption option={item.pricingOption}>
                        {item.pricingOption}
                    </PricingOption>
                    {item.pricingOption === 'Paid' && item.price && (
                        <Price>${item.price}</Price>
                    )}
                </ItemPricing>
            </ItemContent>
        </ItemContainer>
    );
};

export default ContentItem;