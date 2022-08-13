import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RevisionsState } from '../types/state';
import type { Revision } from '../types/state';

const initialState: RevisionsState = {
  checked: [],
  selected: [],
};

const revisions = createSlice({
  name: 'revisions',
  initialState,
  reducers: {
    clearCheckedRevisions(state) {
      state.checked = initialState.checked;
    },
    // toggleCheckedRevision(state)
    setCheckedRevisions(state, action: PayloadAction<Revision[]>) {
      state.checked = action.payload;
    },
    setSelectedRevisions(state, action: PayloadAction<Revision[]>) {
      state.selected = action.payload;
    },
    deleteSelectedRevision(state, action: PayloadAction<number>) {
      state.selected.splice(action.payload, 1);
    },
  },
});

export const {
  clearCheckedRevisions,
  setCheckedRevisions,
  setSelectedRevisions,
  deleteSelectedRevision,
} = revisions.actions;
export default revisions.reducer;
