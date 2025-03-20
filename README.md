# MicroFinance Pro Web Application

A comprehensive microfinance management system built with React, Node.js, and PostgreSQL.

## Features

- Client Management
  - Client registration and profile management
  - Document storage
  - Client history tracking

- Loan Management
  - Loan application processing
  - Loan disbursement tracking
  - Repayment scheduling
  - Loan status monitoring

- Financial Reports
  - Loan arrears report
  - Non-Performing Loans (NPL) report
  - Collection reports
  - Overdue loans tracking
  - Portfolio at Risk (PAR) analysis
  - Client recruitment statistics
  - Loan disbursement reports

- User Management
  - Role-based access control
  - User authentication and authorization
  - Activity logging

- System Settings
  - Loan interest rate management
  - Client eligibility management
  - Loan repayment plan management

## Tech Stack

- Frontend: React with TypeScript, Material-UI
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: JWT
- Deployment: AWS (EC2, RDS, S3)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)
- AWS Account (for deployment)

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/microfinance-app.git
cd microfinance-app
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend (.env)
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configuration
```

4. Set up the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE microfinance_db;

# Run migrations
cd backend
npm run migrate
```

5. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Deployment

### AWS Setup

1. Create an AWS account if you don't have one
2. Set up the following AWS services:
   - EC2 instance for the application server
   - RDS instance for PostgreSQL
   - S3 bucket for file storage
   - Route 53 for domain management (optional)

### Backend Deployment

1. Build the backend:
```bash
cd backend
npm run build
```

2. Deploy to EC2:
```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-instance

# Clone the repository
git clone https://github.com/yourusername/microfinance-app.git
cd microfinance-app/backend

# Install dependencies
npm install --production

# Set up environment variables
cp .env.example .env
# Edit .env with production configuration

# Start the server
npm start
```

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to S3:
```bash
# Install AWS CLI
aws s3 sync dist/ s3://your-bucket-name/
```

3. Configure CloudFront (optional):
   - Create a CloudFront distribution
   - Point it to your S3 bucket
   - Set up SSL certificate

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=production
DB_HOST=your-rds-endpoint
DB_PORT=5432
DB_NAME=microfinance_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET=your_s3_bucket
```

### Frontend (.env)
```
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=MicroFinance Pro
```

## Security Considerations

1. Enable HTTPS for all endpoints
2. Implement rate limiting
3. Set up proper CORS configuration
4. Use environment variables for sensitive data
5. Implement proper error handling
6. Set up monitoring and logging
7. Regular security updates

## Monitoring and Maintenance

1. Set up CloudWatch for monitoring
2. Configure automated backups
3. Set up alerts for critical issues
4. Regular dependency updates
5. Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 