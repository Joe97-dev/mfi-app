import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface SystemSettings {
  organizationName: string;
  currency: string;
  dateFormat: string;
  timeZone: string;
  maxLoanAmount: number;
  minLoanAmount: number;
  defaultInterestRate: number;
  latePaymentPenalty: number;
  enableSMSNotifications: boolean;
  enableEmailNotifications: boolean;
  enableAutoReminders: boolean;
  reminderDaysBeforeDue: number;
  enableOnlinePayments: boolean;
  paymentGateway: string;
  enableClientPortal: boolean;
  enableMobileApp: boolean;
  // Backup Settings
  enableAutomatedBackups: boolean;
  backupFrequency: string;
  backupTime: string;
  backupStorage: string;
  backupRetentionDays: number;
  backupCompression: boolean;
  backupEncryption: boolean;
  backupIncludeFiles: boolean;
  backupIncludeDatabase: boolean;
  backupNotificationEmail: string;
}

const validationSchema = yup.object({
  organizationName: yup.string().required('Organization name is required'),
  currency: yup.string().required('Currency is required'),
  dateFormat: yup.string().required('Date format is required'),
  timeZone: yup.string().required('Time zone is required'),
  maxLoanAmount: yup.number().required('Maximum loan amount is required').positive('Amount must be positive'),
  minLoanAmount: yup.number().required('Minimum loan amount is required').positive('Amount must be positive'),
  defaultInterestRate: yup.number().required('Default interest rate is required').positive('Rate must be positive'),
  latePaymentPenalty: yup.number().required('Late payment penalty is required').min(0, 'Penalty cannot be negative'),
  reminderDaysBeforeDue: yup.number().required('Reminder days is required').min(1, 'Must be at least 1 day'),
  backupRetentionDays: yup.number().required('Backup retention days is required').min(1, 'Must be at least 1 day'),
  backupNotificationEmail: yup.string().email('Invalid email format'),
});

const initialSettings: SystemSettings = {
  organizationName: 'MicroFinance Pro',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  timeZone: 'UTC',
  maxLoanAmount: 10000,
  minLoanAmount: 100,
  defaultInterestRate: 12,
  latePaymentPenalty: 5,
  enableSMSNotifications: true,
  enableEmailNotifications: true,
  enableAutoReminders: true,
  reminderDaysBeforeDue: 3,
  enableOnlinePayments: true,
  paymentGateway: 'stripe',
  enableClientPortal: true,
  enableMobileApp: false,
  // Backup Settings
  enableAutomatedBackups: true,
  backupFrequency: 'daily',
  backupTime: '02:00',
  backupStorage: 'local',
  backupRetentionDays: 30,
  backupCompression: true,
  backupEncryption: true,
  backupIncludeFiles: true,
  backupIncludeDatabase: true,
  backupNotificationEmail: 'admin@microfinancepro.com',
};

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];
const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
const timeZones = ['UTC', 'EST', 'PST', 'GMT'];
const paymentGateways = ['stripe', 'paypal', 'razorpay'];
const backupFrequencies = ['daily', 'weekly', 'monthly'];
const backupStorageOptions = ['local', 's3', 'google-drive', 'dropbox'];

export default function Settings() {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: settings,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSettings(values);
      setShowSuccess(true);
    },
  });

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Organization Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Organization Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="organizationName"
                label="Organization Name"
                value={formik.values.organizationName}
                onChange={formik.handleChange}
                error={formik.touched.organizationName && Boolean(formik.errors.organizationName)}
                helperText={formik.touched.organizationName && formik.errors.organizationName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  label="Currency"
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Date Format</InputLabel>
                <Select
                  name="dateFormat"
                  value={formik.values.dateFormat}
                  onChange={formik.handleChange}
                  label="Date Format"
                >
                  {dateFormats.map((format) => (
                    <MenuItem key={format} value={format}>
                      {format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time Zone</InputLabel>
                <Select
                  name="timeZone"
                  value={formik.values.timeZone}
                  onChange={formik.handleChange}
                  label="Time Zone"
                >
                  {timeZones.map((zone) => (
                    <MenuItem key={zone} value={zone}>
                      {zone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Loan Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Loan Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="maxLoanAmount"
                label="Maximum Loan Amount"
                type="number"
                value={formik.values.maxLoanAmount}
                onChange={formik.handleChange}
                error={formik.touched.maxLoanAmount && Boolean(formik.errors.maxLoanAmount)}
                helperText={formik.touched.maxLoanAmount && formik.errors.maxLoanAmount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="minLoanAmount"
                label="Minimum Loan Amount"
                type="number"
                value={formik.values.minLoanAmount}
                onChange={formik.handleChange}
                error={formik.touched.minLoanAmount && Boolean(formik.errors.minLoanAmount)}
                helperText={formik.touched.minLoanAmount && formik.errors.minLoanAmount}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="defaultInterestRate"
                label="Default Interest Rate (%)"
                type="number"
                value={formik.values.defaultInterestRate}
                onChange={formik.handleChange}
                error={formik.touched.defaultInterestRate && Boolean(formik.errors.defaultInterestRate)}
                helperText={formik.touched.defaultInterestRate && formik.errors.defaultInterestRate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="latePaymentPenalty"
                label="Late Payment Penalty (%)"
                type="number"
                value={formik.values.latePaymentPenalty}
                onChange={formik.handleChange}
                error={formik.touched.latePaymentPenalty && Boolean(formik.errors.latePaymentPenalty)}
                helperText={formik.touched.latePaymentPenalty && formik.errors.latePaymentPenalty}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Notification Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableSMSNotifications"
                    checked={formik.values.enableSMSNotifications}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable SMS Notifications"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableEmailNotifications"
                    checked={formik.values.enableEmailNotifications}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableAutoReminders"
                    checked={formik.values.enableAutoReminders}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Auto Reminders"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="reminderDaysBeforeDue"
                label="Reminder Days Before Due"
                type="number"
                value={formik.values.reminderDaysBeforeDue}
                onChange={formik.handleChange}
                error={formik.touched.reminderDaysBeforeDue && Boolean(formik.errors.reminderDaysBeforeDue)}
                helperText={formik.touched.reminderDaysBeforeDue && formik.errors.reminderDaysBeforeDue}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Integration Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Integration Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableOnlinePayments"
                    checked={formik.values.enableOnlinePayments}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Online Payments"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Gateway</InputLabel>
                <Select
                  name="paymentGateway"
                  value={formik.values.paymentGateway}
                  onChange={formik.handleChange}
                  label="Payment Gateway"
                >
                  {paymentGateways.map((gateway) => (
                    <MenuItem key={gateway} value={gateway}>
                      {gateway.charAt(0).toUpperCase() + gateway.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableClientPortal"
                    checked={formik.values.enableClientPortal}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Client Portal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableMobileApp"
                    checked={formik.values.enableMobileApp}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Mobile App"
              />
            </Grid>

            {/* Backup Settings */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Backup Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="enableAutomatedBackups"
                    checked={formik.values.enableAutomatedBackups}
                    onChange={formik.handleChange}
                  />
                }
                label="Enable Automated Backups"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Backup Frequency</InputLabel>
                <Select
                  name="backupFrequency"
                  value={formik.values.backupFrequency}
                  onChange={formik.handleChange}
                  label="Backup Frequency"
                  disabled={!formik.values.enableAutomatedBackups}
                >
                  {backupFrequencies.map((frequency) => (
                    <MenuItem key={frequency} value={frequency}>
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="backupTime"
                label="Backup Time"
                type="time"
                value={formik.values.backupTime}
                onChange={formik.handleChange}
                disabled={!formik.values.enableAutomatedBackups}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Backup Storage</InputLabel>
                <Select
                  name="backupStorage"
                  value={formik.values.backupStorage}
                  onChange={formik.handleChange}
                  label="Backup Storage"
                  disabled={!formik.values.enableAutomatedBackups}
                >
                  {backupStorageOptions.map((storage) => (
                    <MenuItem key={storage} value={storage}>
                      {storage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="backupRetentionDays"
                label="Backup Retention (Days)"
                type="number"
                value={formik.values.backupRetentionDays}
                onChange={formik.handleChange}
                error={formik.touched.backupRetentionDays && Boolean(formik.errors.backupRetentionDays)}
                helperText={formik.touched.backupRetentionDays && formik.errors.backupRetentionDays}
                disabled={!formik.values.enableAutomatedBackups}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="backupNotificationEmail"
                label="Backup Notification Email"
                value={formik.values.backupNotificationEmail}
                onChange={formik.handleChange}
                error={formik.touched.backupNotificationEmail && Boolean(formik.errors.backupNotificationEmail)}
                helperText={formik.touched.backupNotificationEmail && formik.errors.backupNotificationEmail}
                disabled={!formik.values.enableAutomatedBackups}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="backupCompression"
                    checked={formik.values.backupCompression}
                    onChange={formik.handleChange}
                    disabled={!formik.values.enableAutomatedBackups}
                  />
                }
                label="Enable Backup Compression"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="backupEncryption"
                    checked={formik.values.backupEncryption}
                    onChange={formik.handleChange}
                    disabled={!formik.values.enableAutomatedBackups}
                  />
                }
                label="Enable Backup Encryption"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="backupIncludeFiles"
                    checked={formik.values.backupIncludeFiles}
                    onChange={formik.handleChange}
                    disabled={!formik.values.enableAutomatedBackups}
                  />
                }
                label="Include Files in Backup"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="backupIncludeDatabase"
                    checked={formik.values.backupIncludeDatabase}
                    onChange={formik.handleChange}
                    disabled={!formik.values.enableAutomatedBackups}
                  />
                }
                label="Include Database in Backup"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Save Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 