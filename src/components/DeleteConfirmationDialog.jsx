import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this post?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={onConfirm} color='secondary' autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
