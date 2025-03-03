# BizCharts

A comprehensive chart visualization platform for creating beautiful, publication-quality charts for business, science, finance, and marketing applications.

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

## Technology Stack

- TypeScript for type safety and better developer experience
- Yarn workspaces for monorepo management
- Canvas-based rendering for charts
- Modular architecture with clear separation of concerns
- Modern ES modules for better tree-shaking and bundling

## Getting Started

### Prerequisites

- Node.js 14+ 
- Yarn 1.22+

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/charts.git
   cd charts
   ```

2. Run the setup script to initialize Yarn and install dependencies:
   ```bash
   chmod +x setup-yarn.sh
   ./setup-yarn.sh
   ```

   Or manually install dependencies:
   ```bash
   yarn install
   yarn build:core
   ```

### Development

Start the development server:
```bash
yarn dev
```

Build all packages:
```bash
yarn build
```

Build just the core package:
```bash
yarn build:core
```

Run tests:
```bash
yarn test
```

## Features

- **30+ Chart Types**: Line, area, bar, pie, scatter, bubble, radar, heatmap, and more
- **Consistent Styling**: Built-in themes with coordinated typography, colors, and styling
- **Customization**: Custom color palettes, themes, typography, and styling options
- **Multiple Data Formats**: Support for CSV, Excel, JSON, and API data sources
- **Export Options**: PNG, JPEG, SVG, and PDF output formats
- **Responsive Design**: Charts adapt to different screen sizes and device types

## Current Implementation

The current implementation includes:

- Core chart framework with interfaces and base classes
- Line chart implementation with area chart functionality
- Data handling with ArrayDataSource for in-memory data
- Theme system with a professional default theme
- Basic rendering pipeline using Canvas API

## Architecture Overview

BizCharts is built with a modular architecture:

1. **Core Package**: Defines interfaces, base implementations, and the rendering pipeline
2. **Chart Implementations**: Each chart type extends BaseChart and implements specific rendering logic
3. **Data Sources**: Abstract data access with support for different formats and transformations
4. **Themes**: Provides consistent styling across all chart types
5. **UI Components**: Reusable UI elements for the web application interface

## Next Steps

- Implement more chart types (Bar, Pie, Scatter)
- Enhance data processing capabilities
- Add animation support
- Improve accessibility features
- Develop advanced UI for chart configuration

## License

[Your License] - See LICENSE file for details

## Contributing

[Your Contribution Guidelines]