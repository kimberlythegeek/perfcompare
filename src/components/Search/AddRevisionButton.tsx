import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import useSelectRevision from '../../hooks/useSelectRevision';

export default function AddRevisionButton() {
  const { addSelectedRevisions } = useSelectRevision();
  return (
    <Button
      variant="contained"
      className="add-revision-button"
      aria-label="add revisions"
      onClick={() => addSelectedRevisions()}
    >
      <AddIcon />
    </Button>
  );
}
