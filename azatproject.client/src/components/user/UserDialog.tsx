import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { User } from "../../types/user/User";
import { roles, UserRoleLabels } from "../../enums/UserRole";

type UserDialogProps = {
  open: boolean;
  editingUser: User | null;
  form: Omit<User, "id">;
  onClose: () => void;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRoleChange: (e: SelectChangeEvent) => void;
  onSave: () => void;
};

export default function UserDialog({
  open,
  editingUser,
  form,
  onClose,
  onTextChange,
  onRoleChange,
  onSave
}: UserDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{editingUser ? "Редактировать пользователя" : "Создать пользователя"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          name="fullName"
          label="Имя"
          value={form.fullName}
          onChange={onTextChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          name="email"
          label="Email"
          value={form.email}
          onChange={onTextChange}
          fullWidth
          required
          type="email"
        />
        <Select
          name="role"
          label="Роль"
          value={String(form.role)}
          onChange={onRoleChange}
          fullWidth
          sx={{ mt: 2 }}
        >
          {roles.map((r) => (
            <MenuItem key={r} value={String(r)}>{UserRoleLabels[r]}</MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onSave}>
          {editingUser ? "Сохранить" : "Создать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}