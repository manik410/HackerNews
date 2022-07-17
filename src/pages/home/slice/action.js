import { createAsyncThunk } from '@reduxjs/toolkit'
import { searchNews,detailsNews } from '../../../utils/api-urls'
import { getApi } from '../../../utils/apis'

export const getNews = createAsyncThunk(
        'news',
        async (data,{rejectWithValue}) => {
            try {
                const res = await getApi(searchNews,{"query":data})
                if (res?.status===200) {
                    return res?.data
                }
                rejectWithValue(res.data)
            }
            catch (error) {
                return rejectWithValue(error)
            }
    }
)

export const newsDetail = createAsyncThunk(
    'news/detail',
    async (data,{rejectWithValue}) => {
        try {
            const res = await getApi(`${detailsNews}/${data}`)
            if (res?.status===200) {
                return res?.data
            }
            rejectWithValue(res.data)
        }
        catch (error) {
            return rejectWithValue(error)
        }
}
)