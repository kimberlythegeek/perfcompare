import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Revision, State } from '../../types/state';
import PerfCompareHeader from '../Shared/PerfCompareHeader';
import RevisionSearch from '../Shared/RevisionSearch';
import SelectedRevisionsTable from '../Shared/SelectedRevisionsTable';
import SearchViewInit from './SearchViewInit';

function SearchView(props: SearchViewProps) {
  const navigate = useNavigate();
  const goToCompareResultsPage = () => {
    navigate('/compare-results', { replace: false });
  };

  const { selectedRevisions } = props;
  const elementWidths = { dropdown: 2, input: 7, button: 1, searchResults: 10 };
  return (
    <Container maxWidth="lg">
      {/* Component to fetch recent revisions on mount */}
      <SearchViewInit />
      <PerfCompareHeader />
      <Grid item xs={12}>
        {selectedRevisions.length > 0 && (
          <SelectedRevisionsTable view="search" />
        )}
      </Grid>
      <Grid item className="compare-button-section">
        {selectedRevisions.length > 0 && (
          <Button
            className="compare-button"
            variant="contained"
            onClick={goToCompareResultsPage}
          >
            compare
            <ArrowForward className="compare-icon" />
          </Button>
        )}
      </Grid>
      <RevisionSearch view="search" widths={elementWidths} />
    </Container>
  );
}

interface SearchViewProps {
  selectedRevisions: Revision[];
}

function mapStateToProps(state: State) {
  return {
    selectedRevisions: state.selectedRevisions.revisions,
  };
}

export default connect(mapStateToProps)(SearchView);
