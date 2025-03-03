/**
 * BizCharts Core Package
 * Exports all the core components, interfaces, and utilities
 */

// Chart interfaces
export { Chart, ChartOptions } from './interfaces/Chart';
export { RenderOptions } from './interfaces/RenderOptions';
export { LineChartOptions } from './interfaces/LineChart';

// Base implementations
export { BaseChart } from './charts/BaseChart';
export { LineChart } from './charts/LineChart';

// Data handling
export {
  DataSource,
  DataField,
  DataRow,
  DataProcessor
} from './data/DataSource';
export { ArrayDataSource } from './data/ArrayDataSource';

// Theme system
export {
  Theme,
  FontConfig,
  AxisConfig,
  LegendConfig,
  TooltipConfig
} from './themes/Theme';
export { DEFAULT_THEME, createTheme } from './themes/DefaultTheme';

// Constants
export const VERSION = '0.1.0';

// Factory function to create charts
export const createChart = (type: string, dataSource: DataSource, options: any) => {
  switch (type.toLowerCase()) {
    case 'line':
      return new LineChart(dataSource, options);
    default:
      throw new Error(`Chart type "${type}" not implemented`);
  }
};