import {
  createChart,
  ArrayDataSource
} from '@charts/core';

// Add debugging
console.log('App module loaded');

// Sample data for demonstration
const SAMPLE_DATA = [
  { month: 'Jan', sales: 42, costs: 30, profit: 12 },
  { month: 'Feb', sales: 55, costs: 35, profit: 20 },
  { month: 'Mar', sales: 70, costs: 40, profit: 30 },
  { month: 'Apr', sales: 65, costs: 42, profit: 23 },
  { month: 'May', sales: 78, costs: 45, profit: 33 },
  { month: 'Jun', sales: 90, costs: 50, profit: 40 },
  { month: 'Jul', sales: 85, costs: 52, profit: 33 },
  { month: 'Aug', sales: 92, costs: 55, profit: 37 },
  { month: 'Sep', sales: 102, costs: 60, profit: 42 },
  { month: 'Oct', sales: 110, costs: 70, profit: 40 },
  { month: 'Nov', sales: 120, costs: 80, profit: 40 },
  { month: 'Dec', sales: 130, costs: 90, profit: 40 }
];

export function createApp() {
  console.log('createApp called');

  return {
    mount: (selector) => {
      console.log('Mount called with selector:', selector);

      const root = document.querySelector(selector);
      if (!root) {
        console.error('Root element not found:', selector);
        return;
      }

      console.log('Root element found:', root);

      // Create app header
      const header = document.createElement('header');
      header.innerHTML = `
        <div class="header-content">
          <h1>BizCharts</h1>
          <p>Professional Chart Visualization Platform</p>
        </div>
      `;

      // Create main content area
      const main = document.createElement('main');

      // Create chart containers
      const lineChartContainer = document.createElement('div');
      lineChartContainer.id = 'line-chart';
      lineChartContainer.className = 'chart-container';
      lineChartContainer.innerHTML = '<p>Line Chart Will Appear Here</p>';

      const areaChartContainer = document.createElement('div');
      areaChartContainer.id = 'area-chart';
      areaChartContainer.className = 'chart-container';
      areaChartContainer.innerHTML = '<p>Area Chart Will Appear Here</p>';

      const multiSeriesContainer = document.createElement('div');
      multiSeriesContainer.id = 'multi-series-chart';
      multiSeriesContainer.className = 'chart-container';
      multiSeriesContainer.innerHTML = '<p>Multi-Series Chart Will Appear Here</p>';

      // Add containers to main
      main.appendChild(lineChartContainer);
      main.appendChild(areaChartContainer);
      main.appendChild(multiSeriesContainer);

      // Clear and add header and main to root
      root.innerHTML = '';
      root.appendChild(header);
      root.appendChild(main);

      console.log('Basic UI elements created');

      // Create charts once the DOM is ready
      setTimeout(() => {
        console.log('Starting chart creation');
        try {
          createLineChart();
          createAreaChart();
          createMultiSeriesChart();
          console.log('All charts created successfully');
        } catch (error) {
          console.error('Error creating charts:', error);
          document.getElementById('line-chart').innerHTML =
            `<p>Error creating charts: ${error.message}</p>`;
        }
      }, 500);

      function createLineChart() {
        console.log('Creating line chart');
        // Create data source from sample data
        const dataSource = new ArrayDataSource(SAMPLE_DATA);
        console.log('Data source created:', dataSource);

        // Create line chart
        const lineChart = createChart('line', dataSource, {
          title: {
            text: 'Monthly Sales'
          },
          xAxis: {
            field: 'month',
            title: 'Month'
          },
          yAxis: {
            title: 'Sales ($K)'
          },
          series: {
            field: 'sales',
            name: 'Sales',
            lineWidth: 3,
            color: '#4285F4',
            marker: {
              show: true,
              size: 8
            }
          }
        });

        console.log('Line chart created:', lineChart);

        // Render line chart
        lineChart.render('#line-chart');
        console.log('Line chart rendered');
      }

      function createAreaChart() {
        console.log('Creating area chart');
        // Create data source from sample data
        const dataSource = new ArrayDataSource(SAMPLE_DATA);

        // Create area chart (line chart with area fill)
        const areaChart = createChart('line', dataSource, {
          title: {
            text: 'Monthly Profit'
          },
          xAxis: {
            field: 'month',
            title: 'Month'
          },
          yAxis: {
            title: 'Profit ($K)'
          },
          series: {
            field: 'profit',
            name: 'Profit',
            lineWidth: 3,
            color: '#34A853',
            area: {
              show: true,
              opacity: 0.3
            },
            marker: {
              show: true
            }
          }
        });

        // Render area chart
        areaChart.render('#area-chart');
        console.log('Area chart rendered');
      }

      function createMultiSeriesChart() {
        console.log('Creating multi-series chart');
        // Create data source from sample data
        const dataSource = new ArrayDataSource(SAMPLE_DATA);

        // Create multi-series line chart
        const multiSeriesChart = createChart('line', dataSource, {
          title: {
            text: 'Sales vs Costs'
          },
          xAxis: {
            field: 'month',
            title: 'Month'
          },
          yAxis: {
            title: 'Amount ($K)'
          },
          series: [
            {
              field: 'sales',
              name: 'Sales',
              color: '#4285F4',
              marker: {
                show: true
              }
            },
            {
              field: 'costs',
              name: 'Costs',
              color: '#EA4335',
              marker: {
                show: true
              }
            }
          ]
        });

        // Render multi-series chart
        multiSeriesChart.render('#multi-series-chart');
        console.log('Multi-series chart rendered');
      }
    }
  };
}