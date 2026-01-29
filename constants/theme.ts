// IWA Theme - Dark, Gritty Wrestling Aesthetic
export const theme = {
  // Primary Colors
  primary: '#DC2626', // IWA Red
  primaryLight: '#EF4444',
  primaryDark: '#B91C1C',
  
  // Background Colors
  background: '#0A0A0A',
  backgroundSecondary: '#111111',
  surface: '#1A1A1A',
  surfaceElevated: '#222222',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  
  // Accent Colors
  accent: '#DC2626',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Border Colors
  border: '#2A2A2A',
  borderAccent: '#DC2626',
  
  // Card Specific
  cardBackground: '#111111',
  cardBorder: '#DC2626',
  
  // Gradients
  gradientRed: ['#DC2626', '#991B1B'],
  gradientDark: ['#1A1A1A', '#0A0A0A'],
  gradientFire: ['#F59E0B', '#DC2626', '#991B1B'],
};

export const typography = {
  // Display - For hero headlines
  heroTitle: {
    fontSize: 42,
    fontWeight: '900' as const,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    letterSpacing: 4,
    textTransform: 'uppercase' as const,
  },
  
  // Page Titles
  pageTitle: {
    fontSize: 28,
    fontWeight: '800' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  
  // Section Headers
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  
  // Card Typography
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  
  // Body Text
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  
  // Labels
  label: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
};
