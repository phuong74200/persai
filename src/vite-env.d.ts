/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_BASE_FL_DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
