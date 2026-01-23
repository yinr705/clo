import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../../store';
import { togglePricingOption } from '../../store/slices/filterSlice';
import styled from 'styled-components';

const FilterContainer = styled.div`
  padding: 20px;
  background: #000000;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FilterTitle = styled.h3`
  margin-bottom: 15px;
  color: #f0f0f0;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #f0f0f0;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;

const PricingFilter: React.FC = () => {
    const dispatch = useDispatch();
    const pricingOptions = useSelector((state: RootState) => state.filters.pricingOptions);

    const handleCheckboxChange = (option: 'Paid' | 'Free' | 'View Only') => {
        dispatch(togglePricingOption(option));
    };

    return (
        <FilterContainer>
            <FilterTitle>Pricing Options</FilterTitle>
            <CheckboxGroup>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={pricingOptions.includes('Paid')}
                        onChange={() => handleCheckboxChange('Paid')}
                    />
                    Paid
                </CheckboxLabel>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={pricingOptions.includes('Free')}
                        onChange={() => handleCheckboxChange('Free')}
                    />
                    Free
                </CheckboxLabel>
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={pricingOptions.includes('View Only')}
                        onChange={() => handleCheckboxChange('View Only')}
                    />
                    View Only
                </CheckboxLabel>
            </CheckboxGroup>
        </FilterContainer>
    );
};

export default PricingFilter;