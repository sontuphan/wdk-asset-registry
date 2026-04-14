# @tetherto/wdk-asset-registry

**Note**: This package is currently in beta. Please test thoroughly in development environments before using in production.

A lightweight registry for accessing predefined blockchain assets across multiple chains. This package provides a generic base asset registry plus a token-specific registry for retrieving metadata such as symbol, decimals, asset identifiers, contract addresses, and native-asset status.

## 🔍 About WDK

This module is part of the [**WDK (Wallet Development Kit)**](https://wallet.tether.io/) project, which empowers developers to build secure, non-custodial wallets with unified blockchain access, stateless architecture, and complete user control.

For detailed documentation about the complete WDK ecosystem, visit [docs.wallet.tether.io](https://docs.wallet.tether.io).

## 🌟 Features

- **Generic Asset Registry**: Build registries for reusable asset collections
- **Token Asset Registry**: Use token-specific lookups such as id, symbol, ticker, address, and chain
- **Bundled Asset Lists**: Import registry-ready assets from `@tetherto/wdk-asset-registry/assets/*`
- **Standardized Schemas**: Validate base assets and token assets with Zod
- **Flexible Lookup**: Query base assets with partial match filters
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
import { WdkTokenAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const registry = new WdkTokenAssetRegistry(commonTokens)
```

You can also preload multiple asset sets:

```javascript
const registry = new WdkTokenAssetRegistry(commonTokens, customTokens)
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

### Get Assets by ID

```javascript
const usdt = registry.getTokenById('1/0xdAC17F958D2ee523a2206206994597C13D831ec7')
console.log(usdt)
```

### Filter by Chain ID

```javascript
const ethereumUsdt = registry.getTokenByChain('1')
console.log(ethereumUsdt)
```

### Query Base Assets with Partial Filters

```javascript
import { BaseAssetSchema, WdkBaseAssetRegistry } from '@tetherto/wdk-asset-registry'

class CustomAssetRegistry extends WdkBaseAssetRegistry {
  _assertAsset (asset) {
    return BaseAssetSchema.parse(asset)
  }
}

const registry = new CustomAssetRegistry(commonTokens)

const ethereumUsdt = registry.getAsset([
  {
    id: '1/0xdAC17F958D2ee523a2206206994597C13D831ec7',
    chainId: '1'
  }
])
```

### Query Base Assets with Multiple Filters

```javascript
const selectedAssets = registry.getAsset([
  {
    symbol: 'USDT',
    chainId: '1'
  },
  {
    symbol: 'XAUt',
    chainId: '1'
  }
])

// Returns assets matching either condition above
console.log(selectedAssets)
```

### Register a Custom Asset

```javascript
registry.registerAsset({
  id: '1/0x1111111111111111111111111111111111111111',
  address: '0x1111111111111111111111111111111111111111',
  symbol: 'TEST',
  name: 'Test Token',
  decimals: 18,
  chainId: '1',
  isNative: false,
  logoURI: 'https://example.com/test.png'
})
```

## 📚 API Reference

### Table of Contents

| Section | Description | Methods |
| --- | --- | --- |
| [Types](#types) | Asset type definitions | [BaseAsset](#baseasset), [TokenAsset](#tokenasset), [BaseAssetFilter](#baseassetfilter), [BaseAssetOptions](#baseassetoptions) |
| [WdkBaseAssetRegistry](#wdkbaseassetregistry) | Generic registry for assets with ids and chain IDs | [Constructor](#constructor), [Methods](#methods) |
| [WdkTokenAssetRegistry](#wdktokenassetregistry) | Token-specific registry with symbol and ticker lookups | [Methods](#methods-1) |

### Types

#### BaseAsset

```typescript
type BaseAsset = {
  id: string;
  chainId: string;
};
```

#### TokenAsset

```typescript
type TokenAsset = BaseAsset & {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  isNative: boolean;
  logoURI: string;
  tags?: (string | { name: string; description: string })[] | undefined;
  extensions?: Record<string, unknown> | undefined;
};
```

#### BaseAssetOptions

```typescript
type BaseAssetOptions = {
  caseSensitive?: boolean;
};
```

#### BaseAssetFilter

```typescript
type BaseAssetFilter<T> = Partial<T>[];
```

Each array item is a partial match condition. Properties inside a single object are matched together, and multiple objects are evaluated as a union of conditions.

### WdkBaseAssetRegistry

Generic registry class for storing and looking up assets in memory.

#### Constructor

```javascript
new WdkBaseAssetRegistry(...assets)
```

**Parameters:**

- `...assets` (`T[][]`): One or more asset lists to preload into the registry

**Example using a concrete token registry:**

```javascript
import { WdkTokenAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const registry = new WdkTokenAssetRegistry(commonTokens)
```

**Extend the base registry in TypeScript:**

```typescript
import { z } from 'zod'
import { BaseAssetSchema, WdkBaseAssetRegistry } from '@tetherto/wdk-asset-registry'

type CustomAsset = {
  id: string
  chainId: string
  label: string
}

const CustomAssetSchema = BaseAssetSchema.extend({
  label: z.string()
})

class CustomAssetRegistry extends WdkBaseAssetRegistry<CustomAsset> {
  _assertAsset (asset: CustomAsset): CustomAsset {
    return CustomAssetSchema.parse(asset)
  }
}
```

#### Methods

| Method | Description | Returns |
| --- | --- | --- |
| `registerAsset(asset, [force])` | Register a single asset | `number` |
| `registerAssets(assets, [force])` | Register multiple assets | `number[]` |
| `getAllAssets()` | Get all registered assets | `T[]` |
| `getAssetById(id, [opts])` | Get one asset by identifier | `T \| undefined` |
| `getAsset(filter, [opts])` | Get assets using one or more partial match conditions | `T[]` |

#### registerAsset

Register a single asset in the registry.

**Parameters:**

- `asset` (`T`): Asset definition to insert or replace
- `force` (boolean, optional): When `true`, replaces an existing asset with the same id

**Returns:** `number` - The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled

#### registerAssets

Register multiple assets in the registry.

**Parameters:**

- `assets` (`T[]`): Asset definitions to insert or replace
- `force` (boolean, optional): When `true`, replaces existing assets with the same id

**Returns:** `number[]` - The result of each `registerAsset` call in input order

#### getAllAssets

Get all registered assets.

**Returns:** `T[]`

#### getAssetById

Get a single asset by identifier.

**Parameters:**

- `id` (string): Asset identifier to look up
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `T | undefined`

**Example:**

```javascript
const asset = registry.getAssetById('1/0xdAC17F958D2ee523a2206206994597C13D831ec7')
console.log(asset)
```

#### getAsset

Get asset metadata using one or more partial match conditions.

**Parameters:**

- `filter` (`BaseAssetFilter<T>`): One or more partial asset match conditions
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `T[]`

**Example:**

```javascript
const assets = registry.getAsset([
  {
    id: '1/0xdAC17F958D2ee523a2206206994597C13D831ec7',
    chainId: '1'
  }
])
console.log(assets)
```

### WdkTokenAssetRegistry

Token-specific registry built on top of `WdkBaseAssetRegistry<TokenAsset>`.

#### Methods

| Method | Description | Returns |
| --- | --- | --- |
| `getAllTokens()` | Get all registered tokens | `TokenAsset[]` |
| `getTokenById(id, [opts])` | Get one token by id | `TokenAsset \| undefined` |
| `getTokenByAddress(address, [opts])` | Get tokens by address | `TokenAsset[]` |
| `getTokenBySymbol(symbol, [opts])` | Get tokens by symbol | `TokenAsset[]` |
| `getTokenByTicker(ticker, [opts])` | Alias of `getTokenBySymbol` | `TokenAsset[]` |
| `getTokenByChain(chainId, [opts])` | Get tokens by chain id | `TokenAsset[]` |

#### getAllTokens

Get all registered tokens.

**Returns:** `TokenAsset[]`

#### getTokenBySymbol

Get token metadata by symbol.

**Parameters:**

- `symbol` (string): Token symbol to look up, such as `usdt` or `usdt0`
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `TokenAsset[]`

**Example:**

```javascript
const assets = registry.getTokenBySymbol('usdt')
console.log(assets)
```

#### getTokenById

Get a single token by asset identifier.

**Parameters:**

- `id` (string): Token asset identifier to look up
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `TokenAsset | undefined`

**Example:**

```javascript
const asset = registry.getTokenById('1/0xdAC17F958D2ee523a2206206994597C13D831ec7')
console.log(asset)
```

#### getTokenByChain

Get token metadata by chain identifier.

**Parameters:**

- `chainId` (string): Chain identifier to look up
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `TokenAsset[]`

**Example:**

```javascript
const ethereumUsdt = registry.getTokenByChain('1')
console.log(ethereumUsdt)
```

#### getTokenByTicker

Alias of `getTokenBySymbol`.

**Parameters:**

- `ticker` (string): Token symbol to look up
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `TokenAsset[]`

#### getTokenByAddress

Get token metadata by contract address.

**Parameters:**

- `address` (string): Token address to look up
- `opts` (`BaseAssetOptions`, optional): Lookup options such as `caseSensitive`

**Returns:** `TokenAsset[]`

**Example:**

```javascript
const assets = registry.getTokenByAddress(
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'
)
console.log(assets)
```

### JSON Schemas

| Schemas | Description |
| --- | --- |
| `BaseAssetJsonSchema` | JSON Schema representation of a single `BaseAsset` object |
| `TokenAssetJsonSchema` | JSON Schema representation of a single `TokenAsset` object |

## 🔒 Design Considerations

- **No RPC Dependency**: Pure metadata access
- **Deterministic Lookups**: Simple and predictable results
- **Extensible Registry**: Supports runtime registration and replacement of assets
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
