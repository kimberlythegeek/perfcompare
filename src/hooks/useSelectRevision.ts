import { useSnackbar, VariantType } from 'notistack';

import { maxRevisionsError } from '../common/constants';
import {
  clearCheckedRevisions,
  addSelectedRevision,
} from '../reducers/RevisionSlice';
import { useAppDispatch, useAppSelector } from './app';

const useSelectRevision = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const checkedRevisions = useAppSelector((state) => state.revisions.checked);

  const selectedRevisions = useAppSelector((state) => state.revisions.selected);

  const addSelectedRevisions = () => {
    const variant: VariantType = 'warning';

    checkedRevisions.forEach((revision) => {
      // Do not allow adding more than four revisions
      if (selectedRevisions.length == 4) {
        enqueueSnackbar(maxRevisionsError, { variant });
        return false;
      }
      dispatch(addSelectedRevision(revision));
      return true;
    });
    dispatch(clearCheckedRevisions());
  };

  return { addSelectedRevisions };
};

export default useSelectRevision;
