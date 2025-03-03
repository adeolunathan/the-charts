// Import from core package
import { createChart, ArrayDataSource } from '@charts/core';

console.log('BizCharts app loaded');
console.log('Core library available:', typeof createChart === 'function');

// Sample data for demonstration
const SAMPLE_DATA = [
  { month: 'Jan', sales: 42, costs: 30, profit: 12 },
  { month: 'Feb', sales: 55, costs: 35, profit: 20 },
  { month: 'Mar', sales: 70, costs: 40, profit: 30 },
  { month: 'Apr', sales: 65, costs: 42, profit: 23 },
  { month: 'May', sales: 78, costs: 45, profit: 33 },
  { month: 'Jun', sales: 90, costs: 50, profit: 40 }
];

export function createApp() {
  return {
    mount: (selector) => {
      console.log('Mounting app to', selector);
      const root = document.querySelector(selector);
      if (!root) {
        console.error('Root element not found');
        return;
      }

      // Create basic UI
      root.innerHTML = `
        <header style="background-color: #333; color: white; padding: 1.5rem; text-align: center;">
          <h1 style="margin: 0; font-size: 2.5rem;">BizCharts</h1>
          <p>Professional Chart Visualization Platform</p>
        </header>
        <main style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
          <div id="bizcharts-demo" style="background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 2rem; margin-bottom: 2rem;">
            <h2>BizCharts Integration</h2>
            <p>This demo uses our core library</p>
            <div id="lib-chart" style="height: 400px; border: 1px solid #eee; margin-top: 20px;"></div>
          </div>

          <div id="simple-demo" style="background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); padding: 2rem; margin-bottom: 2rem;">
            <h2>Simple Canvas Test</h2>
            <p>This is a direct canvas drawing without the library</p>
            <canvas id="simple-canvas" width="800" height="300" style="display: block; width: 100%; height: 300px; border: 1px solid #eee;"></canvas>
          </div>
        </main>
      `;

      // Attempt to create and render charts
      setTimeout(() => {
        try {
          // First draw a chart using our library
          renderLibraryChart();

          // Also draw a simple chart directly using Canvas API as a baseline
          renderSimpleChart();

          console.log('Charts rendered');
        } catch (error) {
          console.error('Error rendering charts:', error);
          document.getElementById('bizcharts-demo').innerHTML += `
            <div style="color: red; margin-top: 20px; padding: 15px; background: #fff0f0; border: 1px solid #ffcaca;">
              <h3>Error Rendering Chart</h3>
              <pre>${error.message}</pre>
              <pre>${error.stack}</pre>
            </div>
          `;
        }
      }, 200);

      function renderLibraryChart() {
        console.log('Creating chart with library');

        if (typeof createChart !== 'function') {
          throw new Error('createChart function is not available. Core library may not be imported correctly.');
        }

        if (typeof ArrayDataSource !== 'function') {
          throw new Error('ArrayDataSource is not available. Core library may not be imported correctly.');
        }

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
        lineChart.render('#lib-chart');
        console.log('Library chart rendered');
      }

      function renderSimpleChart() {
        console.log('Drawing simple chart directly');
        const canvas = document.getElementById('simple-canvas');
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set up dimensions
        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;

        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();

        // Draw data
        ctx.strokeStyle = '#4285F4';
        ctx.lineWidth = 2;
        ctx.beginPath();

        SAMPLE_DATA.forEach((point, index) => {
          const x = padding + (index / (SAMPLE_DATA.length - 1)) * width;
          const y = canvas.height - padding - (point.sales / 100 * height);

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // Draw labels
          ctx.fillStyle = '#333';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(point.month, x, canvas.height - padding + 20);

          // Draw data points
          ctx.fillStyle = '#4285F4';
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.stroke();

        console.log('Simple chart drawn directly');
      }
    }
  };
}