import { TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

import type { RootState } from '../../common/store';
import type { Revision } from '../../types/state';
import {
  truncateHash,
  getLatestCommitMessage,
  formatDate,
} from '../../utils/helpers';

function SearchResultsListItem(props: SearchResultsListItemProps) {
  const { index, item, handleToggle, view } = props;
  const isChecked: boolean = useSelector((state: RootState) =>
    state.checkedRevisions.revisions.includes(index),
  );
  const indexString = index.toString();

  const revisionHash = truncateHash(item.revision);
  const commitMessage = getLatestCommitMessage(item);

  return (
    <>
      {view == 'search' && (
        <ListItemButton
          key={item.id}
          id={indexString}
          onClick={(e) => handleToggle(e)}
        >
          <ListItem
            className="search-revision-item search-revision"
            disablePadding
          >
            <ListItemIcon className="search-revision-item-icon search-revision">
              <Checkbox
                className="search-revision-item-checkbox search-revision"
                edge="start"
                tabIndex={-1}
                disableRipple
                data-testid={`checkbox-${indexString}`}
                checked={isChecked}
              />
            </ListItemIcon>
            <ListItemText
              className="search-revision-item-text search-revision"
              primary={`${revisionHash} - ${commitMessage} `}
              secondary={`${item.author} - ${String(
                new Date(item.push_timestamp * 1000),
              )}`}
              primaryTypographyProps={{ noWrap: true }}
              secondaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        </ListItemButton>
      )}

      {view == 'compare-results' && (
        <ListItemButton
          key={item.id}
          id={indexString}
          onClick={(e) => handleToggle(e)}
        >
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell sx={{ border: 'none', width: '20px' }} align="left">
                  {revisionHash}
                </TableCell>
                <TableCell sx={{ border: 'none' }} align="left">
                  {commitMessage.slice(0, 60)}
                </TableCell>
                <TableCell sx={{ border: 'none' }} align="right">
                  {item.author}{' '}
                </TableCell>
                <TableCell
                  sx={{ border: 'none', width: '140px' }}
                  align="right"
                >
                  {formatDate(item.push_timestamp)}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          {/* <ListItem
            className="search-revision-item search-revision"
            disablePadding
          >
            <div style={{ float: 'left' }}>
              {`${revisionHash} - ${commitMessage.slice(0, 60)}`}
            </div>
            <div style={{ float: 'right', textAlign: 'right' }}>
              {`${item.author} - ${formatDate(item.push_timestamp)}`}
            </div>
          </ListItem> */}
        </ListItemButton>
      )}
    </>
  );
}

interface SearchResultsListItemProps {
  index: number;
  item: Revision;
  handleToggle: (e: React.MouseEvent) => void;
  view: 'compare-results' | 'search';
}

export default SearchResultsListItem;
