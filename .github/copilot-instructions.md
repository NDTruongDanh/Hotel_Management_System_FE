# Hotel Management System - Frontend Development Guidelines

## Project Overview

This is a Next.js 16 (App Router) hotel management system frontend built with React 19, TypeScript, and Tailwind CSS 4. The system serves hotel staff (receptionist, manager, admin) with comprehensive booking, check-in/check-out, and payment management features.

**Key Documentation:**

- `/docs/page-description.md` - Complete screen specifications and workflows (Vietnamese)
- `/docs/ui-specifications.md` - Design system and component guidelines (Vietnamese)

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19.2.0
- **Styling:** Tailwind CSS 4 with @tailwindcss/postcss
- **Language:** TypeScript 5
- **Fonts:** Geist Sans & Geist Mono (next/font/google)
- **Path Aliases:** `@/*` maps to project root

## Design System (Strictly Follow)

### Color Palette

```typescript
// Primary: Professional Blue
Primary-600: #1E40AF  // Buttons, headers
Primary-500: #3B82F6  // Hover states
Primary-100: #DBEAFE  // Backgrounds

// Status Colors
Success-600: #059669   // Available rooms, successful operations
Warning-600: #D97706   // Rooms being cleaned, warnings
Error-600: #DC2626     // Maintenance, errors
Info-600: #0284C7      // Occupied rooms

// Neutrals
Gray-900: #111827      // Primary text
Gray-700: #374151      // Secondary text
Gray-300: #D1D5DB      // Borders
Gray-50: #F9FAFB       // Page backgrounds
```

### Typography

- **Font Family:** 'Inter' preferred, fallback to Geist Sans/system fonts
- **Headings:** h1 (32px/700), h2 (24px/600), h3 (20px/600)
- **Body:** Regular (14px/400), Small (12px/400)
- **Line Height:** 1.5 for body text, 1.2-1.3 for headings

### Spacing

Use Tailwind's 4px-based scale: xs(4px), sm(8px), md(16px), lg(24px), xl(32px)

### Component Patterns

- **Buttons:** Primary (bg-Primary-600), height 40px, rounded-md (6px), font-medium
- **Form Inputs:** height 40px, border-gray-300, rounded-md, focus:ring-primary-500
- **Cards:** white bg, rounded-lg (8px), shadow-sm, padding-5 (20px)
- **Status Badges:** pill-shaped (rounded-full), 12px text, font-medium
- **Tables:** Gray-50 header, hover:bg-gray-50 on rows

## Architecture

### App Router Structure

```
app/
  layout.tsx          # Root layout with Geist fonts
  page.tsx            # Dashboard/landing
  globals.css         # Tailwind imports + theme variables
  (auth)/
    login/            # Login screen (UC precondition)
  (dashboard)/
    dashboard/        # KPI cards, arrivals/departures
    rooms/            # Room management grid (UC1)
    room-types/       # Room type configuration (UC1.2)
    reservations/     # Calendar/timeline view (UC1.3)
    checkin-checkout/ # Tabs for check-in/out (UC1.4, UC1.5)
    services/         # Service management (UC1.6)
    payments/         # Payment processing modal (UC1.8)
    staff/            # Staff & permissions (UC1.7)
    reports/          # Revenue, occupancy reports
```

### Key Workflows (Vietnamese docs detail these)

1. **Login → Dashboard:** Authentication gates all features, redirects by role
2. **Room Management:** Grid view with color-coded status, quick status updates
3. **Reservations:** Timeline/calendar, conflict detection (FR-009), walk-in support
4. **Check-in:** Search booking → create PhieuThuePhong → update room status
5. **Check-out:** Calculate total (room + services + penalties) → payment modal → update to "Đang vệ sinh"
6. **Service Management:** Two-tier (categories + services), soft delete for historical integrity

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint with Next.js config
```

## Coding Conventions

### File Naming

- **Components:** PascalCase (`RoomStatusCard.tsx`)
- **Utilities:** camelCase (`formatCurrency.ts`)
- **Routes:** kebab-case folder names (`room-types/`)

### Component Structure

```tsx
'use client'; // Only if using hooks/interactivity

import { useState } from 'react';
import type { RoomStatus } from '@/types';

interface RoomCardProps {
	roomNumber: string;
	status: RoomStatus;
	onStatusChange?: (status: RoomStatus) => void;
}

export function RoomCard({
	roomNumber,
	status,
	onStatusChange,
}: RoomCardProps) {
	// Implementation
}
```

### State Management

- Use React 19 Context API for global state (user auth, theme)
- Local state with `useState` for component-specific data
- Consider `useOptimistic` for optimistic UI updates

### Data Fetching

- Server Components by default for data fetching
- Client Components (`'use client'`) only when needed (forms, interactivity)
- Use Next.js 16 `fetch` with cache/revalidate options

### Styling Approach

```tsx
// Prefer Tailwind utility classes
<button className="h-10 px-5 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
  Đặt phòng
</button>

// Use CSS variables from globals.css for theme consistency
<div className="bg-[var(--color-background)]">
```

## Database Entities (Backend Context)

Key tables referenced in workflows:

- `PHONG` (rooms) - TrangThaiPhong status
- `LOAIPHONG` (room types) - pricing, capacity
- `DATPHONG` (reservations) - booking records
- `PHIEUTHUEPHONG` (rental receipts) - check-in records
- `TRAPHONG` (checkouts) - payment records
- `DICHVU` (services) - minibar, laundry, etc.
- `NHANVIEN` (staff) - employee records
- `PHANQUYEN` (permissions) - role-based access

## Vietnamese Language

All UI text should be in Vietnamese:

- "Đăng nhập" (Login), "Đặt phòng" (Book Room), "Trả phòng" (Check-out)
- Status: "Trống" (Available), "Đang thuê" (Occupied), "Bảo trì" (Maintenance)
- Use proper diacritics: à, á, ả, ã, ạ, ă, ằ, ắ, ẳ, ẵ, ặ, â, ầ, ấ, ẩ, ẫ, ậ

## Critical Patterns

### Status Color Mapping

```typescript
const STATUS_COLORS = {
	Trống: 'bg-success-100 text-success-700',
	'Đang thuê': 'bg-info-100 text-info-700',
	'Đang dọn dẹp': 'bg-warning-100 text-warning-700',
	'Bảo trì': 'bg-error-100 text-error-700',
};
```

### Modal Pattern (Payment, Forms)

- Use backdrop with blur: `backdrop-filter: blur(2px)`
- Max width 600px (small), 800px (medium)
- Close button top-right, action buttons in footer

### Responsive Breakpoints

- Mobile: < 640px (sm) - Sidebar becomes overlay drawer
- Tablet: 640px-1024px (md, lg)
- Desktop: > 1024px (xl, 2xl)

## Common Pitfalls

1. **Don't** use inline styles - prefer Tailwind utilities
2. **Don't** create components without TypeScript interfaces
3. **Don't** forget to handle Vietnamese diacritics in forms
4. **Always** use `Image` from next/image for optimized images
5. **Always** check role permissions before rendering admin features
6. **Verify** conflict detection when creating/modifying reservations (FR-009)

## Testing Approach

- Focus on critical user flows: login → book → check-in → check-out
- Test role-based access (receptionist vs manager vs admin)
- Validate Vietnamese text rendering and form submission
- Check responsive layouts on mobile viewport

## When Making Changes

1. **Check docs first:** Screen specs in `page-description.md`, design in `ui-specifications.md`
2. **Follow design system:** Colors, spacing, typography must match specifications
3. **Vietnamese UI:** All user-facing text in Vietnamese
4. **TypeScript strict:** No `any` types, proper interfaces for all props
5. **Accessibility:** Proper ARIA labels (especially for Vietnamese screen readers)

## Always Use Context7 for Documentation

When referencing external libraries or frameworks, always use Context7 to fetch the latest documentation. This ensures that you are working with the most up-to-date and accurate information. For example:

- Use `resolve-library-id` to find the correct library ID.
- Use `get-library-docs` to fetch the latest documentation for the library.

Refer to the Context7 documentation for detailed usage instructions.

---

**Need clarification?** Check the documentation files or ask about specific workflows (UC1-UC8) detailed in `page-description.md`.
