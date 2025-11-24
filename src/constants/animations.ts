/**
 * Animation Constants
 * 
 * Centralized animation configuration including durations, easing curves,
 * delays, and animation names for consistent animations across the app.
 */

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SLOWER: 750,
  SLOWEST: 1000,
  PAGE_FADE: 400,
} as const;

/**
 * Animation easing curves
 */
export const ANIMATION_EASING = {
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  EXPO: 'cubic-bezier(0.19, 1, 0.22, 1)',
  BACK: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  SENIOR: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
} as const;

/**
 * Animation delays for staggered animations (in seconds)
 */
export const ANIMATION_DELAY = {
  STEP_1: '0.1s',
  STEP_2: '0.2s',
  STEP_3: '0.3s',
  STEP_4: '0.4s',
  STEP_5: '0.5s',
  STEP_6: '0.6s',
  ITEM_STAGGER: 0.08, // seconds between items in lists
  CARD_STAGGER: 0.05, // seconds between cards
} as const;

/**
 * Animation scale values for hover and active states
 */
export const ANIMATION_SCALE = {
  HOVER_SMALL: 1.02,
  HOVER_MEDIUM: 1.05,
  HOVER_LARGE: 1.1,
  ACTIVE: 0.95,
  ELASTIC_PEAK: 1.05,
  ELASTIC_SETTLE: 1.02,
} as const;

/**
 * Animation class names mapped to their purposes
 */
export const ANIMATION_CLASSES = {
  // Fade animations
  FADE_IN: 'animate-fade-in',
  PAGE_FADE_IN: 'animate-page-fade-in',
  
  // Slide animations
  SLIDE_UP: 'animate-slide-up',
  SLIDE_DOWN: 'animate-slide-down',
  SLIDE_IN_LEFT: 'animate-slide-in-left',
  
  // Pulse animations
  PULSE_SLOW: 'animate-pulse-slow',
  PULSE_GLOW: 'animate-pulse-glow',
  GLOW_PULSE: 'animate-glow-pulse',
  
  // Border animations
  BORDER_FLOW: 'animate-border-flow',
  BORDER_GLOW: 'animate-border-glow',
  GRADIENT_BORDER: 'animate-gradient-border',
  GRADIENT_SHIFT: 'animate-gradient-shift',
  
  // Interactive animations
  SHIMMER: 'animate-shimmer',
  RIPPLE: 'animate-ripple',
  BUTTON_PRESS: 'animate-button-press',
  SPRING_IN: 'animate-spring-in',
  ELASTIC_EXPAND: 'animate-elastic-expand',
  
  // Utility animations
  FLOAT: 'animate-float',
  SPIN_SLOW: 'animate-spin-slow',
  TYPING_FADE: 'animate-typing-fade',
  PLACEHOLDER_BLINK: 'animate-placeholder-blink',
  CARD_HOVER_LIFT: 'animate-card-hover-lift',
} as const;

/**
 * Transition class names for different easing curves
 */
export const TRANSITION_CLASSES = {
  SPRING: 'transition-spring',
  BOUNCE: 'transition-bounce',
  SENIOR: 'transition-senior',
} as const;

/**
 * Helper function to create staggered animation delay
 * @param index - Index of the item
 * @param delayPerItem - Delay in seconds between items
 * @returns Style object with animation delay
 */
export function getStaggerDelay(index: number, delayPerItem: number = ANIMATION_DELAY.ITEM_STAGGER): React.CSSProperties {
  return {
    animationDelay: `${index * delayPerItem}s`,
  };
}

/**
 * Helper function to create transition with custom easing
 * @param duration - Duration in milliseconds
 * @param easing - Easing curve (from ANIMATION_EASING)
 * @returns Style object with transition
 */
export function getTransition(
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: string = ANIMATION_EASING.SENIOR
): React.CSSProperties {
  return {
    transition: `all ${duration}ms ${easing}`,
  };
}

/**
 * Helper function to create scale transform
 * @param scale - Scale value
 * @returns Style object with transform
 */
export function getScale(scale: number): React.CSSProperties {
  return {
    transform: `scale(${scale})`,
  };
}

/**
 * Animation configuration for specific components
 */
export const COMPONENT_ANIMATIONS = {
  PROMPT_BOX: {
    FOCUS_SCALE: ANIMATION_SCALE.HOVER_SMALL,
    TYPING_SCALE: ANIMATION_SCALE.ELASTIC_PEAK,
    SETTLE_SCALE: ANIMATION_SCALE.ELASTIC_SETTLE,
    DURATION: ANIMATION_DURATION.NORMAL,
    EASING: ANIMATION_EASING.SENIOR,
  },
  SUBMIT_BUTTON: {
    HOVER_SCALE: ANIMATION_SCALE.HOVER_MEDIUM,
    ACTIVE_SCALE: ANIMATION_SCALE.ACTIVE,
    RIPPLE_DURATION: 600,
    DURATION: ANIMATION_DURATION.NORMAL,
    EASING: ANIMATION_EASING.SENIOR,
  },
  GENERATION_CARD: {
    HOVER_LIFT: '-8px',
    HOVER_SCALE: ANIMATION_SCALE.HOVER_SMALL,
    DURATION: ANIMATION_DURATION.NORMAL,
    EASING: ANIMATION_EASING.SENIOR,
  },
  PROFILE_POPUP: {
    ENTRANCE_DURATION: ANIMATION_DURATION.NORMAL,
    ENTRANCE_EASING: ANIMATION_EASING.ELASTIC,
    SCALE_ENTER: 0.95,
    SCALE_EXIT: 0.95,
  },
  RECENT_PANEL: {
    SLIDE_DURATION: ANIMATION_DURATION.NORMAL,
    SLIDE_EASING: ANIMATION_EASING.SMOOTH,
  },
} as const;

/**
 * WebSocket simulation timing
 */
export const WEBSOCKET_TIMING = {
  CONNECT_DELAY: 100,
  PROGRESS_INTERVAL: 1000, // 1 second per step
  COMPLETION_DELAY: 1000,
  STEPS: 5,
} as const;
