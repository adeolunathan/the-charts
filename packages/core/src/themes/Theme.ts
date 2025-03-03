/**
 * Theming interfaces for BizCharts
 */

/**
 * Font configuration for different text elements
 */
export interface FontConfig {
  /**
   * Font family
   */
  family: string;

  /**
   * Font size in pixels
   */
  size: number;

  /**
   * Font weight
   */
  weight: 'normal' | 'bold' | number;

  /**
   * Font style
   */
  style: 'normal' | 'italic';

  /**
   * Text color
   */
  color: string;
}

/**
 * Configuration for axes in charts
 */
export interface AxisConfig {
  /**
   * Line color
   */
  lineColor: string;

  /**
   * Line width
   */
  lineWidth: number;

  /**
   * Line dash pattern (solid, dashed, etc.)
   */
  lineDash?: number[];

  /**
   * Text configuration for axis labels
   */
  labels: FontConfig;

  /**
   * Text configuration for axis title
   */
  title: FontConfig;

  /**
   * Grid line color
   */
  gridColor: string;

  /**
   * Grid line width
   */
  gridWidth: number;

  /**
   * Grid line dash pattern
   */
  gridDash?: number[];
}

/**
 * Configuration for the legend
 */
export interface LegendConfig {
  /**
   * Text configuration for legend labels
   */
  labels: FontConfig;

  /**
   * Symbol size
   */
  symbolSize: number;

  /**
   * Spacing between items in pixels
   */
  itemSpacing: number;

  /**
   * Padding around the legend in pixels
   */
  padding: number;

  /**
   * Background color
   */
  backgroundColor: string;

  /**
   * Border color
   */
  borderColor: string;

  /**
   * Border width
   */
  borderWidth: number;

  /**
   * Border radius
   */
  borderRadius: number;
}

/**
 * Configuration for tooltips
 */
export interface TooltipConfig {
  /**
   * Text configuration for tooltip content
   */
  text: FontConfig;

  /**
   * Text configuration for tooltip title
   */
  title: FontConfig;

  /**
   * Background color
   */
  backgroundColor: string;

  /**
   * Border color
   */
  borderColor: string;

  /**
   * Border width
   */
  borderWidth: number;

  /**
   * Border radius
   */
  borderRadius: number;

  /**
   * Padding inside the tooltip in pixels
   */
  padding: number;

  /**
   * Shadow configuration
   */
  shadow: {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

/**
 * Main theme interface
 */
export interface Theme {
  /**
   * Theme name
   */
  name: string;

  /**
   * Theme description
   */
  description?: string;

  /**
   * Base font configuration
   */
  font: FontConfig;

  /**
   * Text configuration for chart title
   */
  title: FontConfig;

  /**
   * Text configuration for chart subtitle
   */
  subtitle: FontConfig;

  /**
   * Color palette for data series
   */
  colors: string[];

  /**
   * Background color for the chart
   */
  backgroundColor: string;

  /**
   * X-axis configuration
   */
  xAxis: AxisConfig;

  /**
   * Y-axis configuration
   */
  yAxis: AxisConfig;

  /**
   * Legend configuration
   */
  legend: LegendConfig;

  /**
   * Tooltip configuration
   */
  tooltip: TooltipConfig;

  /**
   * Chart-specific configurations
   */
  charts: {
    /**
     * Line chart configuration
     */
    line?: {
      lineWidth: number;
      lineDash?: number[];
      marker: {
        size: number;
        enabled: boolean;
      };
    };

    /**
     * Bar chart configuration
     */
    bar?: {
      cornerRadius: number;
      maxWidth: number;
    };

    /**
     * Pie chart configuration
     */
    pie?: {
      innerRadius: number;
      padAngle: number;
      cornerRadius: number;
    };

    /**
     * Additional chart-specific configurations
     */
    [key: string]: any;
  };
}