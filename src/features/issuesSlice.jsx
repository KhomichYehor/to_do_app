import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: [],
  inProgress: [],
  done: [],
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    moveIssue: (state, action) => {
      const { from, to, fromIndex, toIndex } = action.payload;

      const issue = state[from][fromIndex];
      if (!issue) return; // Exit if the issue is undefined

      // Remove issue from the source column
      state[from].splice(fromIndex, 1);
      // Add issue to the destination column
      state[to].splice(toIndex, 0, issue);
    },
    setIssues(state, action) {
      state.todo = action.payload;
    },
  },
});

export const { moveIssue, setIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
