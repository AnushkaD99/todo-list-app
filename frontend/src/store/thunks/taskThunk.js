import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const getTasks = createAsyncThunk(
  "task/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("task", data);
      return response.data;
    } catch (error) {
        console.log(error);
       return rejectWithValue(error.response?.data || { message: "Failed to fetch tasks" });
    }
  }
);

export const markAsDoneTask = createAsyncThunk(
  "task/markAsDone",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`task/${taskId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to mark task as done" }
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.post("task", taskData);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to create task" }
      );
    }
  }
);