import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../../store';
import { setSortBy } from '../../store/slices/filterSlice';
import styled from 'styled-components';

const SortContainer = styled.div`
  padding: 20px;
  background: #000000;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SortSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  background: #000000;
  color: #f0f0f0;
`;

const SortFilter: React.FC = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state: RootState) => state.filters.sortBy);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortBy(event.target.value as 'name' | 'price-high' | 'price-low'));
    };

    return (
        <SortContainer>
            <SortSelect value={sortBy} onChange={handleSortChange}>
                <option value="name">Item Name</option>
                <option value="price-high">Higher Price</option>
                <option value="price-low">Lower Price</option>
            </SortSelect>
        </SortContainer>
    );
};

export default SortFilter;