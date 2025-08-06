# Hairdresser Template

A modern, responsive Next.js website template designed specifically for hairdressers and salons. This template includes modular functionality for booking, staff management, gallery, blog, and services.

## Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modular Architecture**: Conditional rendering based on enabled modules
- **Dynamic Branding**: Customizable colors, fonts, and business information
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Modern styling with utility classes
- **Supabase Integration**: Real-time database and authentication
- **TypeScript**: Full type safety

## Modules

### 1. Services Module
- Display services in menu or card style
- Pricing information
- Service descriptions and durations
- Booking integration

### 2. Staff Module
- Team member profiles
- Staff avatars and bios
- Specialties and roles
- Interactive staff selection

### 3. Gallery Module
- Photo gallery with categories
- Filtering by category
- Image hover effects
- Portfolio showcase

### 4. Blog Module
- Blog posts with categories
- Featured images
- Reading time and view counts
- Category filtering

### 5. Booking Module
- Appointment scheduling
- Staff availability checking
- Service selection
- Customer information collection

## Configuration

The template uses a configuration system that allows for easy customization:

```typescript
export interface TemplateConfig {
  businessName: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  modules: string[];
  darkMode?: boolean;
  aiContent?: any;
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Database Schema

The template expects the following Supabase tables:

- `demo_services` - Service offerings
- `demo_staff` - Staff members
- `demo_staff_schedules` - Staff availability
- `demo_gallery_items` - Gallery images
- `demo_gallery_categories` - Gallery categories
- `demo_blog_posts` - Blog articles
- `demo_blog_categories` - Blog categories
- `demo_bookings` - Appointment bookings

## Installation

1. Clone the template
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

The template is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## Customization

### Colors and Branding
Update the `config.ts` file to customize:
- Business name
- Primary and accent colors
- Font family
- Enabled modules

### Module Configuration
Each module can be enabled/disabled by modifying the `modules` array in the configuration.

### Styling
The template uses Tailwind CSS with custom utilities. Modify `globals.css` for additional custom styles.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## License

This template is designed for use in the website builder platform and includes all necessary components for a production-ready hairdresser website. 