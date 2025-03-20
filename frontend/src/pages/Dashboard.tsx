import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Sample data for charts
const loanData = [
  { name: 'Jan', disbursed: 4000, collected: 2400 },
  { name: 'Feb', disbursed: 3000, collected: 1398 },
  { name: 'Mar', disbursed: 2000, collected: 9800 },
  { name: 'Apr', disbursed: 2780, collected: 3908 },
  { name: 'May', disbursed: 1890, collected: 4800 },
  { name: 'Jun', disbursed: 2390, collected: 3800 },
];

const portfolioData = [
  { name: 'Performing', value: 4000 },
  { name: 'Watch', value: 3000 },
  { name: 'Substandard', value: 2000 },
  { name: 'Doubtful', value: 2780 },
  { name: 'Loss', value: 1890 },
];

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      bgcolor: color,
      color: 'white',
    }}
  >
    <Typography component="h2" variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Clients"
            value="1,234"
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Loans"
            value="456"
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Portfolio at Risk"
            value="12.5%"
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Collections"
            value="$45,678"
            color="#ed6c02"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Loan Disbursements vs Collections
            </Typography>
            <ResponsiveContainer>
              <BarChart
                data={loanData}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                  left: 24,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="disbursed" fill="#1976d2" name="Disbursed" />
                <Bar dataKey="collected" fill="#2e7d32" name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Portfolio Quality
            </Typography>
            <ResponsiveContainer>
              <LineChart
                data={portfolioData}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                  left: 24,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  name="Amount"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 