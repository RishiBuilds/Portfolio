import nextConfigCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextConfigTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...nextConfigCoreWebVitals,
  ...nextConfigTypescript,
  eslintConfigPrettier,
];

export default eslintConfig;

