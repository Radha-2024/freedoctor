# FreeDoctorMed - Medical Camp Management System

A comprehensive web application for managing medical camp submissions, approvals, and tracking. Built with React, Vite, Tailwind CSS, and Supabase.

## Features

- **User Authentication**: Secure registration and login system
- **Medical Camp Submission**: Easy-to-use form for submitting medical camp proposals
- **Dashboard**: Personal dashboard to track submitted camps and their status
- **Admin Panel**: Administrative interface for reviewing and approving camps
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Live status updates using Supabase real-time features

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time APIs)
- **Authentication**: Supabase Auth with Row Level Security
- **Database**: PostgreSQL with automated triggers and policies

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd freedoctor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the `.env` file and configure your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL script from `database/schema.sql`

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Database Schema

### Tables

#### profiles
- Extends user authentication with additional profile information
- Fields: id, full_name, organization, role, created_at, updated_at

#### medical_camps
- Stores medical camp submission data
- Fields: id, user_id, camp_name, description, camp_date, location, specialties, capacity, contact_info, additional_notes, status, created_at, updated_at

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Admins have access to all data for review and approval
- Secure authentication with Supabase Auth

## User Roles

### Regular User
- Register and login
- Submit medical camp proposals
- View personal dashboard with camp status
- Track submission history

### Administrator
- All regular user capabilities
- Access to admin dashboard
- Review all submitted camps
- Approve or reject camp proposals
- View system-wide statistics

## Test Accounts

For testing purposes, you can create an admin account:
- Email: admin@freedoctor.com
- Password: admin123
- Role: admin

## API Endpoints

The application uses Supabase's auto-generated REST APIs:

### Authentication
- `POST /auth/v1/signup` - User registration
- `POST /auth/v1/token?grant_type=password` - User login
- `POST /auth/v1/logout` - User logout

### Medical Camps
- `GET /rest/v1/medical_camps` - Get user's camps
- `POST /rest/v1/medical_camps` - Submit new camp
- `PATCH /rest/v1/medical_camps?id=eq.{id}` - Update camp status (admin)

### Profiles
- `GET /rest/v1/profiles` - Get user profile
- `PATCH /rest/v1/profiles?id=eq.{id}` - Update profile

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.jsx   # Main navigation component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   ├── SubmitCamp.jsx  # Camp submission form
│   └── AdminDashboard.jsx # Admin panel
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication context
├── utils/              # Utility functions
│   └── supabase.js     # Supabase client configuration
├── App.jsx             # Main app component with routing
├── main.jsx            # React app entry point
└── index.css           # Global styles with Tailwind
```

## Security Features

- **Authentication**: Secure user registration and login
- **Authorization**: Role-based access control
- **Input Validation**: Form validation on frontend and backend
- **SQL Injection Protection**: Parameterized queries through Supabase
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Supabase handles CSRF protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Vercel/Netlify

1. Connect your repository to your deployment platform
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Add your environment variables in the platform's settings

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.