/** @typedef {z.infer<typeof BaseAssetSchema>} BaseAsset */
/** @typedef {z.infer<typeof TokenAssetSchema>} TokenAsset */
export const BaseAssetSchema: z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodString;
}, z.core.$strip>;
export const BaseAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodString;
}, z.core.$strip>>;
export const TokenAssetSchema: z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodString;
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodOptional<z.ZodURL>;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export const TokenAssetJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    id: z.ZodString;
    chainId: z.ZodString;
    address: z.ZodString;
    symbol: z.ZodString;
    name: z.ZodString;
    decimals: z.ZodNumber;
    isNative: z.ZodBoolean;
    logoURI: z.ZodOptional<z.ZodURL>;
    tags: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>]>>>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>>;
export type BaseAsset = z.infer<typeof BaseAssetSchema>;
export type TokenAsset = z.infer<typeof TokenAssetSchema>;
import { z } from 'zod';
