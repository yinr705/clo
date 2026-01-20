import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

describe('useInfiniteScroll', () => {
    beforeEach(() => {
        // Mock window properties
        Object.defineProperty(window, 'innerHeight', { value: 800 });
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 0 });
        Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1600 });
        Object.defineProperty(document.documentElement, 'clientHeight', { value: 800 });
    });

    it('should initialize with default chunk size', () => {
        const { result } = renderHook(() => useInfiniteScroll());
        expect(result.current.visibleItems).toBe(20);
    });

    it('should initialize with custom chunk size', () => {
        const { result } = renderHook(() => useInfiniteScroll(10));
        expect(result.current.visibleItems).toBe(10);
    });

    it('should load more items when scrolled to bottom', () => {
        const { result } = renderHook(() => useInfiniteScroll(10));

        // Simulate scroll to bottom
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 800 });

        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.visibleItems).toBe(20);
    });

    it('should not load more items when not scrolled to bottom', () => {
        const { result } = renderHook(() => useInfiniteScroll(10));

        // Simulate scroll not at bottom
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 400 });

        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.visibleItems).toBe(10);
    });

    it('should reset visible items', () => {
        const { result } = renderHook(() => useInfiniteScroll(10));

        // First load more items
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 800 });
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.visibleItems).toBe(20);

        // Then reset
        act(() => {
            result.current.resetVisibleItems();
        });

        expect(result.current.visibleItems).toBe(10);
    });
});