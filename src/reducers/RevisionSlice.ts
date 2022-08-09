import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Revision, RevisionState } from '../types/state';

const initialState: RevisionState = {
  checked: [],
  selected: [],
};

const revisions = createSlice({
  name: 'revisions',
  initialState,
  reducers: {
    clearCheckedRevisions(state) {
      const checkedSet = new Set(state.checked);
      checkedSet.clear();
      state.checked = Array.from(checkedSet);
    },
    addCheckedRevision(state, action: PayloadAction<Revision>) {
      const checkedSet = new Set(state.checked);
      checkedSet.add(action.payload);
      state.checked = Array.from(checkedSet);
    },
    removeCheckedRevision(state, action: PayloadAction<Revision>) {
      const checkedSet = new Set(state.checked);
      checkedSet.delete(action.payload);
      state.checked = Array.from(checkedSet);
    },
    clearSelectedRevisions(state) {
      const selectedSet = new Set(state.selected);
      selectedSet.clear();
      state.selected = Array.from(selectedSet);
    },
    addSelectedRevision(state, action: PayloadAction<Revision>) {
      const selectedSet = new Set(state.selected);
      selectedSet.add(action.payload);
      state.selected = Array.from(selectedSet);
    },
    removeSelectedRevision(state, action: PayloadAction<Revision>) {
      const selectedSet = new Set(state.selected);
      selectedSet.delete(action.payload);
      state.selected = Array.from(selectedSet);
    },
  },
});

export const {
  clearCheckedRevisions,
  addCheckedRevision,
  removeCheckedRevision,
  clearSelectedRevisions,
  addSelectedRevision,
  removeSelectedRevision,
} = revisions.actions;
export default revisions.reducer;
