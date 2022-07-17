import { createSlice } from "@reduxjs/toolkit";
import { getNews,newsDetail} from "./action";

const intitalState = {
  news: { loading: false, data: null, error: false},
  newsId:'',
  selectedNews:{ loading: false, data: null, error: false}
};

export const NewsSlice = createSlice({
  name: "news",
  initialState: intitalState,
  reducers: {
    resetNews:(state)=>{
      state.news=intitalState.news
      state.selectedNews=intitalState.selectedNews
      state.newsId=intitalState.newsId
    },
    setNews:(state,{payload})=>{
      state.newsId=payload
    }
  },
  extraReducers: {
    [getNews.pending]: (state, { payload }) => {
      state.news.loading = true;
      state.news.error=false;
      state.news.data=null
    },
    [getNews.fulfilled]: (state, { payload }) => {
      state.news.error = false;
      state.news.loading = false;
      state.news.data= payload;
    },
    [getNews.rejected]: (state, { payload }) => {
      state.news.error = true;
      state.news.loading = false;
      state.news.data = payload;
    },
    [newsDetail.pending]: (state, { payload }) => {
      state.selectedNews.loading = true;
      state.selectedNews.error=false;
      state.selectedNews.data=null
    },
    [newsDetail.fulfilled]: (state, { payload }) => {
      state.selectedNews.error = false;
      state.selectedNews.loading = false;
      state.selectedNews.data= payload;
    },
    [newsDetail.rejected]: (state, { payload }) => {
      state.selectedNews.error = true;
      state.selectedNews.loading = false;
      state.selectedNews.data = payload;
    },
  },
});

export const NewsSelector=(state)=>{
  return state.newsData.news
} 
export const NewsDetailSelector=(state)=>{
  return state.newsData.selectedNews
}
export const NewsIDSelector=(state)=>{
  return state.newsData.newsId
}
export const {resetNews,setNews}= NewsSlice.actions
export default NewsSlice.reducer;