import { createSlice } from "@reduxjs/toolkit";
import { createTask, getTasks, markAsDoneTask } from "../thunks/taskThunk";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      console.log("Fetched tasks:", state.tasks);
    })

    .addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload.data);
      console.log("Tasks after create:", state.tasks);
    })
  },
});

export default taskSlice.reducer;