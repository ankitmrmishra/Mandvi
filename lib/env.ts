// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    // server-side secret for Sanity (optional)
    SANITY_API_TOKEN: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_HASHNODE_ENDPOINT: z.string().url().optional(),
    NEXT_PUBLIC_HASHNODE_PUBLICATION_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST: z.string().url().optional(),
    // Sanity (client-side) configuration
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_USE_CDN: z.coerce.boolean().default(true),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2024-03-11"),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_HASHNODE_ENDPOINT: process.env.NEXT_PUBLIC_HASHNODE_ENDPOINT,
    NEXT_PUBLIC_HASHNODE_PUBLICATION_ID:
      process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID,
    NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST:
      process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
    // Sanity runtime mappings
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_USE_CDN: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
});
