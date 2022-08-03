import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import { Revision } from '../../types/state';
import RevisionSearch from '../Shared/RevisionSearch';

function EditRevisionButton(props: EditRevisionButtonProps) {
  const { index, row } = props;
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const anchorEl = document.getElementById(row.revision);

  const handleClick = () => {
    setPopoverIsOpen(true);
  };

  return (
    <>
      <IconButton
        id={`edit-revision-button-${index}`}
        aria-label={`edit-revision-${row.id}`}
        onClick={() => handleClick()}
      >
        <EditIcon />
      </IconButton>

      <Popover
        className="edit-revision-popover"
        open={popoverIsOpen}
        anchorEl={anchorEl}
        onClose={() => setPopoverIsOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container alignItems="center" justifyContent="center" xs={12}>
          <RevisionSearch
            view="compare-results"
            setPopoverIsOpen={setPopoverIsOpen}
          />
        </Grid>
      </Popover>
    </>
  );
}

interface EditRevisionButtonProps {
  index: number;
  row: Revision;
}

export default EditRevisionButton;
