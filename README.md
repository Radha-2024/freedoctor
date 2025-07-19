# FreeDoctor App

A React application built with Vite and integrated with Supabase for backend services.

## Features

- React 18 with Vite for fast development and building
- Supabase integration for backend services
- Ready for deployment on Vercel

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Supabase account and project

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd freedoctor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment on Vercel

### Automatic Deployment (Recommended)

1. **Fork or clone this repository** to your GitHub account

2. **Visit [Vercel](https://vercel.com)** and sign in with your GitHub account

3. **Import your repository**:
   - Click "New Project"
   - Select your `freedoctor` repository
   - Vercel will automatically detect the framework (Vite)

4. **Configure Environment Variables**:
   Before deploying, add your environment variables in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Manual Deployment with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts to configure your deployment.

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

## Supabase Setup

1. **Create a Supabase project**:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get your credentials**:
   - Go to Project Settings > API
   - Copy the Project URL and anon/public key
   - Add these to your `.env` file (locally) and Vercel environment variables (for deployment)

3. **Configure your database**:
   - Use the Supabase dashboard to create tables
   - Set up authentication if needed
   - Configure RLS (Row Level Security) policies

## Project Structure

```
freedoctor/
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── supabaseClient.js    # Supabase client configuration
├── dist/                    # Production build output (generated)
├── .env.example             # Environment variables template
├── .env                     # Environment variables (not committed)
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Environment Variables

The application uses the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**Important**: Never commit your actual environment variables to the repository. Always use the `.env.example` file as a template.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.