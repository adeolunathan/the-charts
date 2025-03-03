/**
 * Base chart implementation for BizCharts
 */

import { v4 as uuidv4 } from 'uuid';
import { Chart, ChartOptions } from '../interfaces/Chart';
import { DataSource } from '../data/DataSource';
import { Theme } from '../themes/Theme';
import { RenderOptions } from '../interfaces/RenderOptions';
import { DEFAULT_THEME } from '../themes/DefaultTheme';

/**
 * Abstract base class that implements the Chart interface
 * All specific chart types will extend this class
 */
export abstract class BaseChart implements Chart {
  id: string;
  title?: string;
  description?: string;
  dataSource: DataSource;
  theme: Theme;
  width: number;
  height: number;

  protected options: ChartOptions;
  protected container: HTMLElement | null = null;
  protected isRendered: boolean = false;

  /**
   * Creates a new chart instance
   *
   * @param dataSource The data source for the chart
   * @param options Chart configuration options
   */
  constructor(dataSource: DataSource, options: ChartOptions = {}) {
    this.id = uuidv4();
    this.dataSource = dataSource;
    this.options = options;
    this.title = options.title?.text;
    this.theme = DEFAULT_THEME;
    this.width = 800;
    this.height = 400;
  }

  /**
   * Renders the chart to the specified container
   *
   * @param container The HTML element or selector to render the chart into
   * @param options Additional rendering options
   */
  render(container: HTMLElement | string, options?: RenderOptions): void {
    // Get the container element
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
      if (!this.container) {
        throw new Error(`Container element "${container}" not found`);
      }
    } else {
      this.container = container;
    }

    // Set dimensions from container if not explicitly set
    if (!options?.width && this.container.clientWidth) {
      this.width = this.container.clientWidth;
    } else if (options?.width) {
      this.width = options.width;
    }

    if (!options?.height && this.container.clientHeight) {
      this.height = this.container.clientHeight || this.height;
    } else if (options?.height) {
      this.height = options.height;
    }

    // Do the actual rendering (implemented by subclasses)
    this.renderChart();
    this.isRendered = true;
  }

  /**
   * Updates the chart with new data or configuration
   */
  update(): void {
    if (!this.isRendered || !this.container) {
      throw new Error('Cannot update chart: it has not been rendered yet');
    }

    // Clear the current chart
    this.clear();

    // Re-render with updated data/config
    this.renderChart();
  }

  /**
   * Destroys the chart and cleans up resources
   */
  destroy(): void {
    if (this.container) {
      this.clear();
      this.container = null;
    }
    this.isRendered = false;
  }

  /**
   * Exports the chart as an image or other format
   *
   * @param format The format to export (png, jpeg, svg, pdf)
   * @param options Additional export options
   */
  async export(format: 'png' | 'jpeg' | 'svg' | 'pdf', options?: any): Promise<Blob> {
    if (!this.isRendered) {
      throw new Error('Cannot export chart: it has not been rendered yet');
    }

    // Default implementation to be overridden by specific rendering backends
    throw new Error('Export not implemented for this chart type');
  }

  /**
   * Sets the theme for this chart
   *
   * @param theme The theme to apply
   */
  setTheme(theme: Theme): void {
    this.theme = theme;
    if (this.isRendered) {
      this.update();
    }
  }

  /**
   * Clears the chart from the container
   */
  protected clear(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  /**
   * Abstract method to be implemented by specific chart types
   * Contains the actual rendering logic
   */
  protected abstract renderChart(): void;
}