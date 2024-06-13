import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSpotifyData:any = createAsyncThunk(
  'spotify/fetchData',
  async () => {
    const response = await fetch("https://www.one-api.ir/spotify/?token=837928:666a31f3b868f&action=new");
    const data = await response.json();
    return data;
  }
);


const spotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyData.pending, (state:any) => {
        state.status = 'loading';
      })
      .addCase(fetchSpotifyData.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSpotifyData.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default spotifySlice.reducer;
