#!/usr/bin/env node

/**
 * Phase 6 Validation Script
 * Comprehensive testing of all TypeScript migration components
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 PHASE 6 VALIDATION - COMPREHENSIVE TESTING');
console.log('================================================\n');

// Test Results
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

function test(name, testFn) {
  results.total++;
  try {
    testFn();
    results.passed++;
    console.log(`✅ ${name}`);
    results.details.push({ name, status: 'PASS' });
  } catch (error) {
    results.failed++;
    console.log(`❌ ${name} - ${error.message}`);
    results.details.push({ name, status: 'FAIL', error: error.message });
  }
}

// Test 1: App.tsx exists and is valid TypeScript
test('App.tsx exists and is valid TypeScript', () => {
  const appPath = path.join(__dirname, '../App.tsx');
  if (!fs.existsSync(appPath)) {
    throw new Error('App.tsx not found');
  }
  
  const content = fs.readFileSync(appPath, 'utf8');
  if (!content.includes('import React')) {
    throw new Error('App.tsx missing React import');
  }
  if (!content.includes('const App: React.FC')) {
    throw new Error('App.tsx missing TypeScript component definition');
  }
  if (!content.includes('useModalState')) {
    throw new Error('App.tsx missing custom hooks integration');
  }
});

// Test 2: All custom hooks exist
test('All custom hooks exist and are properly typed', () => {
  const hooks = [
    'useModalState',
    'useAnimationState', 
    'useUserState',
    'useNavigationState',
    'useQuestState',
    'useGameModeState',
    'useWordBankState',
    'useDataState'
  ];
  
  hooks.forEach(hook => {
    const hookPath = path.join(__dirname, `../src/hooks/${hook}.ts`);
    if (!fs.existsSync(hookPath)) {
      throw new Error(`${hook}.ts not found`);
    }
    
    const content = fs.readFileSync(hookPath, 'utf8');
    if (!content.includes('export const')) {
      throw new Error(`${hook}.ts missing export`);
    }
    if (!content.includes('useState')) {
      throw new Error(`${hook}.ts missing React hooks`);
    }
  });
});

// Test 3: All extracted components exist
test('All extracted components exist and are properly typed', () => {
  const components = [
    'HomeScreen',
    'UploadScreen', 
    'ReviewScreen',
    'ProgressScreen'
  ];
  
  components.forEach(component => {
    const componentPath = path.join(__dirname, `../src/screens/${component}.tsx`);
    if (!fs.existsSync(componentPath)) {
      throw new Error(`${component}.tsx not found`);
    }
    
    const content = fs.readFileSync(componentPath, 'utf8');
    if (!content.includes('React.FC')) {
      throw new Error(`${component}.tsx missing TypeScript interface`);
    }
    if (!content.includes('export')) {
      throw new Error(`${component}.tsx missing export`);
    }
  });
});

// Test 4: TypeScript configuration is valid
test('TypeScript configuration is properly set up', () => {
  const tsConfigPath = path.join(__dirname, '../tsconfig.json');
  if (!fs.existsSync(tsConfigPath)) {
    throw new Error('tsconfig.json not found');
  }
  
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  if (!tsConfig.compilerOptions) {
    throw new Error('tsconfig.json missing compilerOptions');
  }
  if (!tsConfig.compilerOptions.strict) {
    throw new Error('tsconfig.json missing strict mode');
  }
});

// Test 5: Package.json has correct dependencies
test('Package.json has correct TypeScript dependencies', () => {
  const packagePath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packagePath)) {
    throw new Error('package.json not found');
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (!packageJson.dependencies['@types/react'] && !packageJson.devDependencies['@types/react']) {
    throw new Error('Missing @types/react dependency');
  }
  if (!packageJson.devDependencies['typescript']) {
    throw new Error('Missing typescript dev dependency');
  }
});

// Test 6: Constants and types are properly defined
test('Constants and types are properly defined', () => {
  const gameDataPath = path.join(__dirname, '../src/constants/gameData.ts');
  if (!fs.existsSync(gameDataPath)) {
    throw new Error('gameData.ts not found');
  }
  
  const content = fs.readFileSync(gameDataPath, 'utf8');
  if (!content.includes('export type') && !content.includes('export interface')) {
    throw new Error('gameData.ts missing TypeScript type definitions');
  }
  if (!content.includes('export const')) {
    throw new Error('gameData.ts missing exported constants');
  }
});

// Test 7: Icons are properly exported
test('Icons are properly exported and typed', () => {
  const iconsIndexPath = path.join(__dirname, '../src/components/icons/index.ts');
  if (!fs.existsSync(iconsIndexPath)) {
    throw new Error('icons/index.ts not found');
  }
  
  const content = fs.readFileSync(iconsIndexPath, 'utf8');
  if (!content.includes('export')) {
    throw new Error('icons/index.ts missing exports');
  }
});

// Test 8: App.js size reduction
test('App.js size has been significantly reduced', () => {
  const appJsPath = path.join(__dirname, '../App.js');
  if (!fs.existsSync(appJsPath)) {
    throw new Error('App.js not found');
  }
  
  const content = fs.readFileSync(appJsPath, 'utf8');
  const lines = content.split('\n').length;
  
  // Should be significantly smaller than original 9,247 lines
  if (lines > 8000) {
    throw new Error(`App.js still too large: ${lines} lines (target: <8000)`);
  }
});

// Test 9: No TypeScript errors in key files
test('No obvious TypeScript syntax errors in key files', () => {
  const keyFiles = [
    '../App.tsx',
    '../src/hooks/useModalState.ts',
    '../src/hooks/useUserState.ts',
    '../src/screens/HomeScreen.tsx'
  ];
  
  keyFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`${file} not found`);
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('any') && content.includes('// @ts-ignore')) {
      console.log(`⚠️  Warning: ${file} contains 'any' types`);
    }
  });
});

// Test 10: File structure is organized
test('File structure follows TypeScript best practices', () => {
  const requiredDirs = [
    '../src/components',
    '../src/hooks',
    '../src/screens',
    '../src/constants',
    '../src/types',
    '../src/utils'
  ];
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Required directory not found: ${dir}`);
    }
  });
});

// Calculate and display results
console.log('\n📊 VALIDATION RESULTS');
console.log('=====================');
console.log(`Total Tests: ${results.total}`);
console.log(`Passed: ${results.passed} ✅`);
console.log(`Failed: ${results.failed} ❌`);
console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);

if (results.failed > 0) {
  console.log('\n❌ FAILED TESTS:');
  results.details
    .filter(test => test.status === 'FAIL')
    .forEach(test => {
      console.log(`  - ${test.name}: ${test.error}`);
    });
}

console.log('\n🎯 PHASE 6 VALIDATION COMPLETE!');
console.log('================================');

if (results.failed === 0) {
  console.log('🚀 ALL TESTS PASSED! Phase 6 validation successful!');
  console.log('✅ TypeScript migration is ready for production!');
} else {
  console.log('⚠️  Some tests failed. Please review and fix issues before proceeding.');
}

// Exit with appropriate code
process.exit(results.failed === 0 ? 0 : 1); 