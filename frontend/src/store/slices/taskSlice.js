import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../thunks/taskThunk";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: []
    },
    extraReducers(builder) {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
            console.log(state.tasks);
        })
    }
})

export default taskSlice.reducer;