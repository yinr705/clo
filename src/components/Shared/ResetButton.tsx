import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../store/slices/filterSlice';
import styled from 'styled-components';

const ResetButtonStyled = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 20px;

  &:hover {
    background: #c82333;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
  }
`;

const ResetButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleReset = () => {
        dispatch(resetFilters());
    };

    return (
        <ResetButtonStyled onClick={handleReset}>
            Reset Filters
        </ResetButtonStyled>
    );
};

export default ResetButton;