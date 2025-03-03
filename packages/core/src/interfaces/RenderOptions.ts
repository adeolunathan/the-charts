/**
 * Options for rendering charts
 */

/**
 * Interface defining options for chart rendering
 */
export interface RenderOptions {
  /**
   * Width of the chart in pixels
   */
  width?: number;

  /**
   * Height of the chart in pixels
   */
  height?: number;

  /**
   * Whether to apply animations during the initial render
   */
  animate?: boolean;

  /**
   * Whether to make the chart responsive to container resizing
   */
  responsive?: boolean;

  /**
   * High-DPI (retina) rendering multiplier
   * A value of 2 means the chart will be rendered at twice the resolution
   */
  devicePixelRatio?: number;

  /**
   * Base font size for the chart (in pixels)
   */
  baseFontSize?: number;

  /**
   * Background color for the chart
   */
  backgroundColor?: string;

  /**
   * Whether to include a watermark
   */
  watermark?: boolean;

  /**
   * Locale for formatting numbers, dates, etc.
   */
  locale?: string;

  /**
   * For accessibility - whether to include ARIA attributes
   */
  accessibilityEnabled?: boolean;

  /**
   * Other renderer-specific options
   */
  [key: string]: any;
}