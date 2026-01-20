import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../../store';
import { setSearchKeyword } from '../../store/slices/filterSlice';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchFilter: React.FC = () => {
    const dispatch = useDispatch();
    const searchKeyword = useSelector((state: RootState) => state.filters.searchKeyword);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchKeyword(event.target.value));
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="Search by title or user name..."
                value={searchKeyword}
                onChange={handleSearchChange}
            />
        </SearchContainer>
    );
};

export default SearchFilter;