import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (chunkSize: number = 20) => {
    const [visibleItems, setVisibleItems] = useState(chunkSize);

    const loadMore = useCallback(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setVisibleItems(prev => prev + chunkSize);
        }
    }, [chunkSize]);

    useEffect(() => {
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadMore]);

    const resetVisibleItems = useCallback(() => {
        setVisibleItems(chunkSize);
    }, [chunkSize]);

    return { visibleItems, resetVisibleItems };
};