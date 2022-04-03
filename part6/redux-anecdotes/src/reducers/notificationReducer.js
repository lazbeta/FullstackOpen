import { createSlice } from "@reduxjs/toolkit"

let timeout;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        showNotification (state, action) {
            state.push(action.payload.message)
         },

        clearNotifications (state , action) {
            state.splice(0,state.length)
        },
     },
    })

export const {showNotification, clearNotifications} = notificationSlice.actions

export const setTheNotifications = (message, expirationTime = 5) => {
    return async dispatch => {
         dispatch(showNotification(message))
        if (timeout) {
            clearTimeout(timeout)
        }
         timeout = setTimeout(() => {
            dispatch(clearNotifications())
        }, expirationTime * 1000)
    }
}
export default notificationSlice.reducer
