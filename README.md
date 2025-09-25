# 🏢 Plannet Reservation App

A modern, Persian (RTL) office reservation system built with Next.js, featuring both client and admin interfaces. This application allows users to reserve meeting rooms, phone booths, and amphitheaters across multiple office locations.

## ✨ Features

### 🎯 Client-Side Features
- **User Authentication**: Simple username/password login system
- **Multi-Location Support**: Choose between Planet1 and Planet2 offices
- **Room Type Selection**: 
  - Meeting Rooms
  - Phone Call Booths
  - Amphitheaters
- **Persian Calendar Integration**: Full Jalali calendar with accurate date conversion
- **Smart Date/Time Selection**: 
  - Interactive calendar with month navigation
  - Time slot selection
  - Duration picker
- **Reservation Summary**: Confirmation popup with booking details
- **Reservation Management**: View all bookings in a table format
- **Mobile-First Design**: Optimized for mobile devices with responsive UI

### 🎨 UI/UX Features
- **RTL Support**: Full right-to-left layout for Persian language
- **Persian Typography**: Custom Kalameh font integration
- **Farsi Numerals**: All numbers displayed in Persian format
- **Modern Design**: Clean, intuitive interface with Tailwind CSS
- **Interactive Components**: Shadcn UI components for consistent design
- **Color-Coded Interface**: Custom color palette matching Figma designs

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5.4** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **Turbopack** for fast development

### Libraries & Dependencies
- **jalaali-js**: Accurate Jalali calendar conversion
- **@radix-ui/react-dialog**: Modal components
- **React Hooks**: useState, useEffect, useRef
- **Next.js Navigation**: Client-side routing

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Turbopack**: Fast bundling and hot reload

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd plannet-reservation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 User Flow

### 1. Authentication
- User enters username and password
- Simple validation and login process

### 2. Location Selection
- Choose between Planet1 or Planet2 office
- Visual cards with office details

### 3. Room Type Selection
- Select from available room types:
  - **Meeting Room**: For team meetings and discussions
  - **Phone Call Booth**: For private phone calls
  - **Amphitheater**: For presentations and large gatherings
- Each room type shows capacity and features

### 4. Date & Time Selection
- **Persian Calendar**: Interactive Jalali calendar
- **Month Navigation**: Navigate between months
- **Date Selection**: Choose available dates (past dates disabled)
- **Time Slots**: Select preferred time
- **Duration**: Choose reservation duration

### 5. Confirmation
- **Reservation Summary**: Review all booking details
- **Edit Options**: Modify selection before finalizing
- **Confirm Booking**: Complete the reservation

### 6. Success & Management
- **Success Page**: Confirmation of successful booking
- **View Reservations**: Table showing all user bookings
- **Reservation Details**: Complete booking information

## 🗓 Persian Calendar Implementation

### Key Features
- **Accurate Conversion**: Using `jalaali-js` library for precise date conversion
- **Month Navigation**: Navigate between Jalali months
- **Past Date Prevention**: Cannot select dates before current date
- **Weekday Display**: Correct Persian weekday names
- **Leap Year Support**: Proper handling of Jalali leap years

### Technical Implementation
```typescript
import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js'

// Convert Gregorian to Jalali
const jalaliDate = toJalaali(2024, 10, 3) // { jy: 1403, jm: 7, jd: 3 }

// Convert Jalali to Gregorian  
const gregorianDate = toGregorian(1403, 7, 3) // { gy: 2024, gm: 10, gd: 3 }

// Get month length
const daysInMonth = jalaaliMonthLength(1403, 7) // 30 days
```

## 🎨 Design System

### Colors
- **Primary**: Custom blue palette
- **Secondary**: Gray tones for UI elements
- **Success**: Green for confirmations
- **Warning**: Orange for alerts
- **Error**: Red for errors

### Typography
- **Font**: Kalameh (Persian font)
- **RTL Support**: Right-to-left text direction
- **Farsi Numerals**: All numbers in Persian format

### Components
- **Cards**: Room selection and information display
- **Buttons**: Primary, secondary, and disabled states
- **Inputs**: Form fields with validation
- **Modals**: Confirmation dialogs
- **Calendar**: Interactive date picker

## 📁 Project Structure

```
plannet-reservation-app/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout with RTL support
│   ├── page.tsx             # Login page
│   ├── place-selection/     # Office location selection
│   ├── room-selection/      # Room type selection
│   ├── date-time-selection/ # Date, time, duration selection
│   ├── success/             # Reservation confirmation
│   └── reservations/        # View all reservations
├── components/
│   └── ui/                  # Shadcn UI components
├── lib/
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Configuration

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'kalameh': ['Kalameh', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## 🚀 Development Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📱 Mobile Responsiveness

- **Mobile-First Design**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets for easy interaction
- **Responsive Layout**: Adapts to different screen sizes
- **Fast Loading**: Optimized performance on mobile networks

## 🔮 Future Features (Planned)

### Admin Panel
- User management system
- Reservation oversight
- Analytics and reporting
- Room availability management

### Enhanced Features
- Email notifications
- Calendar integration
- Recurring reservations
- Advanced filtering
- User profiles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Design**: Based on Figma designs
- **Font**: Kalameh Persian font

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
