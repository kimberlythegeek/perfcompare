import * as React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';

import store from '../../common/store';
import { fetchRecentRevisions } from '../../thunks/searchThunk';
import { State } from '../../types/state';
import { handleChangeSearch } from '../../utils/searchViewHelper';

class SearchInput extends React.Component<SearchInputProps> {
  componentDidMount() {
    const repo = store.getState().search.repository;
    store.dispatch(fetchRecentRevisions(repo));
  }

  render() {
    const { handleFocus, inputError, inputHelperText } = this.props;
    return (
      <Grid item xs={7}>
        {!inputError && !inputHelperText ? (
          /* text field without errors */
          <TextField
            label="Search By Revision ID or Author Email"
            id="search-revision-input"
            onFocus={handleFocus}
            variant="outlined"
            sx={{ width: '100%' }}
            onChange={handleChangeSearch}
          />
        ) : (
          /* text field with errors */
          <TextField
            error
            helperText={inputHelperText}
            label="Search By Revision ID or Author Email"
            id="search-revision-input"
            onFocus={handleFocus}
            variant="outlined"
            sx={{ width: '100%' }}
            onChange={handleChangeSearch}
          />
        )}
      </Grid>
    );
  }
}

interface SearchInputProps {
  handleFocus: (e: React.FocusEvent) => void;
  inputError: boolean;
  inputHelperText: string;
}

function mapStateToProps(state: State) {
  return {
    inputError: state.search.inputError,
    inputHelperText: state.search.inputHelperText,
    searchResults: state.search.searchResults,
  };
}

export default connect(mapStateToProps)(SearchInput);
