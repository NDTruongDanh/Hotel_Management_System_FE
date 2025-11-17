# Login Page - Hotel Management System

## Overview

The login page has been successfully implemented following the design specifications from `/docs/page-description.md` and `/docs/ui-specifications.md`.

## Features Implemented

### 1. **Login Form**

- ✅ Username/Email field (Tên đăng nhập hoặc Email)
- ✅ Password field (Mật khẩu) with show/hide toggle
- ✅ "Remember Password" checkbox (Nhớ mật khẩu)
- ✅ "Forgot Password" link (Quên mật khẩu?)
- ✅ Login button (Đăng nhập)
- ✅ Error message display for invalid credentials

### 2. **Mock Authentication**

- ✅ Three test accounts with different roles:
  - **Admin**: `admin@hotel.com` / `admin123`
  - **Manager (Quản lý)**: `manager@hotel.com` / `manager123`
  - **Receptionist (Lễ tân)**: `receptionist@hotel.com` / `letan123`
- ✅ Can login with either email or employee ID (maNhanVien)
- ✅ Session storage for maintaining login state
- ✅ Role-based redirect to dashboard after successful login

### 3. **Design System Compliance**

- ✅ Color palette from `ui-specifications.md`:
  - Primary Blue (#1E40AF) for buttons and accents
  - Gray neutrals for text and borders
  - Error colors (#DC2626) for error messages
  - Success colors for successful states
- ✅ Typography: Clear hierarchy with proper font sizes
- ✅ Spacing: Consistent padding and margins (md: 16px, lg: 24px)
- ✅ Form inputs: 40px height with proper border radius (6px)
- ✅ Responsive design for mobile, tablet, and desktop

### 4. **User Experience**

- ✅ Loading state during authentication
- ✅ Clear error messages in Vietnamese
- ✅ Icons from lucide-react for visual clarity
- ✅ Smooth transitions and hover states
- ✅ Accessibility features (proper labels, ARIA attributes)

## File Structure

```
Hotel_Management_System_FE/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Main login page component
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard placeholder (post-login)
│   └── globals.css               # Theme colors and CSS variables
├── components/
│   └── ui/
│       ├── button.tsx            # Reusable button component
│       └── input.tsx             # Reusable input component (NEW)
├── lib/
│   ├── mock-auth.ts              # Mock authentication service (NEW)
│   └── utils.ts                  # Utility functions
└── src/
    └── constants/
        └── icons.enum.tsx        # Centralized icons from lucide-react (NEW)
```

## How to Test

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Navigate to Login Page

Open browser and go to: `http://localhost:3000/login`

### 3. Test with Demo Accounts

#### Admin Account

- **Username**: `admin@hotel.com` or `NV001`
- **Password**: `admin123`
- **Expected**: Redirects to dashboard with "Admin" role

#### Manager Account

- **Username**: `manager@hotel.com` or `NV002`
- **Password**: `manager123`
- **Expected**: Redirects to dashboard with "Quản lý" role

#### Receptionist Account

- **Username**: `receptionist@hotel.com` or `NV003`
- **Password**: `letan123`
- **Expected**: Redirects to dashboard with "Lễ tân" role

### 4. Test Error Handling

- Enter invalid credentials
- **Expected**: Error message "Tên đăng nhập hoặc mật khẩu không đúng" appears in red

## Component Details

### Login Page (`app/(auth)/login/page.tsx`)

- Full-screen centered layout with hotel branding
- Form validation and error handling
- Loading states during authentication
- Show/hide password toggle
- Demo credentials display for testing

### Mock Authentication (`lib/mock-auth.ts`)

- `mockLogin()`: Validates credentials and returns user data
- `getCurrentUser()`: Retrieves logged-in user from session storage
- `mockLogout()`: Clears session storage
- User interface with role-based properties

### Input Component (`components/ui/input.tsx`)

- Styled according to design system
- Focus states with blue ring (Primary-500)
- Proper disabled states
- Flexible for reuse across the application

### Icons Enum (`src/constants/icons.enum.tsx`)

- Centralized icon management
- Pre-imported from lucide-react
- Consistent icon usage across the app

## Design System Implementation

### Colors Used

```css
/* Primary */
--primary-blue-600: #1E40AF  /* Buttons, headers */
--primary-blue-500: #3B82F6  /* Focus rings, hover states */
--primary-blue-100: #DBEAFE  /* Icon backgrounds */

/* Neutrals */
--gray-900: #111827  /* Primary text */
--gray-700: #374151  /* Secondary text */
--gray-500: #6B7280  /* Placeholder text */
--gray-300: #D1D5DB  /* Borders */
--gray-50: #F9FAFB   /* Page background */

/* Status - Error */
--error-600: #DC2626  /* Error text and borders */
--error-100: #FEE2E2  /* Error background */
```

### Typography

- **Headings**: h2 (text-3xl/32px, font-bold)
- **Body**: text-sm (14px) for form labels and inputs
- **Small**: text-xs (12px) for helper text

### Spacing

- Card padding: p-8 (32px)
- Form spacing: space-y-6 (24px between fields)
- Input height: h-10 (40px)

## Next Steps

1. **Dashboard Implementation**: Expand the dashboard with KPI cards, charts, and navigation
2. **Protected Routes**: Add middleware to protect authenticated routes
3. **Role-Based Access**: Implement permission checks based on user role
4. **Password Reset**: Implement "Quên mật khẩu?" functionality
5. **Remember Me**: Persist login using localStorage/cookies

## Vietnamese Language

All UI text is in Vietnamese as per requirements:

- Form labels: "Tên đăng nhập", "Mật khẩu"
- Buttons: "Đăng nhập", "Đăng xuất"
- Messages: "Đăng nhập thành công", "Tên đăng nhập hoặc mật khẩu không đúng"

## Notes

- The login page follows UC preconditions from `page-description.md`
- Authentication checks PHANQUYEN table (simulated with mock data)
- Successful login redirects to Dashboard based on role
- Failed login displays error and keeps user on login page
- All styling adheres to the design system in `ui-specifications.md`
