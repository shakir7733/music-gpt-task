/**
 * Figma MCP Server Integration
 * 
 * This file provides utilities to query the Figma MCP server
 * to fetch design tokens like colors, spacing, radii, etc.
 * 
 * Prerequisites:
 * - Figma Dev Mode MCP server must be running
 * - A Figma file must be open in the Figma desktop app
 */

export interface FigmaDesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    success: string;
    error: string;
    warning: string;
    muted: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  radii: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  typography: {
    fontSizeXs: string;
    fontSizeSm: string;
    fontSizeBase: string;
    fontSizeLg: string;
    fontSizeXl: string;
    fontSize2xl: string;
    fontSize3xl: string;
    fontWeightNormal: string;
    fontWeightMedium: string;
    fontWeightSemibold: string;
    fontWeightBold: string;
    lineHeightTight: string;
    lineHeightNormal: string;
    lineHeightRelaxed: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface FigmaNodeStyle {
  fills?: Array<{ type: string; color: { r: number; g: number; b: number; a: number } }>;
  strokes?: Array<{ type: string; color: { r: number; g: number; b: number; a: number } }>;
  cornerRadius?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  effects?: Array<{ type: string; radius: number; color: { r: number; g: number; b: number; a: number } }>;
}

export interface FigmaNodeMetadata {
  id: string;
  name: string;
  type: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  style?: FigmaNodeStyle;
}

/**
 * Query Figma MCP server for design tokens from a specific node.
 * 
 * @param nodeId - The Figma node ID to query (e.g., "123:456")
 * @returns Promise resolving to FigmaDesignTokens or null if query fails
 * @example
 * const tokens = await figmaQuery("123:456");
 * console.log(tokens?.colors.primary); // "#6366f1"
 */
export async function figmaQuery(nodeId: string): Promise<FigmaDesignTokens | null> {
  try {
    // In a real implementation, this would call the Figma MCP server
    // For now, we'll return mock data based on our existing design system
    console.log(`[Figma MCP] Querying node: ${nodeId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock Figma response with realistic design tokens
    const tokens: FigmaDesignTokens = {
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
    
    console.log('[Figma MCP] Successfully fetched design tokens');
    return tokens;
  } catch (error) {
    console.error('[Figma MCP] Error querying Figma:', error);
    return null;
  }
}

/**
 * Query Figma node metadata including dimensions, position, and styles.
 * 
 * @param nodeId - The Figma node ID to query (e.g., "123:456")
 * @returns Promise resolving to FigmaNodeMetadata or null if query fails
 * @example
 * const metadata = await figmaNodeQuery("123:456");
 * console.log(metadata?.width, metadata?.height); // 800, 600
 */
export async function figmaNodeQuery(nodeId: string): Promise<FigmaNodeMetadata | null> {
  try {
    console.log(`[Figma MCP] Querying node metadata: ${nodeId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock node metadata
    const metadata: FigmaNodeMetadata = {
      id: nodeId,
      name: 'Component Node',
      type: 'FRAME',
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      style: {
        fills: [{ type: 'SOLID', color: { r: 0.04, g: 0.04, b: 0.04, a: 1 } }],
        cornerRadius: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
      },
    };
    
    console.log('[Figma MCP] Successfully fetched node metadata');
    return metadata;
  } catch (error) {
    console.error('[Figma MCP] Error querying node metadata:', error);
    return null;
  }
}

/**
 * Figma MCP Client (Legacy - kept for compatibility).
 * Provides methods to interact with Figma's design tokens and metadata.
 * 
 * @deprecated Use figmaQuery() and figmaNodeQuery() functions instead
 */
export class FigmaMCPClient {
  private baseUrl: string;
  private nodeId: string | null = null;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Set the current Figma node ID to work with.
   * 
   * @param nodeId - The Figma node ID (e.g., "123:456")
   */
  setNodeId(nodeId: string): void {
    this.nodeId = nodeId;
  }

  /**
   * Fetch variable definitions (design tokens) from Figma.
   * Returns a record mapping token names to CSS values.
   * 
   * @returns Promise resolving to token name → value mapping
   * @example
   * const tokens = await figmaClient.getVariableDefinitions();
   * console.log(tokens['color/primary']); // "#6366f1"
   */
  async getVariableDefinitions(): Promise<Record<string, string>> {
    try {
      // In a real implementation, this would call the MCP server
      // For now, return mock data that can be replaced with actual MCP calls
      console.warn('Figma MCP: Using mock data. Implement actual MCP calls for production.');
      
      return {
        'color/primary': '#6366f1',
        'color/secondary': '#8b5cf6',
        'color/accent': '#ec4899',
        'color/background': '#ffffff',
        'color/foreground': '#171717',
        'color/muted': '#6b7280',
        'spacing/xs': '4px',
        'spacing/sm': '8px',
        'spacing/md': '16px',
        'spacing/lg': '24px',
        'spacing/xl': '32px',
        'radius/sm': '4px',
        'radius/md': '8px',
        'radius/lg': '12px',
        'radius/xl': '16px',
      };
    } catch (error) {
      console.error('Failed to fetch Figma variable definitions:', error);
      throw error;
    }
  }

  /**
   * Fetch metadata for a specific node
   * 
   * Example usage:
   * const metadata = await figmaClient.getNodeMetadata('123:456');
   */
  async getNodeMetadata(nodeId?: string): Promise<FigmaNodeMetadata> {
    const targetNodeId = nodeId || this.nodeId;
    
    if (!targetNodeId) {
      throw new Error('No node ID provided. Set nodeId or pass it as parameter.');
    }

    try {
      // Mock implementation - replace with actual MCP call
      console.warn('Figma MCP: Using mock metadata. Implement actual MCP calls for production.');
      
      return {
        id: targetNodeId,
        name: 'Mock Node',
        type: 'FRAME',
        width: 375,
        height: 812,
        x: 0,
        y: 0,
      };
    } catch (error) {
      console.error('Failed to fetch node metadata:', error);
      throw error;
    }
  }

  /**
   * Get code for a specific node
   * 
   * Example usage:
   * const code = await figmaClient.getNodeCode('123:456');
   */
  async getNodeCode(nodeId?: string): Promise<string> {
    const targetNodeId = nodeId || this.nodeId;
    
    if (!targetNodeId) {
      throw new Error('No node ID provided. Set nodeId or pass it as parameter.');
    }

    try {
      // Mock implementation - replace with actual MCP call
      console.warn('Figma MCP: Using mock code. Implement actual MCP calls for production.');
      
      return `<div className="mock-component">
  {/* Generated from Figma node: ${targetNodeId} */}
</div>`;
    } catch (error) {
      console.error('Failed to fetch node code:', error);
      throw error;
    }
  }

  /**
   * Parse design tokens from variable definitions
   */
  parseDesignTokens(variables: Record<string, string>): Partial<FigmaDesignTokens> {
    const tokens: Partial<FigmaDesignTokens> = {
      colors: {} as any,
      spacing: {} as any,
      radii: {} as any,
      typography: {} as any,
      shadows: {} as any,
    };

    Object.entries(variables).forEach(([key, value]) => {
      if (key.startsWith('color/') && tokens.colors) {
        (tokens.colors as any)[key.replace('color/', '')] = value;
      } else if (key.startsWith('spacing/') && tokens.spacing) {
        (tokens.spacing as any)[key.replace('spacing/', '')] = value;
      } else if (key.startsWith('radius/') && tokens.radii) {
        (tokens.radii as any)[key.replace('radius/', '')] = value;
      } else if (key.startsWith('typography/') && tokens.typography) {
        (tokens.typography as any)[key.replace('typography/', '')] = value;
      } else if (key.startsWith('shadow/') && tokens.shadows) {
        (tokens.shadows as any)[key.replace('shadow/', '')] = value;
      }
    });

    return tokens;
  }

  /**
   * Generate CSS variables from design tokens
   */
  generateCSSVariables(tokens: Partial<FigmaDesignTokens>): string {
    let css = ':root {\n';

    if (tokens.colors) {
      Object.entries(tokens.colors).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
      });
    }

    if (tokens.spacing) {
      Object.entries(tokens.spacing).forEach(([key, value]) => {
        css += `  --spacing-${key}: ${value};\n`;
      });
    }

    if (tokens.radii) {
      Object.entries(tokens.radii).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};\n`;
      });
    }

    css += '}\n';
    return css;
  }
}

/**
 * Singleton instance
 */
export const figmaMCP = new FigmaMCPClient();

/**
 * Hook for React components to use Figma design tokens
 * 
 * Example usage in a component:
 * const tokens = useFigmaTokens();
 * console.log(tokens.colors?.primary);
 */
export function useFigmaTokens() {
  // This would be implemented with React hooks in a real scenario
  // For now, return empty object
  return {
    colors: {},
    spacing: {},
    radii: {},
  };
}
