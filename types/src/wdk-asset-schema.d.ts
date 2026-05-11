/** @typedef {z.infer<typeof BaseAssetSchema>} BaseAsset */
/** @typedef {z.infer<typeof TokenAssetSchema>} TokenAsset */
export const BaseAssetSchema: z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodUnion<readonly [z.ZodInt, z.ZodString]>;
}, z.core.$strip>;
export const BaseAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodUnion<readonly [z.ZodInt, z.ZodString]>;
}, z.core.$strip>>;
export const TokenAssetSchema: z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodUnion<readonly [z.ZodInt, z.ZodString]>;
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodInt;
    isNative: z.ZodBoolean;
}, z.core.$strip>;
export const TokenAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodUnion<readonly [z.ZodInt, z.ZodString]>;
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodInt;
    isNative: z.ZodBoolean;
}, z.core.$strip>>;
export type BaseAsset = z.infer<typeof BaseAssetSchema>;
export type TokenAsset = z.infer<typeof TokenAssetSchema>;
import { z } from 'zod';
