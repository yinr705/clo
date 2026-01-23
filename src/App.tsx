import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from './store';
import { fetchContent } from './store/slices/contentSlice';
import { filterContent } from './utils/filters';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { usePersistedState } from './hooks/usePersistedState';

// 导入组件
import PricingFilter from './components/Filter/PricingFilter';
import SearchFilter from './components/Filter/SearchFilter';
import SortFilter from './components/Filter/SortFilter';
import PriceSlider from './components/Shared/PriceSlider';
import ResetButton from './components/Shared/ResetButton';
import ContentGrid from './components/ContentList/ContentGrid';
import ContentItem from './components/ContentList/ContentItem';
import SkeletonLoader from './components/ContentList/SkeletonLoader';

import styled from 'styled-components';
import {setPriceRange} from "./store/slices/filterSlice.ts";

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
`;

const Title = styled.h1`
  color: #00ff00;
  margin: 0;
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 20px;
  height: fit-content;
  background: #000000;  
`;

const MainContent = styled.main`
  flex: 1;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const App: React.FC = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state: RootState) => state.content);
    const filters = useSelector((state: RootState) => state.filters);

    const { visibleItems } = useInfiniteScroll(20);
    usePersistedState();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(fetchContent());
    }, [dispatch]);

    // filter and sort content
    const filteredItems = useMemo(() => {
        return filterContent(items, filters);
    }, [items, filters]);

    // slice content
    const visibleContent = filteredItems.slice(0, visibleItems);

    const isPaidSelected = filters.pricingOptions.includes('Paid');

    return (
        <AppContainer>
            <Header>
                <Title>CLO-SET CONNECT Store</Title>
            </Header>

            <FiltersContainer>
                <Sidebar>
                    <FilterHeader>
                        <h2 style={{color: '#00ff00'}}>Filters</h2>
                        <ResetButton />
                    </FilterHeader>

                    <SearchFilter />
                    <PricingFilter />
                    <SortFilter />
                    <PriceSlider
                        min={0}
                        max={999}
                        values={filters.priceRange}
                        onChange={(values) => dispatch(setPriceRange(values))}
                        disabled={!isPaidSelected}
                    />
                </Sidebar>

                <MainContent>
                    {loading ? (
                        <ContentGrid>
                            <SkeletonLoader count={8} />
                        </ContentGrid>
                    ) : (
                        <>
                            <div style={{ marginBottom: '20px', color: '#f0f0f0' }}>
                                Showing {visibleContent.length} of {filteredItems.length} items
                            </div>

                            <ContentGrid>
                                {visibleContent.map((item) => (
                                    <ContentItem key={item.id} item={item} />
                                ))}
                            </ContentGrid>

                            {visibleContent.length < filteredItems.length && (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#f0f0f0' }}>
                                    Scroll down to load more items...
                                </div>
                            )}
                        </>
                    )}
                </MainContent>
            </FiltersContainer>
        </AppContainer>
    );
};

export default App;