# @tetherto/wdk-asset-registry

**Note**: This package is currently in beta. Please test thoroughly in development environments before using in production.

A lightweight registry for accessing predefined blockchain assets across mutiple chain. This package provides a simple and consistent way to retrieve asset metadata such as symbol, decimals, and contract address.

## 🔍 About WDK

This module is part of the [**WDK (Wallet Development Kit)**](https://wallet.tether.io/) project, which empowers developers to build secure, non-custodial wallets with unified blockchain access, stateless architecture, and complete user control.

For detailed documentation about the complete WDK ecosystem, visit [docs.wallet.tether.io](https://docs.wallet.tether.io).

## 🌟 Features

- **Predefined Asset Registry**: Access commonly used assets out of the box
- **Standardized Metadata**: Symbol, name, decimals, and contract address
- **Fast Lookup**: Retrieve assets by symbol or address
- **Lightweight**: No RPC or blockchain interaction required
- **Read-Only Design**: Focused on asset retrieval, not mutation

## ⬇️ Installation

To install the `@tetherto/wdk-asset-registry` package, follow these instructions:

You can install it using npm:

```bash
npm install @tetherto/wdk-asset-registry
```

## 🚀 Quick Start

### Importing from `@tetherto/wdk-asset-registry`

```javascript
import {
  getAssetBySymbol,
  getAssetByAddress,
} from "@tetherto/wdk-asset-registry";
```

### Get Asset by Symbol

```javascript
const usdt = await getAssetBySymbol("usdt");
console.log(usdt);
```

### Get Asset by Address

```javascript
const usdt = await getAssetByAddress(
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
);
console.log(usdt);
```

### Get Asset by symbol (or address) and filter by chainId

```javascript
// Get USDT0 metadata on Arbitrum
const usdt0 = await getAssetBySymbol("usdt0", 42161);
console.log(usdt0);
```

## 📚 API Reference

### Table of Contents

| Section                  | Description                | Methods                                                                        |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------ |
| [Types](#wdkasset-types) | Asset data structure       | [WdkAsset](#wdkasset), [WdkAssetList](#wdkassetlist)                           |
| [Methods](#methods)      | Available lookup functions | [getAssetBySymbol](#getassetbysymbol), [getAssetByAddress](#getassetbyaddress) |

### Types

#### WdkAsset

```typescript
type WdkAsset = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  tags?: (string | { name: string; description: string })[] | undefined;
  extensions?: Record<string, unknown> | undefined;
};
```

#### WdkAssetList

```typescript
type WdkAssetList = WdkAsset[];
```

### Methods

| Method                                  | Description                   | Returns                              |
| --------------------------------------- | ----------------------------- | ------------------------------------ |
| `getAssetBySymbol(symbol, [chainId])`   | Get asset metadata by symbol  | `Promise<WdkAssetList \| undefined>` |
| `getAssetByAddress(address, [chainId])` | Get asset metadata by address | `Promise<WdkAssetList \| undefined>` |

#### getAssetBySymbol

Get asset metadata by symbol.

**Parameters:**

- `symbol` (string): Asset symbol to look up, such as `usdt` or `usdt0`
- `chainId` (number, optional): Chain ID used to filter matching assets

**Returns:** `Promise<WdkAssetList | undefined>` - A list of matching assets, or `undefined` if no asset is found

**Example:**

```javascript
const assets = await getAssetBySymbol("usdt");
console.log(assets);
```

You can also filter by chain:

```javascript
const arbitrumUsdt0 = await getAssetBySymbol("usdt0", 42161);
console.log(arbitrumUsdt0);
```

#### getAssetByAddress

Get asset metadata by contract address.

**Parameters:**

- `address` (string): Contract address to look up
- `chainId` (number, optional): Chain ID used to filter matching assets

**Returns:** `Promise<WdkAssetList | undefined>` - A list of matching assets, or `undefined` if no asset is found

**Example:**

```javascript
const assets = await getAssetByAddress(
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
);
console.log(assets);
```

You can also filter by chain:

```javascript
const ethereumUsdt = await getAssetByAddress(
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  1,
);
console.log(ethereumUsdt);
```

### JSON Schemas

| Schemas                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `WdkAssetJsonSchema`     | JSON Schema representation of a single `WdkAsset` object |
| `WdkAssetListJsonSchema` | JSON Schema representation of a `WdkAssetList` payload   |

## 🔒 Design Considerations

- **No RPC Dependency**: Pure metadata access
- **Deterministic Lookups**: Simple and predictable results
- **Read-Only Registry**: No mutation or runtime changes
- **Composable**: Designed to work alongside wallet/protocol modules (i.e. `wdk-wallet-*` and `wdk-protocol-*`)

## 🛠️ Development

### Building

```bash
# Install dependencies
npm install

# Build TypeScript definitions
npm run build:types

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📜 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🆘 Support

For support, please open an issue on the GitHub repository.
