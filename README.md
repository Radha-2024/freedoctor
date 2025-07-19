# FreeDoctor App

A React application built with Vite and Supabase for healthcare services.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your actual Supabase credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## Deployment

### Vercel Deployment

1. **Connect your repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure environment variables in Vercel:**
   - In your Vercel project settings, go to "Environment Variables"
   - Add the following variables:
     - `VITE_SUPABASE_URL` = `https://xgvkhkacaxlzrlciyjcf.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase anonymous key

3. **Deploy:**
   - Vercel will automatically build and deploy your application
   - Every push to the main branch will trigger a new deployment

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Supabase
- **Deployment**: Vercel
- **Styling**: CSS

## Environment Variables

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous/public key

⚠️ **Security Note**: Never commit your actual `.env` file. The `.env.example` file is provided as a template.