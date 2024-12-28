import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function AddDialog({
  open,
  editingUser,
  handleSave,
  handleClose,
  addedData,
  setAddedData,
  addedDataError,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{"Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={addedData?.name ?? editingUser?.name}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.name}</p>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={addedData?.email ?? editingUser?.email}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.email}</p>

        <RadioGroup
          value={addedData?.group ?? editingUser?.group}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, group: e.target.value }))
          }
          name="radio-buttons-group"
        >
          <FormControlLabel value="HR" control={<Radio />} label="normal" />
          <FormControlLabel value="NORMAL" control={<Radio />} label="hr" />
        </RadioGroup>
        <p style={{ color: "red" }}>{addedDataError.group}</p>

        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={addedData?.password}
          onChange={(e) =>
            setAddedData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p style={{ color: "red" }}>{addedDataError.password}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
