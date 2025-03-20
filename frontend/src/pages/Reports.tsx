import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

export default function Reports() {
  const [reportType, setReportType] = useState('loan-disbursement');
  const [dateRange, setDateRange] = useState('last-6-months');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleReportTypeChange = (event: any) => {
    setReportType(event.target.value);
  };

  const handleDateRangeChange = (event: any) => {
    setDateRange(event.target.value);
  };

  const handleGenerateReport = () => {
    // TODO: Implement report generation logic
    console.log('Generating report:', { reportType, dateRange, startDate, endDate });
  };

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Exporting report');
  };

  const handlePrint = () => {
    // TODO: Implement print logic
    console.log('Printing report');
  };

  const handleShare = () => {
    // TODO: Implement share logic
    console.log('Sharing report');
  };

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log('Refreshing report');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <Box>
          <Tooltip title="Export">
            <IconButton onClick={handleExport}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Report Controls */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={handleReportTypeChange}
                  >
                    <MenuItem value="loan-disbursement">Loan Disbursement</MenuItem>
                    <MenuItem value="loan-repayment">Loan Repayment</MenuItem>
                    <MenuItem value="client-statistics">Client Statistics</MenuItem>
                    <MenuItem value="financial-summary">Financial Summary</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={handleDateRangeChange}
                  >
                    <MenuItem value="last-6-months">Last 6 Months</MenuItem>
                    <MenuItem value="last-year">Last Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {dateRange === 'custom' && (
                <>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      type="date"
                      label="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Loans Disbursed
              </Typography>
              <Typography variant="h4">$28,500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Repayments
              </Typography>
              <Typography variant="h4">$24,800</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Clients
              </Typography>
              <Typography variant="h4">450</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recovery Rate
              </Typography>
              <Typography variant="h4">98.5%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Report
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>Interest Rate</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 