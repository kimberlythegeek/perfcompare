import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';

import type { RootState } from '../../common/store';
import { Revision } from '../../types/state';
import PerfCompareHeader from '../Shared/PerfCompareHeader';
import SelectedRevisionsTable from '../Shared/SelectedRevisionsTable';
import CompareResultsTable from './CompareResultsTable';

function CompareResultsView(props: CompareResultsViewProps) {
  const { revisions, mode } = props;
  return (
    <Container maxWidth="lg">
      <PerfCompareHeader />
      <Grid container>
        <Grid item xs={12}>
          {revisions.length > 0 && (
            <SelectedRevisionsTable view="compare-results" />
          )}
        </Grid>
        <Grid item xs={12}>
          <CompareResultsTable mode={mode} />
        </Grid>
      </Grid>
    </Container>
  );
}

interface CompareResultsViewProps {
  revisions: Revision[];
  mode: 'light' | 'dark';
}

function mapStateToProps(state: RootState) {
  return {
    revisions: state.revisions.selected,
  };
}

export default connect(mapStateToProps)(CompareResultsView);
