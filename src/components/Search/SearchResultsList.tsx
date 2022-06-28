import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { connect } from 'react-redux';

import useCheckRevision from '../../hooks/useCheckRevision';
import type { Revision, State } from '../../types/state';
import SearchResultsListItem from './SearchResultsListItem';

function SearchResultsList(props: SearchResultsListProps) {
  const { searchResults, view } = props;
  const { handleToggle } = useCheckRevision();
  return (
    <Box
      sx={{
        maxWidth: '100%',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'grey.500',
        borderRadius: '4px',
        '&:focus': {
          borderColor: 'primary.main',
        },
        '&:hover': {
          borderColor: 'text.primary',
        },
      }}
      alignItems="flex-end"
      className="search-results-container"
    >
      <List className="search-revision-list">
        {view == 'search' &&
          searchResults.map((item, index) => (
            <SearchResultsListItem
              key={item.id}
              index={index}
              item={item}
              handleToggle={handleToggle}
              view={view}
            />
          ))}
        {view == 'compare-results' &&
          searchResults
            .slice(0, 5)
            .map((item, index) => (
              <SearchResultsListItem
                key={item.id}
                index={index}
                item={item}
                handleToggle={handleToggle}
                view={view}
              />
            ))}
      </List>
    </Box>
  );
}

interface SearchResultsListProps {
  searchResults: Revision[];
  view: 'compare-results' | 'search';
}

function mapStateToProps(state: State) {
  return { searchResults: state.search.searchResults };
}

export default connect(mapStateToProps)(SearchResultsList);
