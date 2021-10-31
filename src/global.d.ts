/// <reference types="@sveltejs/kit" />
declare const JWT_SECRET: string;
declare const FAUNA_KEY: string;
declare const DOCUMENTS_KV: KVNamespace;

declare module '*.svg?component' {
  const content: string;
  export default content;
}
