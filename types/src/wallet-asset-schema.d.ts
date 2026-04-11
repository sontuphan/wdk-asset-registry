/**
 * @typedef {z.infer<typeof BaseAssetSchema>} BaseAsset - Type representing a validated base asset object.
 */
export const BaseAssetSchema: z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
}, z.core.$strip>;
export const BaseAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
}, z.core.$strip>>;
/**
 * @typedef {z.infer<typeof TokenAssetSchema>} TokenAsset - Type representing a validated WDK asset object.
 */
export const TokenAssetSchema: z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export const TokenAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    address: z.ZodString;
    chainId: z.ZodNumber;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodURL;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>>;
/**
 * - Type representing a validated base asset object.
 */
export type BaseAsset = z.infer<typeof BaseAssetSchema>;
/**
 * - Type representing a validated WDK asset object.
 */
export type TokenAsset = z.infer<typeof TokenAssetSchema>;
import { z } from 'zod';
