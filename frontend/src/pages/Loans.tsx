import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  clientId: yup.number().required('Client is required'),
  loanTypeId: yup.number().required('Loan type is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  interestRate: yup.number().required('Interest rate is required').positive('Interest rate must be positive'),
  termMonths: yup.number().required('Term is required').positive('Term must be positive'),
  status: yup.string().required('Status is required'),
});

// Sample data
const initialLoans = [
  {
    id: 1,
    clientId: 1,
    clientName: 'John Doe',
    loanTypeId: 1,
    loanType: 'Personal Loan',
    amount: 5000,
    interestRate: 12,
    termMonths: 12,
    status: 'Active',
    disbursementDate: '2024-01-01',
    dueDate: '2024-12-31',
  },
  {
    id: 2,
    clientId: 2,
    clientName: 'Jane Smith',
    loanTypeId: 2,
    loanType: 'Business Loan',
    amount: 10000,
    interestRate: 15,
    termMonths: 24,
    status: 'Active',
    disbursementDate: '2024-02-01',
    dueDate: '2026-01-31',
  },
];

const loanTypes = [
  { id: 1, name: 'Personal Loan', interestRate: 12, termMonths: 12 },
  { id: 2, name: 'Business Loan', interestRate: 15, termMonths: 24 },
  { id: 3, name: 'Emergency Loan', interestRate: 18, termMonths: 6 },
];

const clients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

export default function Loans() {
  const [loans, setLoans] = useState(initialLoans);
  const [open, setOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  const formik = useFormik({
    initialValues: {
      clientId: '',
      loanTypeId: '',
      amount: '',
      interestRate: '',
      termMonths: '',
      status: 'Pending',
      disbursementDate: '',
      dueDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loanType = loanTypes.find(lt => lt.id === values.loanTypeId);
      const client = clients.find(c => c.id === values.clientId);
      
      const loanData = {
        ...values,
        id: editingLoan ? editingLoan.id : loans.length + 1,
        clientName: client.name,
        loanType: loanType.name,
      };

      if (editingLoan) {
        setLoans(loans.map(loan =>
          loan.id === editingLoan.id ? loanData : loan
        ));
      } else {
        setLoans([...loans, loanData]);
      }
      handleClose();
    },
  });

  const handleOpen = (loan = null) => {
    if (loan) {
      setEditingLoan(loan);
      formik.setValues(loan);
    } else {
      setEditingLoan(null);
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLoan(null);
    formik.resetForm();
  };

  const handleDelete = (id) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Loans</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          New Loan
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Loan Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.clientName}</TableCell>
                <TableCell>{loan.loanType}</TableCell>
                <TableCell>${loan.amount.toLocaleString()}</TableCell>
                <TableCell>{loan.interestRate}%</TableCell>
                <TableCell>{loan.termMonths} months</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(loan)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(loan.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingLoan ? 'Edit Loan' : 'New Loan'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="clientId"
                  label="Client"
                  value={formik.values.clientId}
                  onChange={formik.handleChange}
                  error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                  helperText={formik.touched.clientId && formik.errors.clientId}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="loanTypeId"
                  label="Loan Type"
                  value={formik.values.loanTypeId}
                  onChange={formik.handleChange}
                  error={formik.touched.loanTypeId && Boolean(formik.errors.loanTypeId)}
                  helperText={formik.touched.loanTypeId && formik.errors.loanTypeId}
                >
                  {loanTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="interestRate"
                  label="Interest Rate (%)"
                  type="number"
                  value={formik.values.interestRate}
                  onChange={formik.handleChange}
                  error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                  helperText={formik.touched.interestRate && formik.errors.interestRate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="termMonths"
                  label="Term (months)"
                  type="number"
                  value={formik.values.termMonths}
                  onChange={formik.handleChange}
                  error={formik.touched.termMonths && Boolean(formik.errors.termMonths)}
                  helperText={formik.touched.termMonths && formik.errors.termMonths}
                />
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
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Defaulted">Defaulted</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit} variant="contained">
            {editingLoan ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 