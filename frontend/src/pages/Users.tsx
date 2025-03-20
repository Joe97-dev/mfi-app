import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  TablePagination,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, History as HistoryIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

interface UserActivity {
  id: number;
  userId: number;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  status: yup.string().required('Status is required'),
  permissions: yup.array().of(yup.string()).min(1, 'At least one permission is required'),
});

// Sample data
const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    permissions: ['manage_users', 'view_reports', 'manage_loans'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Loan Officer',
    status: 'active',
    permissions: ['view_reports', 'manage_loans'],
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Data Entry',
    status: 'inactive',
    permissions: ['view_reports'],
  },
  // Add more sample users for pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    name: `User ${i + 4}`,
    email: `user${i + 4}@example.com`,
    role: roles[i % roles.length],
    status: (i % 3 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
    permissions: [permissions[i % permissions.length]],
  })),
];

const initialActivities: UserActivity[] = [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    action: 'Login',
    details: 'User logged in successfully',
    timestamp: '2024-03-15T10:30:00',
  },
  {
    id: 2,
    userId: 2,
    userName: 'Jane Smith',
    action: 'Update',
    details: 'Updated client information',
    timestamp: '2024-03-15T09:15:00',
  },
  {
    id: 3,
    userId: 3,
    userName: 'Bob Wilson',
    action: 'Create',
    details: 'Created new loan application',
    timestamp: '2024-03-15T08:45:00',
  },
];

const roles = ['Admin', 'Loan Officer', 'Data Entry', 'View Only'];
const permissions = [
  'manage_users',
  'view_reports',
  'manage_loans',
  'manage_clients',
  'manage_payments',
  'export_data',
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [activities, setActivities] = useState<UserActivity[]>(initialActivities);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showActivityLog, setShowActivityLog] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      status: 'active' as 'active' | 'inactive',
      permissions: [] as string[],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userData: User = {
        id: editingUser ? editingUser.id : users.length + 1,
        ...values,
      };

      if (editingUser) {
        setUsers(users.map(user =>
          user.id === editingUser.id ? userData : user
        ));
        // Add activity log
        setActivities([{
          id: activities.length + 1,
          userId: userData.id,
          userName: userData.name,
          action: 'Update',
          details: 'Updated user information',
          timestamp: new Date().toISOString(),
        }, ...activities]);
      } else {
        setUsers([...users, userData]);
        // Add activity log
        setActivities([{
          id: activities.length + 1,
          userId: userData.id,
          userName: userData.name,
          action: 'Create',
          details: 'Created new user',
          timestamp: new Date().toISOString(),
        }, ...activities]);
      }
      handleClose();
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      formik.setValues({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        permissions: user.permissions,
      });
    } else {
      setEditingUser(null);
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    formik.resetForm();
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'error';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setShowActivityLog(true)}
          >
            Activity Log
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen(null)}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {user.permissions.map((permission) => (
                        <Chip
                          key={permission}
                          label={permission.replace('_', ' ')}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="role"
                  label="Role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="status"
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Permissions</InputLabel>
                  <Select
                    multiple
                    name="permissions"
                    value={formik.values.permissions}
                    onChange={formik.handleChange}
                    error={formik.touched.permissions && Boolean(formik.errors.permissions)}
                    input={<OutlinedInput label="Permissions" />}
                  >
                    {permissions.map((permission) => (
                      <MenuItem key={permission} value={permission}>
                        {permission.replace('_', ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.permissions && formik.errors.permissions && (
                    <Typography color="error" variant="caption">
                      {formik.errors.permissions}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => formik.handleSubmit()} variant="contained">
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activity Log Dialog */}
      <Dialog
        open={showActivityLog}
        onClose={() => setShowActivityLog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>User Activity Log</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.userName}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.details}</TableCell>
                    <TableCell>
                      {new Date(activity.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowActivityLog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 