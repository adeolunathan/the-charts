#!/bin/bash
# BizCharts Project Setup Script
# This script creates the directory structure and initial files for the BizCharts platform

# Create main project directory
mkdir -p charts
cd charts

# Create package.json
cat > package.json << 'EOF'
{
  "name": "charts",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "cd apps/web && npm run dev",
    "build": "cd apps/web && npm run build",
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "typescript": "^5.0.4"
  }
}
EOF

# Create README.md
cat > README.md << 'EOF'
# BizCharts

A comprehensive chart visualization platform for creating beautiful, publication-quality charts.

## Project Structure

- `packages/` - Core libraries and modules
  - `core/` - Core chart rendering logic
  - `data-processing/` - Data handling and transformation
  - `themes/` - Styling and theming
  - `ui/` - Frontend UI components
  - `api/` - Backend API services
- `apps/` - Applications
  - `web/` - Main web application (BizCharts)
- `examples/` - Example usage and demos
- `docs/` - Documentation
- `tests/` - Test files
- `scripts/` - Build and utility scripts

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# dependencies
node_modules/
.pnp/
.pnp.js

# testing
coverage/

# production
build/
dist/

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg

# IDE
.idea/
.vscode/
*.swp
*.swo
EOF

# Create directory structure
mkdir -p packages/core/src packages/core/tests
mkdir -p packages/data-processing/src packages/data-processing/tests
mkdir -p packages/themes/src packages/themes/tests
mkdir -p packages/ui/src packages/ui/tests
mkdir -p packages/api/src packages/api/tests
mkdir -p apps/web/src apps/web/public
mkdir -p examples
mkdir -p docs
mkdir -p tests
mkdir -p scripts

# Create package.json files for each package
for pkg in core data-processing themes ui api; do
  cat > packages/$pkg/package.json << EOF
{
  "name": "@charts/$pkg",
  "version": "0.1.0",
  "main": "src/index.js",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  }
}
EOF

  # Create index.js file for each package
  cat > packages/$pkg/src/index.js << EOF
// @charts/$pkg package
export default {};
EOF
done

# Set up web app
cat > apps/web/package.json << 'EOF'
{
  "name": "@charts/web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@charts/core": "0.1.0",
    "@charts/data-processing": "0.1.0",
    "@charts/themes": "0.1.0",
    "@charts/ui": "0.1.0",
    "@charts/api": "0.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "devDependencies": {
    "vite": "^4.3.5"
  }
}
EOF

# Create initial web app files
cat > apps/web/src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BizCharts - Professional Chart Visualization Platform</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./main.js"></script>
</body>
</html>
EOF

cat > apps/web/src/main.js << 'EOF'
import { createApp } from './app';

const app = createApp();
app.mount('#root');
EOF

cat > apps/web/src/app.js << 'EOF'
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
EOF

echo "BizCharts project structure has been created successfully!"