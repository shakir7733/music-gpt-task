/**
 * Design Tokens
 * 
 * This file contains design tokens derived from Figma MCP server queries.
 * These tokens are used throughout the application to ensure consistency
 * with the Figma design system.
 * 
 * To update these tokens:
 * 1. Ensure Figma Dev Mode MCP server is running
 * 2. Open your Figma file with the design system
 * 3. Run: npm run figma:sync (or manually call figmaQuery)
 */

import { FigmaDesignTokens } from '@/lib/figma';

/**
 * Design tokens fetched from Figma
 * These can be overridden or extended as needed
 */
export const designTokens: FigmaDesignTokens = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#0a0a0a',
    foreground: '#ededed',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    muted: '#6b7280',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  radii: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px',
  },
  typography: {
    fontSizeXs: '0.75rem',    // 12px
    fontSizeSm: '0.875rem',   // 14px
    fontSizeBase: '1rem',     // 16px
    fontSizeLg: '1.125rem',   // 18px
    fontSizeXl: '1.25rem',    // 20px
    fontSize2xl: '1.5rem',    // 24px
    fontSize3xl: '2rem',      // 32px
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
    lineHeightTight: '1.25',
    lineHeightNormal: '1.5',
    lineHeightRelaxed: '1.75',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
};

/**
 * Component-specific design tokens
 * Derived from Figma component nodes
 */
export const componentTokens = {
  promptBox: {
    minHeight: '120px',
    minHeightFocused: '200px',
    borderWidth: '2px',
    padding: '1.5rem 2rem',
    borderRadius: designTokens.radii['3xl'],
    fontSize: designTokens.typography.fontSizeBase,
    focusScale: 1.02,
  },
  submitButton: {
    paddingX: '3rem 4rem',
    paddingY: '1rem 1.25rem',
    fontSize: designTokens.typography.fontSizeLg,
    borderRadius: designTokens.radii['2xl'],
    hoverScale: 1.05,
    activeScale: 0.95,
  },
  profilePopup: {
    width: '400px',
    maxHeight: '600px',
    borderRadius: designTokens.radii['2xl'],
    padding: designTokens.spacing.lg,
    backdropBlur: '24px',
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
  },
  recentPanel: {
    height: 'auto',
    padding: designTokens.spacing.lg,
    borderRadius: designTokens.radii.xl,
    backdropBlur: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  generationCard: {
    padding: designTokens.spacing.md,
    borderRadius: designTokens.radii.xl,
    borderWidth: '1px',
    hoverLift: '-8px',
    hoverScale: 1.02,
  },
};

/**
 * Animation tokens derived from Figma
 */
export const animationTokens = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
    senior: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
  },
};

/**
 * Helper function to get a design token value
 */
export function getToken(path: string): string {
  const parts = path.split('.');
  let value: any = designTokens;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      console.warn(`Token not found: ${path}`);
      return '';
    }
  }
  
  return typeof value === 'string' ? value : '';
}

/**
 * Helper function to get a component token value
 */
export function getComponentToken(component: string, property: string): string {
  const componentData = (componentTokens as any)[component];
  if (!componentData) {
    console.warn(`Component not found: ${component}`);
    return '';
  }
  
  const value = componentData[property];
  if (!value) {
    console.warn(`Property not found: ${component}.${property}`);
    return '';
  }
  
  return typeof value === 'string' ? value : String(value);
}

/**
 * Utility to convert token values to CSS custom properties
 */
export function tokensToCSS(): string {
  let css = ':root {\n';
  
  // Colors
  Object.entries(designTokens.colors).forEach(([key, value]) => {
    css += `  --color-${key}: ${value};\n`;
  });
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Radii
  Object.entries(designTokens.radii).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(designTokens.typography).forEach(([key, value]) => {
    css += `  --${key}: ${value};\n`;
  });
  
  // Shadows
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  // Animation
  Object.entries(animationTokens.duration).forEach(([key, value]) => {
    css += `  --duration-${key}: ${value};\n`;
  });
  
  Object.entries(animationTokens.easing).forEach(([key, value]) => {
    css += `  --ease-${key}: ${value};\n`;
  });
  
  css += '}\n';
  return css;
}
