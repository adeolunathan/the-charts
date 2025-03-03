/**
 * Line Chart implementation for BizCharts
 */

import { BaseChart } from './BaseChart';
import { LineChartOptions } from '../interfaces/LineChart';
import { DataSource, DataRow } from '../data/DataSource';

/**
 * Line Chart implementation
 * Visualizes data as connected points forming a line
 */
export class LineChart extends BaseChart {
  /**
   * Options specific to line charts
   */
  protected lineOptions: LineChartOptions;

  /**
   * Canvas element for rendering
   */
  private canvas: HTMLCanvasElement | null = null;

  /**
   * Canvas 2D context
   */
  private ctx: CanvasRenderingContext2D | null = null;

  /**
   * Creates a new line chart
   *
   * @param dataSource The data source
   * @param options Line chart specific options
   */
  constructor(dataSource: DataSource, options: LineChartOptions) {
    super(dataSource, options);
    this.lineOptions = options;
  }

  /**
   * Renders the line chart
   */
  protected renderChart(): void {
    if (!this.container) {
      throw new Error('Cannot render chart: no container element');
    }

    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.display = 'block';

    // Clear the container and add the canvas
    this.container.innerHTML = '';
    this.container.appendChild(this.canvas);

    // Get rendering context
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      throw new Error('Could not get canvas context');
    }

    // Render the chart asynchronously
    this.renderChartAsync().catch(error => {
      console.error('Error rendering chart:', error);
      if (this.container) {
        this.container.innerHTML = `<div class="error">Error rendering chart: ${error.message}</div>`;
      }
    });
  }

  /**
   * Asynchronously renders the chart
   */
  private async renderChartAsync(): Promise<void> {
    // Get data
    const data = await this.dataSource.getData();

    // Set up scale and render the chart components
    this.setupScale(data);
    this.drawBackground();
    this.drawAxes();
    this.drawSeries(data);
    this.drawLegend();
    this.drawTitle();
  }

  /**
   * Set up the scale for the chart based on the data
   *
   * @param data The data to scale to
   */
  private setupScale(data: DataRow[]): void {
    // This would calculate the appropriate scales for X and Y axes
    // based on the data values and chart dimensions
    // For now, this is a placeholder
  }

  /**
   * Draw the chart background
   */
  private drawBackground(): void {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.theme.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draw the chart axes
   */
  private drawAxes(): void {
    if (!this.ctx) return;

    // Draw X and Y axes
    // This would include:
    // - Axis lines
    // - Grid lines
    // - Tick marks
    // - Labels
    // - Titles

    // For now, let's draw some placeholder axes
    const padding = 50; // Padding from the edges
    const chartWidth = this.width - padding * 2;
    const chartHeight = this.height - padding * 2;

    // Draw axes
    this.ctx.strokeStyle = this.theme.xAxis.lineColor;
    this.ctx.lineWidth = this.theme.xAxis.lineWidth;

    // X-axis
    this.ctx.beginPath();
    this.ctx.moveTo(padding, this.height - padding);
    this.ctx.lineTo(this.width - padding, this.height - padding);
    this.ctx.stroke();

    // Y-axis
    this.ctx.beginPath();
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, this.height - padding);
    this.ctx.stroke();

    // X-axis title
    if (this.lineOptions.xAxis?.title) {
      this.ctx.font = `${this.theme.xAxis.title.weight} ${this.theme.xAxis.title.size}px ${this.theme.xAxis.title.family}`;
      this.ctx.fillStyle = this.theme.xAxis.title.color;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        this.lineOptions.xAxis.title,
        padding + chartWidth / 2,
        this.height - padding / 3
      );
    }

    // Y-axis title
    if (this.lineOptions.yAxis?.title) {
      this.ctx.save();
      this.ctx.font = `${this.theme.yAxis.title.weight} ${this.theme.yAxis.title.size}px ${this.theme.yAxis.title.family}`;
      this.ctx.fillStyle = this.theme.yAxis.title.color;
      this.ctx.textAlign = 'center';
      this.ctx.translate(padding / 3, padding + chartHeight / 2);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillText(this.lineOptions.yAxis.title, 0, 0);
      this.ctx.restore();
    }
  }

  /**
   * Draw the data series
   *
   * @param data The data to draw
   */
  private drawSeries(data: DataRow[]): void {
    if (!this.ctx || data.length === 0) return;

    const padding = 50; // Same padding as in drawAxes
    const chartWidth = this.width - padding * 2;
    const chartHeight = this.height - padding * 2;

    // Convert series option to array if it's a single object
    const seriesList = Array.isArray(this.lineOptions.series)
      ? this.lineOptions.series
      : [this.lineOptions.series];

    // Get x-axis field
    const xField = this.lineOptions.xAxis?.field || this.dataSource.fields[0].name;

    // Draw each series
    seriesList.forEach((series, seriesIndex) => {
      const yField = series.field;

      // Get min/max values for scaling
      let minX = 0;
      let maxX = data.length - 1;
      let minY = Number.MAX_VALUE;
      let maxY = Number.MIN_VALUE;

      data.forEach(row => {
        const y = Number(row[yField]);
        if (!isNaN(y)) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      });

      // Add some padding to the y-axis scale
      const yRange = maxY - minY;
      minY = Math.max(0, minY - yRange * 0.1);
      maxY = maxY + yRange * 0.1;

      // Override with user-specified min/max if provided
      if (this.lineOptions.yAxis?.min !== undefined) {
        minY = this.lineOptions.yAxis.min;
      }
      if (this.lineOptions.yAxis?.max !== undefined) {
        maxY = this.lineOptions.yAxis.max;
      }

      if (!this.ctx) return;

      // Draw the line
      const seriesColor = 'color' in series ? series.color : this.theme.colors[seriesIndex % this.theme.colors.length];
      this.ctx.strokeStyle = seriesColor;

      const lineWidth = 'lineWidth' in series ? series.lineWidth : this.theme.charts.line?.lineWidth || 2;
      this.ctx.lineWidth = lineWidth;

      // Set line style
      if ('lineStyle' in series) {
        if (series.lineStyle === 'dashed') {
          this.ctx.setLineDash([5, 5]);
        } else if (series.lineStyle === 'dotted') {
          this.ctx.setLineDash([2, 2]);
        } else {
          this.ctx.setLineDash([]);
        }
      } else {
        this.ctx.setLineDash([]);
      }

      this.ctx.beginPath();

      // Plot points and connect them
      let firstPoint = true;
      data.forEach((row, i) => {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = this.height - padding - ((Number(row[yField]) - minY) / (maxY - minY)) * chartHeight;

        if (firstPoint) {
          this.ctx!.moveTo(x, y);
          firstPoint = false;
        } else {
          this.ctx!.lineTo(x, y);
        }
      });

      this.ctx.stroke();

      // Draw markers if enabled
      if ('marker' in series && series.marker?.show) {
        const markerSize = series.marker.size || this.theme.charts.line?.marker.size || 6;

        data.forEach((row, i) => {
          const x = padding + (i / (data.length - 1)) * chartWidth;
          const y = this.height - padding - ((Number(row[yField]) - minY) / (maxY - minY)) * chartHeight;

          if (this.ctx) {
            this.ctx.fillStyle = seriesColor;
            this.ctx.beginPath();
            this.ctx.arc(x, y, markerSize / 2, 0, Math.PI * 2);
            this.ctx.fill();
          }
        });
      }

      // Fill area if enabled
      if ('area' in series && series.area?.show && this.ctx) {
        this.ctx.globalAlpha = series.area.opacity || 0.2;
        this.ctx.fillStyle = series.area.color || seriesColor;

        this.ctx.beginPath();

        // Starting point at the bottom
        this.ctx.moveTo(padding, this.height - padding);

        // Draw the filled area
        data.forEach((row, i) => {
          const x = padding + (i / (data.length - 1)) * chartWidth;
          const y = this.height - padding - ((Number(row[yField]) - minY) / (maxY - minY)) * chartHeight;
          this.ctx!.lineTo(x, y);
        });

        // Complete the path back to the bottom
        this.ctx.lineTo(this.width - padding, this.height - padding);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
      }
    });
  }

  /**
   * Draw the chart legend
   */
  private drawLegend(): void {
    if (!this.ctx) return;

    // Only draw legend if there are multiple series or a name is specified
    const seriesList = Array.isArray(this.lineOptions.series)
      ? this.lineOptions.series
      : [this.lineOptions.series];

    if (seriesList.length <= 1 && !seriesList[0].name) {
      return;
    }

    const padding = 50;
    const legendX = padding;
    const legendY = padding / 2;
    const itemWidth = 100;
    const itemHeight = 20;

    seriesList.forEach((series, index) => {
      const x = legendX + index * itemWidth;
      const y = legendY;

      // Draw color marker
      const seriesColor = 'color' in series ? series.color : this.theme.colors[index % this.theme.colors.length];
      this.ctx!.fillStyle = seriesColor;
      this.ctx!.fillRect(x, y, 15, 15);

      // Draw series name
      this.ctx!.font = `${this.theme.legend.labels.weight} ${this.theme.legend.labels.size}px ${this.theme.legend.labels.family}`;
      this.ctx!.fillStyle = this.theme.legend.labels.color;
      this.ctx!.textAlign = 'left';
      this.ctx!.fillText(series.name || series.field, x + 20, y + 12);
    });
  }

  /**
   * Draw the chart title
   */
  private drawTitle(): void {
    if (!this.ctx || !this.title) return;

    this.ctx.font = `${this.theme.title.weight} ${this.theme.title.size}px ${this.theme.title.family}`;
    this.ctx.fillStyle = this.theme.title.color;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.title, this.width / 2, 25);
  }

  /**
   * Exports the chart as an image
   *
   * @param format The format to export (png, jpeg, svg, pdf)
   * @param options Additional export options
   * @returns Promise resolving to a Blob containing the exported image
   */
  async export(format: 'png' | 'jpeg' | 'svg' | 'pdf', options?: any): Promise<Blob> {
    if (!this.canvas) {
      throw new Error('Cannot export chart: it has not been rendered yet');
    }

    if (format === 'png') {
      return new Promise((resolve, reject) => {
        this.canvas!.toBlob(blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to export chart as PNG'));
          }
        }, 'image/png');
      });
    } else if (format === 'jpeg') {
      return new Promise((resolve, reject) => {
        this.canvas!.toBlob(blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to export chart as JPEG'));
          }
        }, 'image/jpeg', options?.quality || 0.9);
      });
    } else {
      // SVG and PDF export would need additional libraries
      throw new Error(`Export to ${format} is not implemented yet`);
    }
  }
}