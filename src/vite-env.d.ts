/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend API kök adresi. Boş bırakılırsa aynı origin (/api) kullanılır.
   *  Frontend ayrı bir yerde (örn. Vercel) yayınlanırsa buraya backend URL'si yazılır. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
