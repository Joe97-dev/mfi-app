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
  loanId: yup.number().required('Loan is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  paymentDate: yup.date().required('Payment date is required'),
  paymentType: yup.string().required('Payment type is required'),
});

// Sample data
const initialPayments = [
  {
    id: 1,
    loanId: 1,
    clientName: 'John Doe',
    loanType: 'Personal Loan',
    amount: 500,
    paymentDate: '2024-03-01',
    paymentType: 'Principal',
  },
  {
    id: 2,
    loanId: 2,
    clientName: 'Jane Smith',
    loanType: 'Business Loan',
    amount: 1000,
    paymentDate: '2024-03-01',
    paymentType: 'Interest',
  },
];

const loans = [
  { id: 1, clientName: 'John Doe', loanType: 'Personal Loan' },
  { id: 2, clientName: 'Jane Smith', loanType: 'Business Loan' },
];

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const formik = useFormik({
    initialValues: {
      loanId: '',
      amount: '',
      paymentDate: '',
      paymentType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loan = loans.find(l => l.id === values.loanId);
      
      const paymentData = {
        ...values,
        id: editingPayment ? editingPayment.id : payments.length + 1,
        clientName: loan.clientName,
        loanType: loan.loanType,
      };

      if (editingPayment) {
        setPayments(payments.map(payment =>
          payment.id === editingPayment.id ? paymentData : payment
        ));
      } else {
        setPayments([...payments, paymentData]);
      }
      handleClose();
    },
  });

  const handleOpen = (payment = null) => {
    if (payment) {
      setEditingPayment(payment);
      formik.setValues(payment);
    } else {
      setEditingPayment(null);
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPayment(null);
    formik.resetForm();
  };

  const handleDelete = (id) => {
    setPayments(payments.filter(payment => payment.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Record Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Loan Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.clientName}</TableCell>
                <TableCell>{payment.loanType}</TableCell>
                <TableCell>${payment.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(payment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(payment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingPayment ? 'Edit Payment' : 'Record Payment'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="loanId"
                  label="Loan"
                  value={formik.values.loanId}
                  onChange={formik.handleChange}
                  error={formik.touched.loanId && Boolean(formik.errors.loanId)}
                  helperText={formik.touched.loanId && formik.errors.loanId}
                >
                  {loans.map((loan) => (
                    <MenuItem key={loan.id} value={loan.id}>
                      {loan.clientName} - {loan.loanType}
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
                  name="paymentDate"
                  label="Payment Date"
                  type="date"
                  value={formik.values.paymentDate}
                  onChange={formik.handleChange}
                  error={formik.touched.paymentDate && Boolean(formik.errors.paymentDate)}
                  helperText={formik.touched.paymentDate && formik.errors.paymentDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  name="paymentType"
                  label="Payment Type"
                  value={formik.values.paymentType}
                  onChange={formik.handleChange}
                  error={formik.touched.paymentType && Boolean(formik.errors.paymentType)}
                  helperText={formik.touched.paymentType && formik.errors.paymentType}
                >
                  <MenuItem value="Principal">Principal</MenuItem>
                  <MenuItem value="Interest">Interest</MenuItem>
                  <MenuItem value="Penalty">Penalty</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit} variant="contained">
            {editingPayment ? 'Update' : 'Record'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 