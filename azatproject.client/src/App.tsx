import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { AppBar, Box, Button, Container, CssBaseline, Toolbar, Typography, TextField, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { User } from "./types/user/User";
import { getUsers, createUser, updateUser, deleteUser } from "./api/user/usersApi";
import { UserRole, roles, UserRoleLabels } from "./enums/UserRole";
import UsersTable from "./components/user/UsersTable";
import UserDialog from "./components/user/UserDialog";

function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, "id">>({
    fullName: "",
    email: "",
    role: UserRole.User,
    createdAt: new Date().toISOString()
  });

  // Фильтры
  const [filterText, setFilterText] = useState("");
  const [filterRole, setFilterRole] = useState<number | 'all'>('all');

  const filteredUsers = useMemo(() => {
    const term = filterText.trim().toLowerCase();
    return users.filter(u => {
      const byText = !term || u.fullName.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
      const byRole = filterRole === 'all' || u.role === filterRole;
      return byText && byRole;
    });
  }, [users, filterText, filterRole]);

  // Загрузка пользователей
  const load = async () => setUsers(await getUsers());
  useEffect(() => { load(); }, []);

  // Открыть модал для создания
  const handleCreate = () => {
    setEditingUser(null);
    setForm({ fullName: "", email: "", role: UserRole.User, createdAt: new Date().toISOString() });
    setOpen(true);
  };

  // Открыть модал для редактирования
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({ ...user });
    setOpen(true);
  };

  // Сохранить пользователя (создать или обновить)
  const handleSave = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, { ...editingUser, ...form });
    } else {
      await createUser(form);
    }
    setOpen(false);
    load();
  };

  // Удалить пользователя
  const handleDelete = async (id: number) => {
    if (window.confirm("Удалить пользователя?")) {
      await deleteUser(id);
      load();
    }
  };

  // Обработчики формы
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    const value = Number(e.target.value) as typeof UserRole[keyof typeof UserRole];
    setForm(prev => ({ ...prev, role: value }));
  };

  // Обработчик фильтра по роли
  const handleFilterRoleChange = (e: SelectChangeEvent) => {
    const v = e.target.value;
    setFilterRole(v === 'all' ? 'all' : Number(v));
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Управление пользователями
            </Typography>
            <Button color="inherit" onClick={handleCreate}>
              Создать пользователя
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main"
             sx={{
               flex: 1,
               display: 'flex',
               py: 1
             }}>
          <Container sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }} >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <TextField
                size="small"
                label="Поиск (имя/email)"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <Select
                size="small"
                value={String(filterRole)}
                onChange={handleFilterRoleChange}
                displayEmpty
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="all">Все роли</MenuItem>
                {roles.map(r => (
                  <MenuItem key={r} value={String(r)}>{UserRoleLabels[r]}</MenuItem>
                ))}
              </Select>
            </Box>

            <UsersTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
          </Container>
        </Box>

        <UserDialog
          open={open}
          editingUser={editingUser}
          form={form}
          onClose={() => setOpen(false)}
          onTextChange={handleTextChange}
          onRoleChange={handleRoleChange}
          onSave={handleSave}
        />
      </Box>
    </>
  );
}

export default App;