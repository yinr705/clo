import React from 'react';
import type {ContentItem as ContentItemType} from '../../types/api';
import styled from 'styled-components';

const ItemContainer = styled.div`
  border: 1px solid #000000;
  border-radius: 8px;
  overflow: hidden;
  background: #000000;
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
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start
`;

const ItemContentLeft = styled.div`
  
`;

const ItemTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #b1b0b0;
`;

const ItemUserName = styled.p`
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #8c8b8b;
`;

const ItemPricing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Option = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
`;

const Price = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
`;

interface ContentItemProps {
    item: ContentItemType;
}

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {
    return (
        <ItemContainer>
            <ItemImage src={item.imagePath} alt={item.title} />
            <ItemContent>
                <ItemContentLeft>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemUserName>By {item.creator}</ItemUserName>
                </ItemContentLeft>
                <ItemPricing>
                    {item.pricingOption !== 'Paid' && (
                        <Option>{item.pricingOption}</Option>
                    )}
                    {item.pricingOption === 'Paid' && item.price && (
                        <Price>${item.price}</Price>
                    )}
                </ItemPricing>
            </ItemContent>
        </ItemContainer>
    );
};

export default ContentItem;