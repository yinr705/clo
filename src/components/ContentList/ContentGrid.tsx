import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  padding: 20px;
  
  /* grid layout */
  grid-template-columns: repeat(4, 1fr);
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

interface ContentGridProps {
    children: React.ReactNode;
}

const ContentGrid: React.FC<ContentGridProps> = ({ children }) => {
    return <GridContainer>{children}</GridContainer>;
};

export default ContentGrid;