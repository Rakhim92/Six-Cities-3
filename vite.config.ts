/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Six-Cities-3/' : '/',
});
