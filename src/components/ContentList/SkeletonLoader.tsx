import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
  background-size: 800px 104px;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: #e0e0e0;
`;

const SkeletonContent = styled.div`
  padding: 15px;
`;

const SkeletonLine = styled.div<{ width?: string }>`
  height: 12px;
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
`;

interface SkeletonLoaderProps {
    count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonItem key={index}>
                    <SkeletonImage />
                    <SkeletonContent>
                        <SkeletonLine width="80%" />
                        <SkeletonLine width="60%" />
                        <SkeletonLine width="40%" />
                    </SkeletonContent>
                </SkeletonItem>
            ))}
        </>
    );
};

export default SkeletonLoader;