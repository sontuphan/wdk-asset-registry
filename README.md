# @tetherto/wdk-asset-registry

**Note**: This package is currently in beta. Please test thoroughly in development environments before using in production.

A lightweight registry for accessing predefined blockchain assets across mutiple chain. This package provides a simple and consistent way to retrieve asset metadata such as symbol, decimals, contract address, and native-asset status.

## 🔍 About WDK

This module is part of the [**WDK (Wallet Development Kit)**](https://wallet.tether.io/) project, which empowers developers to build secure, non-custodial wallets with unified blockchain access, stateless architecture, and complete user control.

For detailed documentation about the complete WDK ecosystem, visit [docs.wallet.tether.io](https://docs.wallet.tether.io).

## 🌟 Features

- **Predefined Asset Registry**: Access commonly used assets out of the box
- **Bundled Asset Lists**: Import registry-ready assets from `@tetherto/wdk-asset-registry/assets/*`
- **Standardized Metadata**: Symbol, name, decimals, contract address, and native-asset flag
- **Fast Lookup**: Retrieve assets by symbol or address
- **Lightweight**: No RPC or blockchain interaction required
- **In-Memory Registry**: Supports both lookup and local registration of assets

## ⬇️ Installation

To install the `@tetherto/wdk-asset-registry` package, follow these instructions:

You can install it using npm:

```bash
npm install @tetherto/wdk-asset-registry
```

## 🚀 Quick Start

### Importing from `@tetherto/wdk-asset-registry`

```javascript
import { WdkAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonAssets from '@tetherto/wdk-asset-registry/assets/common'

const registry = new WdkAssetRegistry(commonAssets)
```

### Get Assets by Symbol

```javascript
const usdt = registry.getTokenBySymbol('usdt')
console.log(usdt)
```

### Get Assets by Address

```javascript
const usdt = registry.getTokenByAddress(
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'
)
console.log(usdt)
```

### Filter by Chain ID

```javascript
const ethereumUsdt = registry.getTokenBySymbol('usdt', { chainId: 1 })
console.log(ethereumUsdt)
```

### Register a Custom Asset

```javascript
registry.registerAsset({
  address: '0x1111111111111111111111111111111111111111',
  symbol: 'TEST',
  name: 'Test Token',
  decimals: 18,
  chainId: 1,
  isNative: false,
  logoURI: 'https://example.com/test.png'
})
```

## 📚 API Reference

### Table of Contents

| Section                  | Description                | Methods                                                                        |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------ |
| [Types](#wdkasset-types) | Asset data structure       | [WdkAsset](#wdkasset), [WdkAssetList](#wdkassetlist)                           |
| [Registry](#wdkassetregistry) | Registry class for asset storage and lookup | [Constructor](#constructor), [Methods](#methods) |

### Types

#### WdkAsset

```typescript
type WdkAsset = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: number;
  isNative: boolean;
  logoURI: string;
  tags?: (string | { name: string; description: string })[] | undefined;
  extensions?: Record<string, unknown> | undefined;
};
```

#### WdkAssetList

```typescript
type WdkAssetList = WdkAsset[];
```

#### WdkAssetFilter

```typescript
type WdkAssetFilter = {
  chainId?: number;
  caseSensitive?: boolean;
};
```

### WdkAssetRegistry

Registry class for storing and looking up assets in memory.

#### Constructor

```javascript
new WdkAssetRegistry(assets)
```

**Parameters:**

- `assets` (`WdkAssetList`): Predefined asset list used by the registry

**Example:**

```javascript
import { WdkAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonAssets from '@tetherto/wdk-asset-registry/assets/common'

const registry = new WdkAssetRegistry(commonAssets)
```

#### Methods

| Method | Description | Returns |
| --- | --- | --- |
| `registerAsset(asset, [force])` | Register a single asset | `number` |
| `registerAssets(assets, [force])` | Register multiple assets | `number[]` |
| `getAllTokens()` | Get all registered assets | `WdkAssetList` |
| `getTokenBySymbol(symbol, [filter])` | Get assets by symbol | `WdkAssetList` |
| `getTokenByTicker(ticker, [filter])` | Alias of `getTokenBySymbol` | `Promise<WdkAssetList>` |
| `getTokenByAddress(address, [filter])` | Get assets by address | `WdkAssetList` |

#### registerAsset

Register a single asset in the registry.

**Parameters:**

- `asset` (`WdkAsset`): Asset definition to insert or replace
- `force` (boolean, optional): When `true`, replaces an existing asset with the same address and chain ID

**Returns:** `number` - The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled

#### registerAssets

Register multiple assets in the registry.

**Parameters:**

- `assets` (`WdkAssetList`): Asset definitions to insert or replace
- `force` (boolean, optional): When `true`, replaces existing assets with the same address and chain ID

**Returns:** `number[]` - The result of each `registerAsset` call in input order

#### getAllTokens

Get all registered assets.

**Returns:** `WdkAssetList`

#### getTokenBySymbol

Get asset metadata by symbol.

**Parameters:**

- `symbol` (string): Asset symbol to look up, such as `usdt` or `usdt0`
- `filter` (`WdkAssetFilter`, optional): Lookup filters such as `chainId` and `caseSensitive`

**Returns:** `WdkAssetList`

**Example:**

```javascript
const assets = registry.getTokenBySymbol('usdt')
console.log(assets)
```

You can also filter by chain:

```javascript
const ethereumUsdt = registry.getTokenBySymbol('usdt', { chainId: 1 })
console.log(ethereumUsdt)
```

#### getTokenByTicker

Alias of `getTokenBySymbol`.

**Parameters:**

- `ticker` (string): Asset symbol to look up
- `filter` (`WdkAssetFilter`, optional): Lookup filters such as `chainId` and `caseSensitive`

**Returns:** `Promise<WdkAssetList>`

#### getTokenByAddress

Get asset metadata by contract address.

**Parameters:**

- `address` (string): Contract address to look up
- `filter` (`WdkAssetFilter`, optional): Lookup filters such as `chainId` and `caseSensitive`

**Returns:** `WdkAssetList`

**Example:**

```javascript
const assets = registry.getTokenByAddress(
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'
)
console.log(assets)
```

You can also filter by chain:

```javascript
const ethereumUsdt = registry.getTokenByAddress(
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  { chainId: 1 }
)
console.log(ethereumUsdt)
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
