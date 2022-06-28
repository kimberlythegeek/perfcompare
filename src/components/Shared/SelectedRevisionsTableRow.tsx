import React from 'react';

import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';

import { repoMap } from '../../common/constants';
import { deleteRevision } from '../../reducers/SelectedRevisions';
import { Repository, Revision } from '../../types/state';
import {
  formatDate,
  getLatestCommitMessage,
  getTreeherderURL,
  truncateHash,
} from '../../utils/helpers';
import RevisionSearch from '../Shared/RevisionSearch';

function SelectedRevisionsTableRow(props: SelectedRevisionsRowProps) {
  const [open, setOpen] = React.useState(false);
  const { row, index, view } = props;
  const dispatch = useDispatch();
  const commitMessage = getLatestCommitMessage(row);
  const date = formatDate(row.push_timestamp);
  const hash = truncateHash(row.revision);
  const repository = repoMap[row.repository_id] as Repository['name'];
  const treeherderURL = getTreeherderURL(row.revision, repository);
  const anchorEl = document.getElementById(row.revision);
  const elementWidths = { dropdown: 2, input: 9, button: 1, searchResults: 12 };

  return (
    <>
      <TableRow key={row.id} id={row.revision}>
        <TableCell>
          <div className="cellStyle">{index === 0 ? 'BASE' : 'NEW'}</div>
        </TableCell>
        <TableCell>{repository}</TableCell>
        <TableCell>
          <Link href={treeherderURL}>{hash}</Link>
        </TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>
          <div className="commit-message">{commitMessage}</div>
        </TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>
          {view == 'search' && (
            <IconButton
              id="close-button"
              aria-labal="remove selected revision"
              onClick={() => dispatch(deleteRevision(row.id))}
            >
              <Close />
            </IconButton>
          )}
          {view == 'compare-results' && (
            <IconButton
              id={`edit-revision-button-${index}`}
              aria-label={`edit-revision-${row.id}`}
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: '90%' },
        }}
      >
        <RevisionSearch view={view} widths={elementWidths} />
      </Popover>
    </>
  );
}

interface SelectedRevisionsRowProps {
  row: Revision;
  index: number;
  view: 'search' | 'compare-results';
}

export default SelectedRevisionsTableRow;
