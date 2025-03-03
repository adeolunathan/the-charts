/**
 * Default theme for BizCharts
 */

import { Theme } from './Theme';

/**
 * The default theme for BizCharts
 * Provides a clean, professional look for business charts
 */
export const DEFAULT_THEME: Theme = {
  name: 'Default',
  description: 'The default theme for BizCharts',

  font: {
    family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    size: 12,
    weight: 'normal',
    style: 'normal',
    color: '#333333'
  },

  title: {
    family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    size: 18,
    weight: 'bold',
    style: 'normal',
    color: '#333333'
  },

  subtitle: {
    family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    size: 14,
    weight: 'normal',
    style: 'normal',
    color: '#666666'
  },

  // Professional color palette suitable for business charts
  colors: [
    '#4285F4', // Blue
    '#34A853', // Green
    '#FBBC05', // Yellow
    '#EA4335', // Red
    '#8C44A3', // Purple
    '#0F9D58', // Dark Green
    '#3B7FC4', // Light Blue
    '#DB4437', // Coral
    '#F4B400', // Gold
    '#673AB7'  // Deep Purple
  ],

  backgroundColor: '#FFFFFF',

  xAxis: {
    lineColor: '#CCCCCC',
    lineWidth: 1,
    labels: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 11,
      weight: 'normal',
      style: 'normal',
      color: '#666666'
    },
    title: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 12,
      weight: 'bold',
      style: 'normal',
      color: '#333333'
    },
    gridColor: '#EEEEEE',
    gridWidth: 1,
    gridDash: [4, 2]
  },

  yAxis: {
    lineColor: '#CCCCCC',
    lineWidth: 1,
    labels: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 11,
      weight: 'normal',
      style: 'normal',
      color: '#666666'
    },
    title: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 12,
      weight: 'bold',
      style: 'normal',
      color: '#333333'
    },
    gridColor: '#EEEEEE',
    gridWidth: 1,
    gridDash: [4, 2]
  },

  legend: {
    labels: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 11,
      weight: 'normal',
      style: 'normal',
      color: '#333333'
    },
    symbolSize: 10,
    itemSpacing: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 3
  },

  tooltip: {
    text: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 11,
      weight: 'normal',
      style: 'normal',
      color: '#333333'
    },
    title: {
      family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      size: 12,
      weight: 'bold',
      style: 'normal',
      color: '#333333'
    },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    shadow: {
      enabled: true,
      color: 'rgba(0, 0, 0, 0.2)',
      blur: 5,
      offsetX: 0,
      offsetY: 2
    }
  },

  charts: {
    line: {
      lineWidth: 2,
      marker: {
        size: 6,
        enabled: true
      }
    },

    bar: {
      cornerRadius: 2,
      maxWidth: 50
    },

    pie: {
      innerRadius: 0,
      padAngle: 0.01,
      cornerRadius: 2
    }
  }
};

/**
 * Creates a custom theme by merging options with the default theme
 *
 * @param options Custom theme options to override defaults
 * @returns A new theme with custom options applied
 */
export function createTheme(options: Partial<Theme>): Theme {
  return {
    ...DEFAULT_THEME,
    ...options,
    // Deep merge nested objects
    font: { ...DEFAULT_THEME.font, ...options.font },
    title: { ...DEFAULT_THEME.title, ...options.title },
    subtitle: { ...DEFAULT_THEME.subtitle, ...options.subtitle },
    xAxis: { ...DEFAULT_THEME.xAxis, ...options.xAxis },
    yAxis: { ...DEFAULT_THEME.yAxis, ...options.yAxis },
    legend: { ...DEFAULT_THEME.legend, ...options.legend },
    tooltip: {
      ...DEFAULT_THEME.tooltip,
      ...options.tooltip,
      shadow: { ...DEFAULT_THEME.tooltip.shadow, ...options.tooltip?.shadow }
    },
    charts: {
      ...DEFAULT_THEME.charts,
      ...options.charts,
      line: { ...DEFAULT_THEME.charts.line, ...options.charts?.line },
      bar: { ...DEFAULT_THEME.charts.bar, ...options.charts?.bar },
      pie: { ...DEFAULT_THEME.charts.pie, ...options.charts?.pie }
    }
  };
}