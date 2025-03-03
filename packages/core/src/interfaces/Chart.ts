/**
 * Base interfaces for the BizCharts library
 */

import { DataSource } from '../data/DataSource';
import { Theme } from '../themes/Theme';
import { RenderOptions } from './RenderOptions';

/**
 * Represents the base interface for all chart types in BizCharts
 */
export interface Chart {
  /**
   * Unique identifier for the chart
   */
  id: string;

  /**
   * Title for the chart
   */
  title?: string;

  /**
   * Description of the chart (for accessibility and documentation)
   */
  description?: string;

  /**
   * The data source for this chart
   */
  dataSource: DataSource;

  /**
   * The theme applied to this chart
   */
  theme: Theme;

  /**
   * Dimensions of the chart
   */
  width: number;
  height: number;

  /**
   * Render the chart to the specified container
   * @param container The HTML element or selector to render the chart into
   * @param options Additional rendering options
   */
  render(container: HTMLElement | string, options?: RenderOptions): void;

  /**
   * Update the chart with new data or configuration
   */
  update(): void;

  /**
   * Destroy the chart and clean up resources
   */
  destroy(): void;

  /**
   * Export the chart as an image or other format
   * @param format The format to export (png, jpeg, svg, pdf)
   * @param options Additional export options
   */
  export(format: 'png' | 'jpeg' | 'svg' | 'pdf', options?: any): Promise<Blob>;
}

/**
 * Base class for all chart configuration options
 */
export interface ChartOptions {
  /**
   * Chart title configuration
   */
  title?: {
    text: string;
    align?: 'left' | 'center' | 'right';
    style?: any;
  };

  /**
   * Chart subtitle configuration
   */
  subtitle?: {
    text: string;
    align?: 'left' | 'center' | 'right';
    style?: any;
  };

  /**
   * Chart legend configuration
   */
  legend?: {
    show: boolean;
    position?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
  };

  /**
   * Animation configuration
   */
  animation?: {
    enabled: boolean;
    duration?: number;
    easing?: string;
  };

  /**
   * Tooltip configuration
   */
  tooltip?: {
    enabled: boolean;
    format?: string;
    custom?: (data: any) => string;
  };
}