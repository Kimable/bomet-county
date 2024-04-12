import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const markAttendanceSlice = createSlice({
  name: "markAttendance",
  initialState,
  reducers: {
    markAttendanceStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    markAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    markAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // assuming action.payload is an error object or standardized error format
    },
  },
});

export const { actions } = markAttendanceSlice;

export const markAttendance = (data) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.markAttendanceStart());

  try {
    const att = await fetch(`/api/user/markattendance/`, {
      method: "post",
      body: JSON.stringify(data),
      headers: { Authorization: token },
    });

    let response = await att.json();
    dispatch(actions.markAttendanceSuccess(response));
    return response;
  } catch (error) {
    // Standardizing error payload
    const errorPayload = {
      message: error.message,
      error,
      // Optionally, you can include additional fields like statusCode, details, etc.
    };
    dispatch(actions.markAttendanceFailure(errorPayload));
    return errorPayload;
  }
};

export default markAttendanceSlice.reducer;
