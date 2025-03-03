export function createApp() {
  return {
    mount: (selector) => {
      const root = document.querySelector(selector);
      root.innerHTML = `
        <div class="bizcharts-app">
          <header>
            <h1>BizCharts</h1>
            <p>Professional Chart Visualization Platform</p>
          </header>
          <main>
            <p>Welcome to BizCharts! Your visualization platform is being set up.</p>
          </main>
        </div>
      `;
    }
  };
}
