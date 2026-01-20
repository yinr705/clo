import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type {ContentItem} from '../../types/api';
import { fetchContentData } from '../../utils/api';

interface ContentState {
    items: ContentItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ContentState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const response = await fetchContentData();
        return response;
    }
);

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        clearContent: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContent.fulfilled, (state, action: PayloadAction<ContentItem[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch content';
            });
    },
});

export const { clearContent } = contentSlice.actions;
export default contentSlice.reducer;