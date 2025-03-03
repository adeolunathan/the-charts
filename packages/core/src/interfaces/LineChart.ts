/**
 * Line Chart specific interfaces
 */

import { ChartOptions } from './Chart';

/**
 * Interface for a single line series configuration
 */
export interface LineSeries {
  /**
   * Field name for y-values
   */
  field: string;

  /**
   * Display name for the series
   */
  name?: string;

  /**
   * Series color (overrides theme color)
   */
  color?: string;

  /**
   * Line width
   */
  lineWidth?: number;

  /**
   * Line style (solid, dashed, etc.)
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted';

  /**
   * Marker configuration
   */
  marker?: {
    /**
     * Whether to show markers
     */
    show: boolean;

    /**
     * Marker size
     */
    size?: number;

    /**
     * Marker shape
     */
    shape?: 'circle' | 'square' | 'triangle' | 'diamond';
  };

  /**
   * Area configuration (for area charts)
   */
  area?: {
    /**
     * Whether to fill the area under the line
     */
    show: boolean;

    /**
     * Fill opacity (0-1)
     */
    opacity?: number;

    /**
     * Fill color (defaults to series color with opacity)
     */
    color?: string;
  };
}

/**
 * Configuration options specific to line charts
 */
export interface LineChartOptions extends ChartOptions {
  /**
   * X-axis configuration
   */
  xAxis?: {
    /**
     * Field name to use for x-axis values
     */
    field: string;

    /**
     * Type of x-axis (category for discrete values, value for continuous)
     */
    type?: 'category' | 'value' | 'time';

    /**
     * Title of the axis
     */
    title?: string;

    /**
     * Whether to display a grid
     */
    grid?: boolean;

    /**
     * Min value for the axis (for value type)
     */
    min?: number;

    /**
     * Max value for the axis (for value type)
     */
    max?: number;

    /**
     * Format string for axis labels
     */
    format?: string;
  };

  /**
   * Y-axis configuration
   */
  yAxis?: {
    /**
     * Title of the axis
     */
    title?: string;

    /**
     * Whether to display a grid
     */
    grid?: boolean;

    /**
     * Min value for the axis
     */
    min?: number;

    /**
     * Max value for the axis
     */
    max?: number;

    /**
     * Format string for axis labels
     */
    format?: string;
  };

  /**
   * Series configuration - can be a single series or multiple series
   */
  series: LineSeries | LineSeries[];

  /**
   * Whether to stack multiple series
   */
  stacked?: boolean;

  /**
   * Whether to smooth the lines using spline interpolation
   */
  smooth?: boolean;

  /**
   * Step line configuration
   */
  step?: {
    /**
     * Whether to render as step line
     */
    show: boolean;

    /**
     * Step position: 'start', 'middle', or 'end'
     */
    position?: 'start' | 'middle' | 'end';
  };
}