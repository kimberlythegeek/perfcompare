import { useSnackbar, VariantType } from 'notistack';

import { maxRevisionsError } from '../common/constants';
import {
  addCheckedRevision,
  removeCheckedRevision,
} from '../reducers/RevisionSlice';
import { Revision } from '../types/state';
import { useAppDispatch, useAppSelector } from './app';
const useCheckRevision = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const checkedRevisions = useAppSelector((state) => state.revisions.checked);

  const handleToggle = (revision: Revision) => {
    const isChecked = checkedRevisions.includes(revision);
    // if item is not already checked, add to checked
    if (checkedRevisions.length < 4 && !isChecked) {
      dispatch(addCheckedRevision(revision));
    } else if (isChecked) {
      // if item is already checked, remove from checked
      dispatch(removeCheckedRevision(revision));
    } else {
      // if there are already 4 checked revisions, print a warning
      const variant: VariantType = 'warning';
      enqueueSnackbar(maxRevisionsError, { variant });
    }
  };
  return { checkedRevisions, handleToggle };
};

export default useCheckRevision;
