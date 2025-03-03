/**
 * Check if the core package is built and accessible
 */

console.log('Checking @charts/core package build');

try {
  // Attempt to require the core package
  const core = require('@charts/core');

  console.log('Successfully imported core package');
  console.log('Available exports:');

  // Check key exports
  const checks = [
    { name: 'createChart', type: typeof core.createChart },
    { name: 'ArrayDataSource', type: typeof core.ArrayDataSource },
    { name: 'LineChart', type: typeof core.LineChart },
    { name: 'BaseChart', type: typeof core.BaseChart },
    { name: 'DEFAULT_THEME', type: typeof core.DEFAULT_THEME },
    { name: 'VERSION', type: typeof core.VERSION }
  ];

  checks.forEach(check => {
    console.log(`- ${check.name}: ${check.type}`);
    if (check.type === 'undefined') {
      console.error(`  ❌ ${check.name} is not exported!`);
    } else {
      console.log(`  ✅ ${check.name} is available`);
    }
  });

} catch (error) {
  console.error('❌ Error importing core package:', error.message);
  console.error(error.stack);
}