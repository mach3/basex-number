# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BaseXNumber is a TypeScript library for encoding/decoding numbers using BaseX encoding. By default, it applies base64 encoding using `btoa`/`atob`, but this can be disabled with custom callbacks.

## Development Commands

### Build
```bash
pnpm run build        # Build both ESM and CJS
pnpm run build:esm    # Build ESM only (dist/esm/)
pnpm run build:cjs    # Build CJS only (dist/cjs/)
```

### Test
```bash
pnpm test             # Run all tests with Jest
pnpm test -- --watch  # Watch mode
pnpm test -- index    # Run specific test file only
```

### Lint
```bash
pnpm biome check      # Check lint/format with Biome
pnpm biome check --write  # Auto-fix
```

## Architecture

### Core Implementation

The project has a simple single-file structure:

- `src/index.ts` - BaseXNumber class and related utilities
- `__tests__/index.test.ts` - Test suite

### Key Components

1. **BaseXNumber class** (`src/index.ts:63`)
   - `map`: Character set used for encoding/decoding (default: a-zA-Z)
   - `encode(input, callback?)`: Encode number to string
   - `decode(input, callback?)`: Decode string to number

2. **Encoding Algorithm**
   - Add 1024 offset to input value
   - Shuffle map a random number of times (0 to map.length-1)
   - Store shuffle count as the first character of the result
   - Perform base conversion using the shuffled map
   - Apply base64 encoding with btoa by default (removing `=`)

3. **Decoding Algorithm**
   - Apply base64 decoding with atob by default
   - Restore shuffle count from first character
   - Reproduce the same shuffle process
   - Perform base conversion to restore number and subtract 1024

4. **Shuffle function** (`src/index.ts:21`)
   - Alternately reorders the map for the specified count
   - Deterministic to ensure encode/decode consistency

### Build Configuration

- **Dual Package**: Outputs both ESM (`dist/esm/`) and CJS (`dist/cjs/`)
- **tsconfig.json**: Base configuration (strict mode, ES2016 target)
- **tsconfig.esm.json**: ESM configuration (module: ESNext)
- **tsconfig.cjs.json**: CJS configuration (module: CommonJS)

### Testing Strategy

- Uses Jest and ts-jest
- Round-trip tests (encode → decode)
- Tests both default callbacks and custom callbacks
- Tests with custom maps

## Development Notes

### Adding New Features

When adding new features:
1. Implement logic in `src/index.ts`
2. Add tests in `__tests__/index.test.ts`
3. Verify both builds (ESM/CJS) pass
4. Update usage examples in README.md if needed

### Type Safety

- Strict mode enabled
- JSDoc comments required for all public APIs
- `baseUrl: "./src"` allows absolute imports from src

### Code Style

- Formatting and linting managed by Biome
- Indentation: spaces
- Quotes: double quotes (JavaScript)
