import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../../store';
import { setSearchKeyword } from '../../store/slices/filterSlice';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: #000000;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  background: #000000;
  color: #f0f0f0;

  &:focus {
    outline: none;
    border-color: #f0f0f0;
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