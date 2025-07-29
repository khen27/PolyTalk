#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Performance Benchmarking Script for PolyTalk TypeScript Migration
 * Tracks: Bundle size, component count, file structure
 */

const BENCHMARK_FILE = 'performance-benchmarks.json';

function getBundleStats() {
  const appJsPath = path.join(__dirname, '..', 'App.js');
  const srcPath = path.join(__dirname, '..', 'src');
  
  let totalLines = 0;
  let componentCount = 0;
  let fileCount = 0;
  
  // Count App.js lines
  if (fs.existsSync(appJsPath)) {
    const appContent = fs.readFileSync(appJsPath, 'utf8');
    totalLines += appContent.split('\n').length;
    
    // Count components in App.js (rough estimate)
    const componentMatches = appContent.match(/const \w+.*=.*\(/g) || [];
    componentCount += componentMatches.length;
    fileCount += 1;
  }
  
  // Count src/ files if they exist
  if (fs.existsSync(srcPath)) {
    const countFilesRecursively = (dir) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          countFilesRecursively(fullPath);
        } else if (item.endsWith('.js') || item.endsWith('.ts') || item.endsWith('.tsx')) {
          fileCount += 1;
          const content = fs.readFileSync(fullPath, 'utf8');
          totalLines += content.split('\n').length;
          
          // Count exported components
          const exportMatches = content.match(/export.*(?:const|function|class)\s+\w+/g) || [];
          componentCount += exportMatches.length;
        }
      });
    };
    
    countFilesRecursively(srcPath);
  }
  
  return {
    totalLines,
    componentCount,
    fileCount,
    timestamp: new Date().toISOString(),
    phase: getCurrentPhase()
  };
}

function getCurrentPhase() {
  // Determine current phase based on file structure
  const srcExists = fs.existsSync(path.join(__dirname, '..', 'src'));
  const tsConfigExists = fs.existsSync(path.join(__dirname, '..', 'tsconfig.json'));
  
  if (!tsConfigExists) return 'pre-migration';
  if (!srcExists) return 'phase-1';
  
  const iconFiles = fs.existsSync(path.join(__dirname, '..', 'src', 'components', 'icons'));
  if (!iconFiles) return 'phase-2-start';
  
  return 'phase-2-active';
}

function saveBenchmark(stats) {
  let benchmarks = [];
  
  if (fs.existsSync(BENCHMARK_FILE)) {
    const existing = fs.readFileSync(BENCHMARK_FILE, 'utf8');
    benchmarks = JSON.parse(existing);
  }
  
  benchmarks.push(stats);
  
  fs.writeFileSync(BENCHMARK_FILE, JSON.stringify(benchmarks, null, 2));
  
  console.log('📊 Performance Benchmark Saved:');
  console.log(`   Phase: ${stats.phase}`);
  console.log(`   Total Lines: ${stats.totalLines}`);
  console.log(`   Components: ${stats.componentCount}`);
  console.log(`   Files: ${stats.fileCount}`);
  
  if (benchmarks.length > 1) {
    const previous = benchmarks[benchmarks.length - 2];
    const lineDiff = stats.totalLines - previous.totalLines;
    const fileDiff = stats.fileCount - previous.fileCount;
    
    console.log(`   📈 Changes: ${lineDiff > 0 ? '+' : ''}${lineDiff} lines, ${fileDiff > 0 ? '+' : ''}${fileDiff} files`);
  }
}

// Run benchmark
const stats = getBundleStats();
saveBenchmark(stats);

module.exports = { getBundleStats, saveBenchmark }; 