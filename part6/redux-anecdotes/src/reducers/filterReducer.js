import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAnecdotes( state, action ) {
            const filter = action.payload.filter
            return filter
        }
    }
})

export const {filterAnecdotes} = filterSlice.actions
export default filterSlice.reducer