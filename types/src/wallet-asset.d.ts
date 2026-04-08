/**
 * @typedef {z.infer<typeof WdkAssetSchema>} WdkAsset - Type representing a validated WDK asset object.
 */
/**
 * @typedef {z.infer<typeof WdkAssetListSchema>} WdkAssetList - Type representing a list of validated WDK asset objects.
 */
export const WdkAssetSchema: z.ZodObject<{
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export const WdkAssetListSchema: z.ZodArray<z.ZodObject<{
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>>;
export const WdkAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>>;
export const WdkAssetListJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodArray<z.ZodObject<{
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    chainId: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>>>;
/**
 * - Type representing a validated WDK asset object.
 */
export type WdkAsset = z.infer<typeof WdkAssetSchema>;
/**
 * - Type representing a list of validated WDK asset objects.
 */
export type WdkAssetList = z.infer<typeof WdkAssetListSchema>;
import { z } from 'zod';
