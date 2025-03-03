// Add version log
console.log('BizCharts web app starting up');

// Import app creator function
import { createApp } from './app';

console.log('Imported createApp function');

// Initialize the application
const app = createApp();
console.log('App created');

// Function to initialize the app
function initApp() {
  console.log('Initializing app');
  try {
    app.mount('#root');
    console.log('App mounted successfully');
  } catch (error) {
    console.error('Error mounting app:', error);
    document.getElementById('root').innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>Error initializing application</h2>
        <pre>${error.message}</pre>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}

// Mount the app when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
  console.log('Waiting for DOM content to load');
} else {
  console.log('DOM already loaded, initializing immediately');
  initApp();
}