import { useSnackbar, VariantType } from 'notistack';

import { maxRevisionsError } from '../common/constants';
import {
  clearCheckedRevisions,
  setSelectedRevisions,
} from '../reducers/RevisionSlice';
import type { Revision } from '../types/state';
import { truncateHash } from '../utils/helpers';
import { useAppDispatch, useAppSelector } from './app';

const useSelectRevision = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const checkedRevisions = useAppSelector((state) => state.revisions.checked);

  const selectedRevisions = useAppSelector((state) => state.revisions.selected);

  const warningVariant: VariantType = 'warning';

  const enqueueAlreadySelectedAlert = (
    item: Revision,
    variant: VariantType,
  ) => {
    enqueueSnackbar(
      `Revision ${truncateHash(item.revision)} is already selected.`,
      {
        variant,
      },
    );
  };

  const addSelectedRevisions = () => {
    const newSelected = [...selectedRevisions];

    checkedRevisions.every((item) => {
      const isSelected = selectedRevisions.includes(item);

      // Do not allow adding more than four revisions
      if (selectedRevisions.length == 4) {
        enqueueSnackbar(maxRevisionsError as string, {
          variant: warningVariant,
        });
        return false;
      }

      if (!isSelected) {
        newSelected.push(item);
      } else if (isSelected) {
        enqueueAlreadySelectedAlert(item, warningVariant);
      }

      return true;
    });
    dispatch(setSelectedRevisions(newSelected));
    dispatch(clearCheckedRevisions());
  };

  return { addSelectedRevisions };
};

export default useSelectRevision;
