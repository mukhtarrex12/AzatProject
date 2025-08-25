import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "../../types/user/User";
import { roles, UserRoleLabels } from "../../enums/UserRole";

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Имя</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Роль</TableCell>
          <TableCell>Создан</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.id}</TableCell>
            <TableCell>{u.fullName}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{UserRoleLabels[u.role]}</TableCell>
            <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(u)}><EditIcon /></IconButton>
              <IconButton color="error" onClick={() => onDelete(u.id)}><DeleteIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}