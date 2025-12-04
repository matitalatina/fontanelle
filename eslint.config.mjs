import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "leaflet",
              importNames: ["ExtraMarkers"],
              message:
                "Use `import L from 'leaflet'` and access `L.ExtraMarkers` instead. Named import doesn't work with Turbopack.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
