export interface PackageJSON {
  name: string;
  version: string;
  private: boolean;
  scripts: Scripts;
  dependencies: Dependencies;
  devDependencies: DevDependencies;
}

export interface Scripts {
  dev: string;
  build: string;
  start: string;
  lint: string;
}

export interface Dependencies {
  axios: string;
  "crypto-js": string;
  jose: string;
  "js-cookie": string;
  jsonwebtoken: string;
  "lucide-react": string;
  mongoose: string;
  next: string;
  react: string;
  "react-dom": string;
  "react-toastify": string;
  "tailwind-merge": string;
  "tailwindcss-animate": string;
  "universal-cookie": string;
  zod: string;
}

export interface DevDependencies {
  "@types/js-cookie": string;
  "@types/jsonwebtoken": string;
  "@types/node": string;
  "@types/react": string;
  "@types/react-dom": string;
  "@typescript-eslint/eslint-plugin": string;
  autoprefixer: string;
  eslint: string;
  "eslint-config-next": string;
  "eslint-config-prettier": string;
  "eslint-config-standard-with-typescript": string;
  "eslint-plugin-import": string;
  "eslint-plugin-n": string;
  "eslint-plugin-promise": string;
  "eslint-plugin-react": string;
  postcss: string;
  prettier: string;
  "prettier-plugin-tailwindcss": string;
  tailwindcss: string;
  typescript: string;
}
