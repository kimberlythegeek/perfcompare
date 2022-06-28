import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { connect, useDispatch } from 'react-redux';

import { clearCheckedRevisions } from '../../reducers/CheckedRevisions';
import type { Revision, State } from '../../types/state';
import AddRevisionButton from '../Search/AddRevisionButton';
import SearchDropdown from '../Search/SearchDropdown';
import SearchInput from '../Search/SearchInput';
import SearchResultsList from '../Search/SearchResultsList';

function RevisionSearch(props: RevisionSearchProps) {
  const [focused, setFocused] = useState(false);
  const { searchResults, view, widths } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('mousedown', (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).matches(
          `#revision-search-container, 
          #revision-search-container *:not(.spacer),
          #search-results-container`,
        )
      ) {
        setFocused(true);
      } else {
        setFocused(false);
        dispatch(clearCheckedRevisions());
      }
    });
  });

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocused(false);
        dispatch(clearCheckedRevisions());
      }
    });
  });

  return (
    <div id="revision-search-container">
      <Grid container>
        {view == 'search' && <Grid item xs={1} className="spacer" />}
        <Grid item xs={widths.dropdown}>
          <SearchDropdown />
        </Grid>
        <Grid item xs={widths.input}>
          <SearchInput />
        </Grid>
        <Grid item xs={widths.button}>
          <AddRevisionButton />
        </Grid>
      </Grid>
      <Grid container>
        {view == 'search' && <Grid item xs={1} className="spacer" />}
        <Grid item xs={widths.searchResults}>
          {searchResults.length > 0 && focused && (
            <SearchResultsList view={view} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

interface RevisionSearchProps {
  searchResults: Revision[];
  view: 'compare-results' | 'search';
  widths: {
    dropdown: number;
    input: number;
    button: number;
    searchResults: number;
  };
}

function mapStateToProps(state: State) {
  return {
    searchResults: state.search.searchResults,
  };
}

export default connect(mapStateToProps)(RevisionSearch);
