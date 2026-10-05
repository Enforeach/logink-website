import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// BUILD §2.2 rule 2 (owner: Motion): no framer-motion React API and no Lenis outside src/motion.
// framer-motion is imported only by src/motion/rich/** and src/motion/sequence-player.ts, lenis only
// by src/motion/rich/index.ts; pages reach motion through data attributes and src/motion's leaves.
const MOTION_ONLY = [
  { name: "framer-motion", message: "Motion is data attributes + src/motion (BUILD §2.2). No framer-motion outside src/motion." },
  { name: "motion", message: "Use src/motion (BUILD §2.2)." },
  { name: "motion/react", message: "Use src/motion (BUILD §2.2)." },
  { name: "lenis", message: "Lenis is loaded only by src/motion/rich (RichGate)." },
  { name: "lenis/react", message: "Lenis is loaded only by src/motion/rich (RichGate)." },
];
const MOTION_INTERNALS = {
  group: ["@/motion/rich", "@/motion/rich/*", "@/motion/sequence-player"],
  message: "T2 chunks load only through RichGate / ScrollSequence (dynamic import after load, desktop only).",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/{ds,instruments,sections}/**/*.{ts,tsx}", "src/app/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": ["error", { paths: MOTION_ONLY, patterns: [MOTION_INTERNALS] }] },
  },
  {
    files: ["src/components/{ds,instruments}/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [...MOTION_ONLY, { name: "next/dynamic", message: "next/dynamic is not used for motion (BUILD §2.2)." }],
          patterns: [MOTION_INTERNALS],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
